import React, { FormEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHttp } from '../../hooks/api/';
import { postUrl } from '../../services';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SectionOne } from './';
import { SectionThree } from './';
import { SectionTwo } from './';
import {
  DataGrabber,
  Method,
  RequestConfig,
} from '../../hooks/api/use-Http.model';
import { clearSlice } from '../../store/FormSlice';
import { ISectionClearFns } from '../../types';

export const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sendRequest, isLoading, error, success } = useHttp();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(0);

  // Lift ClearField Functions From Sections.
  const [clearSectionOne, setClearSectionOne] = useState<ISectionClearFns>();
  const [clearSectionTwo, setClearSectionTwo] = useState<ISectionClearFns>();
  const [clearSectionThree, setClearSectionThree] =
    useState<ISectionClearFns>();

  // Retrieve Redux States
  const sectionOneIsValid = useAppSelector(
    (state) => state.form.sectionOneValid
  );
  const sectionTwoIsValid = useAppSelector(
    (state) => state.form.sectionTwoValid
  );
  const sectionThreeIsValid = useAppSelector(
    (state) => state.form.sectionThreeValid
  );
  const firstName = useAppSelector((state) => state.form.firstName);
  const surname = useAppSelector((state) => state.form.surname);
  const email = useAppSelector((state) => state.form.email);
  const phoneNumber = useAppSelector((state) => state.form.telPhone);
  const gender = useAppSelector((state) => state.form.gender);
  const dob = useAppSelector((state) => state.form.dob);
  const comments = useAppSelector((state) => state.form.comments);

  // Clear Sections after submit successful
  const clearSectionOneHandler = (clearData: any) => {
    setClearSectionOne(clearData);
  };
  const clearSectionTwoHandler = (clearData: any) => {
    setClearSectionTwo(clearData);
  };
  const clearSectionThreeHandler = (clearData: any) => {
    setClearSectionThree(clearData);
  };

  // Set FormStep Functions /** To Increase/ set when button is clicked  */
  const increaseFormStepsHandler = () => {
    setFormStep((prev) => prev + 1);
  };

  const setFormSectionHandler = (num: number) => {
    setFormStep(num);
  };

  useEffect(() => {
    if (sectionOneIsValid && sectionTwoIsValid && sectionThreeIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [sectionOneIsValid, sectionTwoIsValid, sectionThreeIsValid]);

  // HANDLING HTTP STATES.
  useEffect(() => {
    if (isLoading) {
      toast('Sending data...', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      toast.error(`Error, task failed!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(`Your Form has been sent successfully.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [success]);

  // Submit Form
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) return;
    const data = {
      firstName,
      surname,
      email,
      phoneNumber,
      gender,
      dob,
      comments,
    };

    // CUSTOM HTTP HOOK
    const requestConfig: RequestConfig = {
      url: postUrl,
      all: false,
      method: Method.POST,
      body: data,
    };
    const dataGrabber: DataGrabber = (data) => {};

    sendRequest(requestConfig, dataGrabber);

    // Clear Redux FormSlice and Fields after submit!
    clearSectionOne!.clearEmail();
    clearSectionOne!.clearFirstName();
    clearSectionOne!.clearSurname();
    clearSectionTwo!.clearDay();
    clearSectionTwo!.clearMonth();
    clearSectionTwo!.clearYear();
    clearSectionTwo!.clearTelNumber();
    clearSectionTwo!.clearGender();
    clearSectionThree!.clearComments();
    dispatch(clearSlice());
    setFormStep(0);
  };

  return (
    <>
      {error && (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}
      {isLoading && (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}
      {success && (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}
      <form
        className="grid align-center py-2 px-2 bg-white w-5/6 md:w-4/6 lg:w-1/2 xl:w-2/5 2xl:w-1/3 my-36 mx-auto 
      rounded-xl drop-shadow-xl"
        onSubmit={submitHandler}
      >
        <SectionOne
          formStep={formStep}
          onFormSteps={increaseFormStepsHandler}
          onSection={setFormSectionHandler}
          onClearEntries={clearSectionOneHandler}
        />

        <SectionTwo
          formStep={formStep}
          onFormSteps={increaseFormStepsHandler}
          onSection={setFormSectionHandler}
          onClearEntries={clearSectionTwoHandler}
        />

        <SectionThree
          formStep={formStep}
          onFormSteps={increaseFormStepsHandler}
          onSection={setFormSectionHandler}
          onClearEntries={clearSectionThreeHandler}
        />
      </form>
    </>
  );
};
