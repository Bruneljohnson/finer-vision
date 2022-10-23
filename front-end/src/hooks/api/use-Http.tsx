import { useCallback, useState } from 'react';
// import { wait } from '../helpers/helpers';
import axios from 'axios';
import {
  Method,
  RequestConfig,
  DataGrabber,
  GetDataResponse,
  DataFromApi,
} from './use-Http.model';

type HttpStates = boolean;

interface ReturnObj {
  isLoading: boolean;
  error: boolean;
  success: boolean;
  sendRequest: (
    requestConfig: RequestConfig,
    dataGrabber: DataGrabber
  ) => Promise<void> | void;
}

type HttpFN = () => ReturnObj;

export const useHttp: HttpFN = () => {
  const [isLoading, setIsLoading] = useState<HttpStates>(false);
  const [error, setError] = useState<HttpStates>(false);
  const [success, setSuccess] = useState<HttpStates>(false);

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, dataGrabber: DataGrabber) => {
      setIsLoading(true);
      // await wait(2); /** To Test Loading UI */
      try {
        let axiosMethod;
        let { url, method, all, headers, body } = requestConfig;

        if (!method || method === Method.GET) {
          axiosMethod =
            all === true
              ? axios.get<any, GetDataResponse>(url, {
                  timeout: 10000,
                })
              : axios.get<any, DataFromApi>(url, {
                  timeout: 10000,
                });
        }

        if (method === Method.POST) {
          axiosMethod = axios.post<DataFromApi>(url, body, {
            headers,
            timeout: 10000,
          });
        }

        if (method === Method.PATCH) {
          axiosMethod = axios.patch<DataFromApi>(url, body, {
            headers,
            timeout: 10000,
          });
        }

        if (method === Method.DELETE) {
          axiosMethod = axios.delete<DataFromApi>(url, {
            headers,
            timeout: 10000,
          });
        }

        const response = await axiosMethod;

        dataGrabber(response?.data);
        setSuccess(true);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    success,
    sendRequest,
  };
};
