import React, { useEffect, useState } from 'react';
import { useTextArea } from '../../hooks/inputs';
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

  /**Validating TextArea with custom use-textarea hook. */
  const {
    value: enteredComments,
    textAreaFocus: commentsTextAreaFocus,
    textAreaHandler: commentsTextAreaHandler,
    textAreaIsValid: commentsIsValid,
    error: commentsError,
    reset: clearComments,
  } = useTextArea(
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

  // STORE DATA TO REDUX
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
        onFocus={commentsTextAreaFocus}
        onChange={commentsTextAreaHandler}
        minlength={3}
      />
    </SectionHeader>
  );
};
