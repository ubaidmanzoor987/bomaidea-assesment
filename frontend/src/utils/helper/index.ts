import { AxiosError } from 'axios';

export const getErrorMessage = (json: AxiosError) => {
  return json?.response?.data?.message
    ? json?.response?.data?.message
    : json?.response?.data?.errors.length
    ? json?.response?.data?.errors
    : 'Error while processing your request';
};