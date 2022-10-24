import { Labels } from '../types/UIProps.model';

export const wait = (seconds: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

export const convertEnumToString = (str: Labels): string => {
  let updatedString: string;
  if (str.includes('-')) {
    updatedString = str
      .split('-')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(' ');
  } else {
    updatedString = str.replace(str[0], str[0].toUpperCase());
  }
  return updatedString;
};
