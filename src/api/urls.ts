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

export type ConsumeResponse = {
  ok: boolean;
  shortenedUrl?: IShortenedUrl;
};

export const fetchAll = (): Promise<AxiosResponse<FetchAllResponse>> => {
  return axios.get<FetchAllResponse>('/');
}

export const createUrl = ({ url }: CreateUrlPayload): Promise<AxiosResponse<CreateUrlResponse>> => {
  return axios.post<CreateUrlResponse>('/', { url });
}

export const consumeUrl = (id: string): Promise<AxiosResponse<ConsumeResponse>> => {
  return axios.post<ConsumeResponse>('/consume', { id });
}
