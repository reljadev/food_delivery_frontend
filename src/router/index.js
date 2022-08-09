import Vue from 'vue';
import VueRouter from 'vue-router';
import { authGuard } from '../auth/authGuard';

Vue.use(VueRouter);

const routes = [
  // default page is restaurants
  {
    path: '/', 
    redirect: '/restaurants',
  },
  {
    path: '/restaurants',
    name: 'Restaurants',
    component: function () {
      return import(/* webpackChunkName: "restaurants" */ '../views/Restaurants.vue');
    }
  },
  {
    path: '/restaurants/:id',
    name: 'Menu',
    component: function () {
      return import(/* webpackChunkName: "menu" */ '../views/Menu.vue');
    }
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue');
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: function () {
      return import(/* webpackChunkName: "profile" */ '../views/Profile.vue');
    },
    beforeEnter: authGuard
  },
  {
    path: '/orders',
    name: 'Orders',
    component: function() {
      return import(/* webpackChunkName: "orders" */ '../views/Orders.vue');
    }
  },
  {
    path: "/:catchAll(.*)",
    name: 'Not Found',
    component: function() {
      return import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue');
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;