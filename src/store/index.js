import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth/auth';
import post from './post/post';
import review from './review/review';
import user from './user/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    post,
    review,
    user,
  },
});
