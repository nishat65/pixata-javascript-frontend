/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "sign-up" */ '../components/Auth/SignUp.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "sign-in" */ '../components/Auth/SignIn.vue'),
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () =>
      import(/* webpackChunkName: "sign-in" */ '../components/Auth/ForgotPassword.vue'),
  },
  {
    path: '/resetPassword/:token',
    name: 'ResetPassword',
    component: () =>
      import(/* webpackChunkName: "sign-in" */ '../components/Auth/ResetPassword.vue'),
  },
  {
    path: '/confirmEmail/:token',
    name: 'ConfirmEmail',
    component: () =>
      import(/* webpackChunkName: "sign-in" */ '../components/Auth/ConfirmEmail.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
