import axios from 'axios';
import Vue from 'vue';

import Constant from '../../constant/Constant';

const store = {
  state: {
    token: '',
    loading: false,
    message: '',
    error: false,
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload;
    },
    message(state, payload) {
      if (payload.includes('successfully')) {
        Vue.$vToastify.success(payload);
      } else if (payload.includes('Please') || payload.includes('user')) {
        Vue.$vToastify.warning(payload);
      } else {
        Vue.$vToastify.error(payload);
      }
      state.message = payload;
    },
    responseToken(state, payload) {
      state.token = payload;
    },
    errorState(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async signUp(context, userData) {
      // eslint-disable-next-line object-curly-newline
      const { firstname, lastname, username, email, password, confirmPassword } = userData.data;
      context.commit('loading', true);
      try {
        const res = await axios.post(`${Constant.baseUrl}user/signUp`, {
          firstname,
          lastname,
          email,
          username,
          password,
          confirmPassword,
        });
        context.commit('loading', false);
        context.commit('message', 'Sign up successfully! Confirmation link sent to your email.');
        context.commit('responseToken', res.data.token);
      } catch (error) {
        context.commit('loading', false);
        context.commit('errorState');
        if (error.message.includes('401') || error.message.includes('400')) {
          context.commit('message', 'Please check your data before submit!');
        } else context.commit('message', 'Something went wrong!');
      }
    },
    async signIn(context, { username, password }) {
      context.commit('loading', true);
      try {
        const res = await axios.post(`${Constant.baseUrl}user/signIn`, {
          username,
          password,
        });
        context.commit('loading', false);
        context.commit('message', 'Sign in successfully!');
        context.commit('responseToken', res.data.token);
      } catch (error) {
        context.commit('loading', false);
        context.commit('errorState');
        if (error.message.includes('401') || error.message.includes('400')) {
          context.commit('message', 'Please check your username or password!');
        } else context.commit('message', 'Something went wrong!');
      }
    },
    async forgotPassword(context, email) {
      context.commit('loading', true);
      try {
        await axios.post(`${Constant.baseUrl}user/forgotPassword`, {
          email,
        });
        context.commit('loading', false);
        context.commit('message', 'Email sent successfully.Please check your email!');
      } catch (error) {
        context.commit('loading', false);
        if (error.message.includes('404')) {
          context.commit('message', 'There is no user with that email address!');
        } else context.commit('message', 'Something went wrong!');
      }
    },
    async resetPassword(context, { password, confirmPassword, token }) {
      context.commit('loading', true);
      try {
        await axios.patch(`${Constant.baseUrl}user/resetPassword/${token}`, {
          password,
          confirmPassword,
        });
        context.commit('loading', false);
        context.commit('message', 'Password updated successfully!');
      } catch (error) {
        context.commit('loading', false);
        if (error.message.includes('400')) {
          context.commit('message', 'Token is invalid or expired!');
        } else context.commit('message', 'Something went wrong!');
      }
    },
    async confirmEmail(context, token) {
      context.commit('loading', true);
      try {
        context.commit('loading', false);
        await axios.get(`${Constant.baseUrl}user/confirmEmail/${token}`);
        context.commit('errorState', false);
      } catch (error) {
        context.commit('loading', false);
        context.commit('errorState', true);
      }
    },
  },
  modules: {},
};

export default store;
