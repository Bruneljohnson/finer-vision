import React, { useEffect, useState } from 'react';
import { useInput } from '../../hooks/inputs';
import { setComments, setSectionThreeValid } from '../../store/FormSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ISectionsProps, Labels } from '../../types';
import { Input } from '../UI';
import { SectionHeader } from './';

export const SectionThree: React.FC<ISectionsProps> = ({
  onFormSteps,
  onSection,
  formStep,
  onClearEntries,
}) => {
  const dispatch = useAppDispatch();
  const sectionThreeIsValid = useAppSelector(
    (state) => state.form.sectionThreeValid
  );
  const [formPartThreeIsValid, setFormPartThreeIsValid] =
    useState<boolean>(false);

  /**Validating TextArea */
  const {
    value: enteredComments,
    inputFocus: commentsInputFocus,
    inputHandler: commentsInputHandler,
    inputIsValid: commentsIsValid,
    error: commentsError,
    reset: clearComments,
  } = useInput(
    (value) => value.trim().toLowerCase() !== '' && value.trim().length >= 8
  );
  // SET FORM VALID TO TRUE IF CONDITION IS MET.
  useEffect(() => {
    if (commentsIsValid) {
      setFormPartThreeIsValid(true);
    }
  }, [commentsIsValid]);

  useEffect(() => {
    if (!sectionThreeIsValid) {
      setFormPartThreeIsValid(false);
    }
  }, [sectionThreeIsValid]);

  // SET REDUX STORE DATA
  const nextStepHandler = () => {
    dispatch(setSectionThreeValid(true));
    dispatch(setComments(enteredComments));
    onClearEntries({ clearComments });
  };

  return (
    <SectionHeader
      onSection={onSection}
      formIsValid={formPartThreeIsValid}
      onFormSteps={onFormSteps}
      goToNextStep={nextStepHandler}
      state={formStep}
      stepValue={2}
      title="Step 3: Final comments"
    >
      <Input
        key={'comments'}
        label={Labels.COMMS}
        showLabel={true}
        dataTest={'comments'}
        id={'comments'}
        value={enteredComments}
        error={commentsError}
        onFocus={commentsInputFocus}
        onChange={commentsInputHandler}
        minlength={3}
      />
    </SectionHeader>
  );
};
