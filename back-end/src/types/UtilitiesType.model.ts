export interface IError {
  path?: string;
  name?: string;
  code?: number;
  statusCode?: number;
  status?: string;
  message?: string;
  stack?: string;
  isOperational?: boolean;
  value?: string;
  errmsg?: string;
  errors?: {
    message: string;
    [prop: string]: string | boolean | number;
  }[];
}

export type IQueryObj = { [props: string]: string };
export type IAPIQueryString = IQueryObj | string;
