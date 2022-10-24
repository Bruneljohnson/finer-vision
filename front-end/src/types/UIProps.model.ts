import React from 'react';

export type EventFn = (event: any) => void;

export enum Labels {
  FN = 'first-name',
  SN = 'surname',
  EM = 'email-address',
  TELNO = 'telephone-number',
  GNDR = 'gender',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  COMMS = 'comments',
}

export interface IHTMLINPUTProps {
  showLabel: boolean;
  label: Labels;
  id: string;
  error?: boolean;
  dataTest: string;
  type?: string;
  value?: string;
  onFocus?: EventFn;
  onChange?: EventFn;
  minlength?: number;
  max?: number;
  min?: number;
}

export interface ISectionHeaderProps {
  children?: React.ReactNode;
  stepValue: number;
  state: number;
  title: string;
  formIsValid: boolean;
  onFormSteps: () => void;
  onSection: (num: number) => void;
  goToNextStep: () => void;
}

export interface ISectionsProps {
  formStep: number;
  onFormSteps: () => void;
  onSection: (num: number) => void;
  onClearEntries: (clear: any) => void;
}

export interface ISectionClearFns {
  [props: string]: () => {};
}
