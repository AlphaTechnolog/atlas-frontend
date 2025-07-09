<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useUrlsStore } from '@/stores/useUrlsStore.ts';

const url = ref('');
const modified = ref(false);
const urlInput = ref<HTMLInputElement | undefined>(undefined);

const { shortenUrl } = useUrlsStore();

const invalidUrl = computed(() => {
  if (modified.value === false) return;
  if (url.value.length === 0) return true;
  try {
    new URL(url.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return true;
  }
  return !url.value.startsWith('https://') && !url.value.startsWith('http://');
});

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    return handleSubmit();
  }
  modified.value = true;
}

const resetForm = () => {
  urlInput.value?.blur();
  url.value = '';
  modified.value = false;
}

const handleSubmit = () => {
  if (invalidUrl.value === true) {
    return;
  }

  shortenUrl(url.value);
  resetForm();
}
</script>

<template>
  <section class="flex justify-center items-center gap-x-2 text-sm">
    <input
      type="text"
      placeholder="Enter your long URL here..."
      v-model="url"
      :class="`min-w-[20rem] rounded-lg border border-solid border-zinc-900 px-3 py-2 outline-none transition-all duration-300 focus:rounded-xl active:rounded-xl active:border-zinc-800 focus:border-zinc-800 ${invalidUrl ? 'border-red-300! bg-red-300/10! text-red-300! placeholder:text-red-300/40!' : ''}`"
      @keyup="handleKeyUp"
      ref="urlInput"
    />
    <button
      class="bg-white rounded-lg py-2 px-3 text-zinc-900 transition-all duration-300 hover:rounded-xl hover:bg-white/80"
      @click="handleSubmit"
    >
      Shorten
    </button>
  </section>
</template>
