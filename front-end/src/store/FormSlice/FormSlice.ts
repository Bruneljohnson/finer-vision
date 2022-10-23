import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFormContext } from './FormSlice.model';

const initialState: IFormContext = {
  sectionOneValid: false,
  sectionTwoValid: false,
  sectionThreeValid: false,
  firstName: '',
  surname: '',
  email: '',
  telPhone: '',
  gender: '',
  dob: '',
  comments: '',
};

export const FormSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setSectionOneValid: (state, action: PayloadAction<boolean>) => {
      state.sectionOneValid = action.payload;
    },
    setSectionTwoValid: (state, action: PayloadAction<boolean>) => {
      state.sectionTwoValid = action.payload;
    },
    setSectionThreeValid: (state, action: PayloadAction<boolean>) => {
      state.sectionThreeValid = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setTelPhone: (state, action: PayloadAction<string>) => {
      state.telPhone = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setDOB: (state, action: PayloadAction<string>) => {
      state.dob = action.payload;
    },
    setComments: (state, action: PayloadAction<string>) => {
      state.comments = action.payload;
    },
    clearSlice: (state) => {
      state.sectionOneValid = false;
      state.sectionTwoValid = false;
      state.sectionThreeValid = false;
      state.firstName = '';
      state.surname = '';
      state.email = '';
      state.telPhone = '';
      state.gender = '';
      state.dob = '';
      state.comments = '';
    },
  },
});

export const {
  setComments,
  setDOB,
  setEmail,
  setFirstName,
  setGender,
  setSectionOneValid,
  setSectionThreeValid,
  setSectionTwoValid,
  setSurname,
  setTelPhone,
  clearSlice,
} = FormSlice.actions;

export const form = (state: RootState) => state.form;

export const formReducer = FormSlice.reducer;
