import React, { useState } from 'react';

export const useSelect = (
  validateSelectValue: (enteredValue: string) => boolean
) => {
  const [enteredValue, setEnteredValue] = useState<string>();
  const [selectIsTouched, setSelectIsTouched] = useState<boolean>(false);

  const selectValueIsValid = validateSelectValue(enteredValue as string);
  const selectHasError = !selectValueIsValid && selectIsTouched;

  const selectValueChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEnteredValue(event.target.value.trim().toLowerCase());
  };

  const selectFocusHandler = (event: React.FocusEvent<HTMLSelectElement>) => {
    setSelectIsTouched(true);
  };

  const reset: () => void = () => {
    setSelectIsTouched(false);
    setEnteredValue(``);
  };

  return {
    value: enteredValue,
    selectIsValid: selectValueIsValid,
    error: selectHasError,
    selectHandler: selectValueChangeHandler,
    selectFocus: selectFocusHandler,
    reset,
  };
};
