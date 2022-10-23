import React, { useState } from 'react';

export const useInput = (
  validateInputValue: (enteredValue: string) => boolean
) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [InputIsTouched, setInputIsTouched] = useState<boolean>(false);

  const inputValueIsValid = validateInputValue(enteredValue);
  const inputHasError = !inputValueIsValid && InputIsTouched;

  const inputValueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredValue(event.target.value.trim().toLowerCase());
  };

  const inputFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setInputIsTouched(true);
  };

  const reset: () => void = () => {
    setInputIsTouched(false);
    setEnteredValue(``);
  };

  return {
    value: enteredValue,
    inputIsValid: inputValueIsValid,
    error: inputHasError,
    inputHandler: inputValueChangeHandler,
    inputFocus: inputFocusHandler,
    reset,
  };
};
