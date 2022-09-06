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
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
