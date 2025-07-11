<script setup lang="ts">
import { useUrlsStore } from '@/stores/useUrlsStore';
import { storeToRefs } from 'pinia';

import ShortenedUrlSideItem from './shortened-url-side-item.vue';

const store = useUrlsStore();
const { isSidebarOpen, urls, fetchingUrls } = storeToRefs(store);
</script>

<template>
  <transition name="slide-fade">
    <aside
      v-if="isSidebarOpen && !fetchingUrls"
      class="fixed top-0 left-0 h-full bg-zinc-950 text-white w-80 p-4 border-r border-zinc-800"
    >
      <h2 class="text-xl font-semibold mb-4 mx-2">Shortened URLs</h2>
      <ul class="list-none text-sm [&>li]:hover:bg-zinc-900 [&>li]:transition-colors [&>li]:duration-300 [&>li]:px-4 [&>li]:py-3 [&>li]:rounded-lg [&>li]:cursor-pointer">
        <shortened-url-side-item
          v-for="url in urls"
          :key="url.id"
          :url="url"
        />
      </ul>
    </aside>
  </transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20rem);
  opacity: 0;
}
</style>
