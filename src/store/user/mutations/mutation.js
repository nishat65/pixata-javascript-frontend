import Vue from 'vue';

export const loading = (state, payload) => {
  state.loading = payload;
};

export const myData = (state, payload) => {
  state.myData = { ...payload };
};

export const errorState = (state, payload) => {
  console.log(payload.response.data.message);
  Vue.$vToastify.error(payload.response.data.message);
  state.error = payload;
};
