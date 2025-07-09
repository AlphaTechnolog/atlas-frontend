import axios from './axios';
import type { AxiosResponse } from 'axios'
import type { IShortenedUrl } from '@/types/index.d';

export type CreateUrlPayload = {
  url: string;
}

export type CreateUrlResponse = {
  message: string;
  shortenedURL: {
    id: string;
    originalUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type FetchAllResponse = {
  ok: boolean;
  items?: IShortenedUrl[];
  err?: string;
};

export const fetchAll = (): Promise<AxiosResponse<FetchAllResponse>> => {
  return axios.get<FetchAllResponse>('/');
}

export const createUrl = ({ url }: CreateUrlPayload): Promise<AxiosResponse<CreateUrlResponse>> => {
  return axios.post<CreateUrlResponse>('/', { url });
}
