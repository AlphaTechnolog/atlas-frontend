import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IShortenedUrl } from '@/types/index.d';

import * as urlsApi from '@/api/urls';

export const useUrlsStore = defineStore('urlsStore', () => {
  const urls = ref<IShortenedUrl[]>([]);
  const fetchingUrls = ref<boolean>(false);

  const fetchInitialUrls = () => {
    throw new Error('unimplemented');
  }

  const shortenUrl = async (url: string): Promise<void> => {
    const response = await urlsApi.createUrl({ url });
    const { data: { shortenedURL } } = response;

    console.log('Created shortened url successfully', { shortenedURL });

    urls.value.push({
      id: shortenedURL.id,
      url,
      visitCount: 0,
      createdAt: shortenedURL.createdAt,
      updatedAt: shortenedURL.updatedAt,
    });
  }

  return {
    urls,
    fetchingUrls,
    fetchInitialUrls,
    shortenUrl,
  };
});
