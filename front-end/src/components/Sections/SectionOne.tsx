import React, { useEffect, useState } from 'react';
import { sectionOneArr } from '../../constants/Data';
import { useInput } from '../../hooks/inputs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setSectionOneValid,
  setFirstName,
  setSurname,
  setEmail,
} from '../../store/FormSlice';
import { ISectionsProps } from '../../types';
import { Input } from '../UI';
import { SectionHeader } from './';

export const SectionOne: React.FC<ISectionsProps> = ({
  onFormSteps,
  onSection,
  formStep,
  onClearEntries,
}) => {
  const dispatch = useAppDispatch();
  const sectionOneIsValid = useAppSelector(
    (state) => state.form.sectionOneValid
  );
  const [formPartOneIsValid, setFormPartOneIsValid] = useState<boolean>(false);

  // Input Validators with custom use-input hook
  /**Validating First Name */
  const {
    value: enteredFirstName,
    inputFocus: firstNameInputFocus,
    inputHandler: firstNameInputHandler,
    inputIsValid: firstNameIsValid,
    error: firstNameError,
    reset: clearFirstName,
  } = useInput(
    (value) => value.trim().toLowerCase() !== '' && value.trim().length >= 3
  );

  /**Validating Surname */
  const {
    value: enteredSurname,
    inputFocus: surnameInputFocus,
    inputHandler: surnameInputHandler,
    inputIsValid: surnameIsValid,
    error: surnameError,
    reset: clearSurname,
  } = useInput(
    (value) => value.trim().toLowerCase() !== '' && value.trim().length >= 3
  );

  /**Validating Email */
  /* REGEX USED TO VERIFY INPUTTED EMAIL AND USE OF 
  CUSTOM INPUT HOOKS TO CAPTURE DATA */
  const {
    value: enteredEmail,
    inputFocus: emailInputFocus,
    inputHandler: emailInputHandler,
    inputIsValid: emailIsValid,
    error: emailError,
    reset: clearEmail,
  } = useInput((value) => /\S+@\S+\.\S+/.test(value));

  // SET FORM VALID TO TRUE IF CONDITION IS MET.
  useEffect(() => {
    if (emailIsValid && firstNameIsValid && surnameIsValid) {
      setFormPartOneIsValid(true);
    }
  }, [emailIsValid, firstNameIsValid, surnameIsValid]);

  useEffect(() => {
    if (!sectionOneIsValid) {
      setFormPartOneIsValid(false);
    }
  }, [sectionOneIsValid]);

  // STORE DATA TO REDUX
  const nextStepHandler = () => {
    dispatch(setSectionOneValid(true));
    dispatch(setFirstName(enteredFirstName));
    dispatch(setSurname(enteredSurname));
    dispatch(setEmail(enteredEmail));
    onClearEntries({ clearEmail, clearFirstName, clearSurname });
  };

  let onFocus: (event: any) => void;
  let onChange: (event: any) => void;
  let value: string;
  let error: boolean;

  return (
    <SectionHeader
      onSection={onSection}
      formIsValid={formPartOneIsValid}
      state={formStep}
      stepValue={0}
      title="Step 1: Your details"
      goToNextStep={nextStepHandler}
      onFormSteps={onFormSteps}
    >
      {sectionOneArr.map(
        ({ showLabel, label, dataTest, minlength, id, type }, i) => {
          if (i === 0) {
            onFocus = firstNameInputFocus;
            onChange = firstNameInputHandler;
            value = enteredFirstName;
            error = firstNameError;
          }
          if (i === 1) {
            onFocus = surnameInputFocus;
            onChange = surnameInputHandler;
            value = enteredSurname;
            error = surnameError;
          }
          if (i === 2) {
            onFocus = emailInputFocus;
            onChange = emailInputHandler;
            value = enteredEmail;
            error = emailError;
          }

          return (
            <Input
              key={id + i}
              label={label}
              showLabel={showLabel}
              dataTest={dataTest}
              id={id}
              type={type}
              value={value}
              error={error}
              onFocus={onFocus}
              onChange={onChange}
              minlength={minlength}
            />
          );
        }
      )}
    </SectionHeader>
  );
};
