<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUrlsStore } from '@/stores/useUrlsStore.ts';

const route = useRoute();
const { consumeUrl } = useUrlsStore();

onMounted(() => {
  const { id } = route.params as { id: string; };
  consumeUrl(id);
});
</script>

<template>
  <span />
</template>
