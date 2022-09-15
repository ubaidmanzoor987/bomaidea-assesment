import axios, { AxiosRequestConfig } from 'axios';

import { API_URL, REQUEST_HEADERS } from '@/constants/api';

import { IRequestBody } from './service.types';

export const postRequest = (url: string, body: IRequestBody | any, config?: AxiosRequestConfig) => {
  return axios.post(API_URL + url, body, config);
};

export const putRequest = (url: string, body: IRequestBody | any, config?: AxiosRequestConfig) => {
  return axios.put(API_URL + url, body, config);
};

export const getRequest = (url: string, config?: AxiosRequestConfig) => {
  return axios.get(API_URL + url, {
    ...config,
    headers: {
      ...REQUEST_HEADERS,
      ...config?.headers,
    },
  });
};

export const deleteRequest = (url: string, config?: AxiosRequestConfig) => {
  return axios.delete(API_URL + url, config);
};
