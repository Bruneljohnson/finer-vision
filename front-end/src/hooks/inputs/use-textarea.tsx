import React, { useState } from 'react';

export const useTextArea = (
  validateTextAreaValue: (enteredValue: string) => boolean
) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [textAreaIsTouched, setTextAreaIsTouched] = useState<boolean>(false);

  const textAreaValueIsValid = validateTextAreaValue(enteredValue);
  const textAreaHasError = !textAreaValueIsValid && textAreaIsTouched;

  const textAreaValueChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEnteredValue(event.target.value.trim().toLowerCase());
  };

  const textAreaFocusHandler = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    setTextAreaIsTouched(true);
  };

  const reset: () => void = () => {
    setTextAreaIsTouched(false);
    setEnteredValue(``);
  };

  return {
    value: enteredValue,
    textAreaIsValid: textAreaValueIsValid,
    error: textAreaHasError,
    textAreaHandler: textAreaValueChangeHandler,
    textAreaFocus: textAreaFocusHandler,
    reset,
  };
};
