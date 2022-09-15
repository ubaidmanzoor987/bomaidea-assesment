import { AxiosError } from 'axios';

export const getErrorMessage = (json: AxiosError) => {
  return json.response ? json.response.data.message : json.message;
};