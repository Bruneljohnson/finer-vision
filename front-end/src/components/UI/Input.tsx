import React, { useEffect, useState } from 'react';
import { IHTMLINPUTProps, Labels } from '../../types/UIProps.model';
import { convertEnumToString } from '../../utilities';

export const Input: React.FC<IHTMLINPUTProps> = (props) => {
  const [desiredInput, setDesiredInput] = useState<string>('input');

  const {
    label,
    type,
    value,
    onFocus,
    onChange,
    minlength,
    id,
    error,
    dataTest,
    showLabel,
    min,
    max,
  } = props;

  /** Set the Component Output depending on
   * the label passed as props. */
  useEffect(() => {
    if (label === Labels.COMMS) {
      setDesiredInput('textarea');
    } else {
      setDesiredInput('input');
    }
  }, [label]);

  return (
    <div
      className={`${
        showLabel &&
        `flex flex-col items-start my-4 ml-3 gap-0.5 ${
          label === Labels.COMMS && `col-span-full`
        }`
      }`}
    >
      {showLabel && (
        <label
          className="text-gray-500  text-lg sm:text-xl font-bold"
          htmlFor={id}
        >
          {convertEnumToString(label)}
        </label>
      )}
      {desiredInput === 'input' && (
        <input
          data-testid={dataTest}
          id={id}
          type={type}
          className={`block text-base sm:text-lg  bg-gray-100 transition-all border-b-2 
          border-solid border-b-transparent rounded-xl shadow shadow-inner 
          focus:outline-none focus:border-b-transparent 
          focus:valid:border-b-greenalert ${
            !showLabel
              ? ` w-16 sm:w-20  py-2 px-1 `
              : `w-44 min-[375px]:w-52 sm:w-72 py-3 px-3`
          } ${error && `focus:invalid:border-b-yellow1`}  
           `}
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          minLength={minlength}
          min={min}
          max={max}
          required
        />
      )}

      {/* WHEN (LABEL.COMMS) IS PASSED THIS IS RENDERED */}
      {desiredInput === 'textarea' && (
        <textarea
          data-testid={dataTest}
          id={id}
          autoFocus={true}
          className={`text-lg p-3 bg-gray-100 transition-all border-b-2 
          border-solid border-b-transparent rounded-xl shadow shadow-inner 
          focus:outline-none focus:border-b-transparent 
          focus:valid:border-b-greenalert 
           w-72 sm:w-full h-36 resize-none box-border ${
             error && `focus:invalid:border-b-yellow1`
           } `}
          cols={20}
          rows={5}
          onFocus={onFocus}
          onChange={onChange}
          minLength={minlength}
          maxLength={300}
          required
        >
          {value}
        </textarea>
      )}
    </div>
  );
};
