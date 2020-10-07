/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import VueRouter from 'vue-router';

// import authStore from '../store/auth/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SignUp',
    alias: '/signUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../components/Auth/SignUp.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "SignIn" */ '../components/Auth/SignIn.vue'),
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () =>
      import(/* webpackChunkName: "ForgotPassword" */ '../components/Auth/ForgotPassword.vue'),
  },
  {
    path: '/resetPassword/:token',
    name: 'ResetPassword',
    component: () =>
      import(/* webpackChunkName: "ResetPassword" */ '../components/Auth/ResetPassword.vue'),
  },
  {
    path: '/confirmEmail/:token',
    name: 'ConfirmEmail',
    component: () =>
      import(/* webpackChunkName: "ConfirmEmail" */ '../components/Auth/ConfirmEmail.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requireAuth: true,
    },
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

// router.beforeEach((to, from, next) => {
//   // eslint-disable-next-line arrow-parens
//   if (!to.matched.some(record => record.meta.requiresAuth || !authStore.getters.verifiedToken)) {
//     next({
//       path: '/login',
//     });
//   } else {
//     next();
//   }
// });

export default router;
