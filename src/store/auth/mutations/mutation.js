import Vue from 'vue';
import LocalStorage from '../../../utils/localStoragePersist';

export const loading = (state, payload) => {
  state.loading = payload;
};

export const message = (state, payload) => {
  if (payload.includes('successfully')) {
    Vue.$vToastify.success(payload);
  } else if (payload.includes('Please') || payload.includes('user')) {
    Vue.$vToastify.warning(payload);
  } else {
    Vue.$vToastify.error(payload);
  }
  state.message = payload;
};

export const responseToken = (state, payload) => {
  const persistStorage = new LocalStorage('token', payload);
  persistStorage.saveItemLocalStorage();
  state.token = payload;
};

export const errorState = (state, payload) => {
  state.error = payload;
};
