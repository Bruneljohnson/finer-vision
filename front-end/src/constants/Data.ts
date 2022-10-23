import { IHTMLINPUTProps, Labels } from '../types/UIProps.model';

type ISection = IHTMLINPUTProps[];

export const sectionOneArr: ISection = [
  {
    showLabel: true,
    label: Labels.FN,
    id: 'first-name',
    dataTest: 'first-name',
    type: 'text',
    value: 'heloo',
    onFocus: () => {},
    onChange: () => {},
    minlength: 3,
  },
  {
    showLabel: true,
    label: Labels.SN,
    id: 'surname',
    dataTest: 'surname',
    type: 'text',
    value: 'heloo',
    onFocus: () => {},
    onChange: () => {},
    minlength: 3,
  },
  {
    showLabel: true,
    label: Labels.EM,
    id: 'email',
    dataTest: 'email',
    type: 'email',
    value: 'heloo',
    onFocus: () => {},
    onChange: () => {},
    minlength: undefined,
  },
];

export const sectionTwoArr: ISection = [
  {
    showLabel: false,
    label: Labels.DAY,
    id: 'day',
    dataTest: 'day',
    type: 'number',
    value: 'heloo',
    onFocus: () => {},
    onChange: () => {},
    min: 1,
    max: 31,
  },
  {
    showLabel: false,
    label: Labels.MONTH,
    id: 'month',
    dataTest: 'month',
    type: 'number',
    value: 'heloo',
    onFocus: () => {},
    onChange: () => {},
    min: 1,
    max: 12,
  },
  {
    showLabel: false,
    label: Labels.YEAR,
    id: 'year',
    dataTest: 'year',
    type: 'number',
    value: 'heloo',
    onFocus: () => {},
    onChange: () => {},
    min: 1900,
    max: 2021,
  },
];
