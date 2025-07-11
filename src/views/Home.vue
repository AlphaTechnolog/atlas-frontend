<script setup lang="ts">
import { onMounted } from 'vue'
import { useUrlsStore } from "@/stores/useUrlsStore.ts";

import ShortenUrlSection from '@/components/shorten-url-section.vue'
import ShortenedUrlsSidebar from '@/components/shortened-urls-sidebar.vue'

const { fetchInitialUrls } = useUrlsStore();

onMounted(() => {
  fetchInitialUrls();
});
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-[90vh] gap-y-2">
    <shortened-urls-sidebar />
    <section class="flex flex-col justify-center items-center gap-y-1">
      <h3 class="text-4xl font-semibold">Shorten URL</h3>
      <p class="text-zinc-600">Create more short links for easy sharing</p>
    </section>
    <shorten-url-section />
  </div>
</template>
