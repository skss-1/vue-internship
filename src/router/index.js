import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/popular',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/popular',
    name: 'popular',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/top-rated',
    name: 'top-rated',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/upcoming',
    name: 'upcoming',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/HomeView.vue')
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
