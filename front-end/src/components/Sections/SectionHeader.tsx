import React, { useEffect, useState } from 'react';
import { ISectionHeaderProps } from '../../types';

export const SectionHeader: React.FC<ISectionHeaderProps> = ({
  children,
  title,
  state,
  stepValue,
  onFormSteps,
  goToNextStep,
  onSection,
  formIsValid,
}) => {
  const [uiFormErr, setUiFormErr] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);

  // RETURN SUMBIT BUTTON STATE TO DEFAULT
  useEffect(() => {
    if (!formIsValid && stepValue === 2) {
      setSubmit(false);
    }
  }, [formIsValid, stepValue]);

  return (
    <div className=" relative flex flex-col gap-y-0.5 first:mt-0 mt-2 align-center bg-greybase rounded-xl">
      {uiFormErr && state === stepValue && (
        <p className="absolute bottom-5 left-5 sm:text-xl text-sm text-redalert font-semibold ">
          Please fill out form correctly.
        </p>
      )}
      <button
        onClick={() => onSection(stepValue)}
        type="button"
        className="cursor-pointer flex items-center h-16 
        focus:outline-none outline-none
        bg-gradient-to-t from-yellow1 to-yellow2
        hover:bg-gradient-to-t hover:from-purple1 hover:to-purple2 
        rounded-xl"
      >
        <h2 className="my-auto mx-0 text-xl py-3 px-3 text-white font-semibold capitalize ">
          {title}
        </h2>
      </button>
      {state === stepValue && (
        <div className="grid">
          <div
            className="grid grid-cols-2 items-start w-full min-[425px]:w-5/6 sm:w-4/5 
          md:w-3/4"
          >
            {children}
          </div>

          {stepValue <= 2 && !submit && (
            <button
              className={`cursor-pointer self-end flex items-center justify-center rounded-xl 
              bg-gradient-to-t from-purple1 to-purple2 h-10 p-4 text-white 
              w-40 text-xl mx-3 my-3 justify-self-end ${
                formIsValid
                  ? `hover:bg-gradient-to-t hover:from-greenalert hover:to-greenalert`
                  : `hover:bg-gradient-to-t hover:from-redalert hover:to-redalert`
              }`}
              type="button"
              onClick={() => {
                if (formIsValid) {
                  goToNextStep();
                  stepValue < 2 && onFormSteps();
                  stepValue === 2 && setSubmit(true);
                } else {
                  setUiFormErr(true);
                  setTimeout(() => {
                    setUiFormErr(false);
                  }, 2500);
                }
              }}
            >
              Next
            </button>
          )}
          {stepValue === 2 && submit && (
            <button
              className="cursor-pointer self-end flex items-center justify-center rounded-xl 
              bg-gradient-to-t from-purple1 to-greenalert h-10 p-4 text-white 
              w-40 text-xl mx-3 my-3 justify-self-end"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};
