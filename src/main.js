/* eslint-disable arrow-parens */
import Vue from 'vue';
import VueToastify from 'vue-toastify';
import Vuelidate from 'vuelidate';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';
import LocalStorage from './utils/localStoragePersist';

axios.defaults.headers.common.Authorization = `Bearer ${LocalStorage.getItemLocalStorage('token')}`;

const settings = {
  position: 'top-right',
  errorDuration: 3000,
  maxToasts: 1,
  theme: 'light',
  successDuration: 3000,
  warningInfoDuration: 3000,
};

Vue.use(VueToastify, settings);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
