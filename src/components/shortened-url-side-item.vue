<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IShortenedUrl } from '@/types'

interface IProps {
  url: IShortenedUrl;
}

const { url } = defineProps<IProps>();
const successRunning = ref<boolean>(false);

const targetLocation = computed(() => {
  return window.location.toString().concat(url.id);
});

const title = computed(() => {
  if (successRunning.value === true) return "Url copied successfully";
  return url.id;
});

const handleCopy = () => {
  navigator.clipboard.writeText(targetLocation.value).then(() => {
    successRunning.value = true;
    setTimeout(() => {
      successRunning.value = false;
    }, 2500);
  })
}

const limit = (str: string, maxLength: number): string => {
  const suffix = '...';
  if (str.length - suffix.length >= maxLength) {
    return str.slice(0, maxLength) + suffix;
  }
  return str;
}
</script>

<template>
  <li
    class="flex justify-between items-center"
    @click="handleCopy"
    :title="targetLocation"
  >
    <section class="flex flex-col justify-center items-start">
      <span :class="{'text-teal-600': successRunning}">{{ title }}</span>
      <span class="text-white/30 text-xs">{{ limit(url.url, 35) }}</span>
    </section>
    <section class="flex flex-col justify-center items-center gap-y-1">
      <i class="pi pi-eye text-teal-500 text-xs" />
      <span class="font-semibold text-xs">{{ url.visitCount }}</span>
    </section>
  </li>
</template>
