/* eslint-disable arrow-parens */
import Vue from 'vue';
import VueToastify from 'vue-toastify';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

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
