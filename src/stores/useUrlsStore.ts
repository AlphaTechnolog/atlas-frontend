import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import type { IShortenedUrl } from '@/types/index.d';

import * as urlsApi from '@/api/urls';

export const useUrlsStore = defineStore('urlsStore', () => {
  const urls = ref<IShortenedUrl[]>([]);
  const fetchingUrls = ref<boolean>(false);
  const creatingUrl = ref<boolean>(false);

  const router = useRouter();

  const isSidebarOpen = computed(() => {
    return urls.value.length > 0;
  });

  const fetchInitialUrls = async (): Promise<void> => {
    fetchingUrls.value = true;

    const response = await urlsApi.fetchAll();
    const { data: { items } } = response;

    if (!items) {
      console.error("Unable to obtain items", items);
      fetchingUrls.value = false;
      return;
    }

    urls.value = items;
    fetchingUrls.value = false;
  }

  const createShortenUrl = async (url: string): Promise<void> => {
    creatingUrl.value = true;

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

    creatingUrl.value = false;
  }

  const consumeUrl = async (id: string): Promise<void> => {
    const response = await urlsApi.consumeUrl(id);
    const { data: { shortenedUrl, ok } } = response;
    if (!ok) return router.back();
    window.location.href = shortenedUrl?.url ?? window.location.toString();
  }

  return {
    urls,
    fetchingUrls,
    isSidebarOpen,
    fetchInitialUrls,
    consumeUrl,
    createShortenUrl,
  };
});
