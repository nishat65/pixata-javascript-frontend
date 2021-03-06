/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import VueRouter from 'vue-router';

import LocalStorage from '../utils/localStoragePersist';

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
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "Post" */ '../components/Post/Post.vue'),
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "Post" */ '../components/Post/Posts.vue'),
  },
  {
    path: '/newPost',
    name: 'NewPost',
    component: () => import(/* webpackChunkName: "Post" */ '../components/Post/CreatePost.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "Post" */ '../components/User/Settings.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/Error/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const getToken = LocalStorage.getItemLocalStorage('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !getToken) {
    next('/signIn');
  } else if (to.path === '/signIn' && getToken) {
    next();
  } else {
    next();
  }
});

export default router;
