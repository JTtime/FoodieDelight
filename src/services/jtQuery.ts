import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseApiResult<T> {
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: T | null;
  error: Error | null;
  refetch: () => void;
}

interface errorResponse<T> {
  status: number;
  message: string;
  data: any;
}

const useApi = <T,>(
  url: string,
  method: 'GET' | 'PUT' | 'DELETE' |'POST' = 'POST',
  payload?: any,
  shouldFetch: boolean = true,
  config?: AxiosRequestConfig,
  
): UseApiResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | string | null>(null);

  const fetchData = useCallback(async () => {

    if (!shouldFetch) return;
    setIsLoading(true);
    setIsFetching(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);

    try {
      const response: AxiosResponse<T> | errorResponse<T>= await axios({
        url,
        method,
        data: payload,
        ...config
      });

      console.log('response.data', response?.data)

      if (response?.data?.status > 199 && response?.data?.status < 300) {
        setIsError(false)
        setData(response?.data);
        setIsSuccess(true);
      }
      else {
        setIsError(true);
        setError(response?.data)
      }


    } catch (err) {
      setIsError(true);
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  }, [url, method, payload, config, shouldFetch]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    data,
    error,
    refetch: fetchData,
  };
};

export default useApi;