// Interfaces to be used when using Axios through App.
export enum Method {
  GET = 1,
  POST = 2,
  PATCH = 3,
  DELETE = 4,
}

export interface DataGrabber {
  (data: any): void;
}

export interface RequestConfig {
  url: string;
  all: boolean;
  method?: Method;
  body?: {
    [prop: string]: any;
  } /** Theres No body being sent in this app - Just for future Reference */;
  headers?: {
    'content-Type'?: string;
    Authorization?: string;
  };
}

// Interface to use for Specific Http Methods

/** GET ONE, POST, PATCH, DELETE*/
export interface DataFromApi {
  [prop: string]: any;
}

/** GET ALL */
export interface GetDataResponse extends DataFromApi {
  data: DataFromApi[];
}
