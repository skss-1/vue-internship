import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/movie/:id',
    name: 'movie-page',
    component: () => import('@/views/MoviePageView'),
  },
  {
    path: '/person/:id',
    name: 'person-page',
    component: () => import('@/views/PersonPageView'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
