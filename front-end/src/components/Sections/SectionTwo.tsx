import React, { useEffect, useState } from 'react';
import { sectionTwoArr } from '../../constants/Data';
import { useInput } from '../../hooks/inputs';
import { useSelect } from '../../hooks/inputs';
import {
  setSectionTwoValid,
  setTelPhone,
  setGender,
  setDOB,
} from '../../store/FormSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ISectionsProps, Labels } from '../../types';
import { Input } from '../UI';
import { SectionHeader } from './';

export const SectionTwo: React.FC<ISectionsProps> = ({
  onFormSteps,
  onSection,
  formStep,
  onClearEntries,
}) => {
  const dispatch = useAppDispatch();
  const sectionTwoIsValid = useAppSelector(
    (state) => state.form.sectionTwoValid
  );
  const [formPartTwoIsValid, setFormPartTwoIsValid] = useState<boolean>(false);

  /**Validating Tel */
  const {
    value: enteredTelNumber,
    inputFocus: telNumberInputFocus,
    inputHandler: telNumberInputHandler,
    inputIsValid: telNumberIsValid,
    error: telNumberError,
    reset: clearTelNumber,
  } = useInput(
    (value) =>
      value.trim().toLowerCase() !== '' &&
      value.trim().length >= 11 &&
      value.startsWith('0')
  );

  /**Validating Gender */
  const {
    value: enteredGender,
    selectFocus: genderselectFocus,
    selectHandler: genderSelectHandler,
    selectIsValid: genderIsValid,
    reset: clearGender,
  } = useSelect(
    (value) =>
      value === 'male' || value === 'female' || value === 'prefer-not-to-say'
  );

  /**Validating Day */
  const {
    value: enteredDay,
    inputFocus: dayInputFocus,
    inputHandler: dayInputHandler,
    inputIsValid: dayIsValid,
    error: dayError,
    reset: clearDay,
  } = useInput(
    (value) => value.trim().toLowerCase() !== '' && +value >= 1 && +value <= 31
  );
  /**Validating Month */
  const {
    value: enteredMonth,
    inputFocus: monthInputFocus,
    inputHandler: monthInputHandler,
    inputIsValid: monthIsValid,
    error: monthError,
    reset: clearMonth,
  } = useInput(
    (value) => value.trim().toLowerCase() !== '' && +value >= 1 && +value <= 12
  );
  /**Validating Year */
  const {
    value: enteredYear,
    inputFocus: yearInputFocus,
    inputHandler: yearInputHandler,
    inputIsValid: yearIsValid,
    error: yearError,
    reset: clearYear,
  } = useInput(
    (value) =>
      value.trim().toLowerCase() !== '' && +value >= 1935 && +value <= 2012
  );

  // SET FORM VALID TO TRUE IF CONDITION IS MET.
  useEffect(() => {
    if (
      telNumberIsValid &&
      dayIsValid &&
      monthIsValid &&
      yearIsValid &&
      genderIsValid
    ) {
      setFormPartTwoIsValid(true);
    }
  }, [telNumberIsValid, dayIsValid, monthIsValid, yearIsValid, genderIsValid]);

  useEffect(() => {
    if (!sectionTwoIsValid) {
      setFormPartTwoIsValid(false);
    }
  }, [sectionTwoIsValid]);

  // SET REDUX STORE DATA
  const nextStepHandler = () => {
    dispatch(setSectionTwoValid(true));
    dispatch(setGender(enteredGender as string));
    dispatch(setTelPhone(enteredTelNumber));
    dispatch(
      setDOB(
        `${enteredYear}-${enteredMonth.padStart(2, '0')}-${enteredDay.padStart(
          2,
          '0'
        )}`
      )
    );
    onClearEntries({
      clearDay,
      clearMonth,
      clearYear,
      clearTelNumber,
      clearGender,
    });
  };

  let onFocus: (event: any) => void;
  let onChange: (event: any) => void;
  let value: string;
  let error: boolean;
  return (
    <SectionHeader
      onSection={onSection}
      formIsValid={formPartTwoIsValid}
      onFormSteps={onFormSteps}
      goToNextStep={nextStepHandler}
      state={formStep}
      stepValue={1}
      title="Step 2: More comments"
    >
      <Input
        key={'telephone-number'}
        label={Labels.TELNO}
        showLabel={true}
        dataTest={'telephone-number'}
        id={'telephone-number'}
        type={'tel'}
        value={enteredTelNumber}
        error={telNumberError}
        onFocus={telNumberInputFocus}
        onChange={telNumberInputHandler}
        minlength={11}
      />

      <div className="flex flex-col items-start my-4 ml-3 gap-0.5">
        <label
          htmlFor="gender"
          className="text-gray-500 text-lg sm:text-xl font-bold"
        >
          Gender
        </label>
        <select
          id="gender"
          className=" text-sm sm:text-lg py-4 sm:py-3.5 px-3 bg-gray-100 transition-all border-b-2 
          border-solid border-b-transparent rounded-xl w-44 min-[375px]:w-52 sm:w-72 shadow shadow-inner focus:outline-none 
          focus:border-b-transparent focus:valid:border-b-greenalert"
          required
          onFocus={genderselectFocus}
          onChange={genderSelectHandler}
          data-testid="gender"
        >
          <option>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>

      <div className="flex flex-col items-start my-4 ml-3 gap-0.5">
        <label
          htmlFor="dob"
          className="text-gray-500 text-lg sm:text-xl font-bold"
        >
          Date of Birth
        </label>
        <div className="flex items-center justify-start gap-2">
          {sectionTwoArr.map(
            (
              { showLabel, label, dataTest, minlength, id, type, min, max },
              i
            ) => {
              if (i === 0) {
                onFocus = dayInputFocus;
                onChange = dayInputHandler;
                value = enteredDay;
                error = dayError;
              }
              if (i === 1) {
                onFocus = monthInputFocus;
                onChange = monthInputHandler;
                value = enteredMonth;
                error = monthError;
              }
              if (i === 2) {
                onFocus = yearInputFocus;
                onChange = yearInputHandler;
                value = enteredYear;
                error = yearError;
              }

              return (
                <Input
                  key={id + i}
                  label={label}
                  showLabel={showLabel}
                  dataTest={dataTest}
                  id="dob"
                  type={type}
                  value={value}
                  error={error}
                  onFocus={onFocus}
                  onChange={onChange}
                  minlength={minlength}
                  min={min}
                  max={max}
                />
              );
            }
          )}
        </div>
      </div>
    </SectionHeader>
  );
};
