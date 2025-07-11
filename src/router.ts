import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/Home.vue';
import RedirectView from '@/views/RedirectView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/:id', component: RedirectView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
