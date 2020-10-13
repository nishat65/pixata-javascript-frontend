/* eslint-disable object-curly-newline */
import Vue from 'vue';

import FetchApi from '../../../utils/fetchApi';
import LocalStorage from '../../../utils/localStoragePersist';

export const getMyData = async ({ commit }) => {
  commit('loading', true);
  try {
    const fetch = new FetchApi('user/me');
    const myData = await fetch.getAllApi();
    commit('myData', myData.data.data.user);
    commit('loading', false);
  } catch (error) {
    commit('loading', false);
    commit('errorState', error);
  }
};

export const updateProfile = async ({ commit }, formData) => {
  commit('loading', true);
  try {
    const fetch = new FetchApi('user/me');
    await fetch.patchNoTokenApi(formData);
    Vue.$vToastify.success('Profile updated successfully!');
    commit('loading', false);
  } catch (error) {
    commit('loading', false);
    commit('errorState', error);
  }
};

export const updatePassword = async ({ commit }, passwordData) => {
  commit('loading', true);
  const { currentPassword, password, confirmPassword } = passwordData;
  try {
    const fetch = new FetchApi('user/updatePassword');
    const token = await fetch.patchNoTokenApi({ currentPassword, password, confirmPassword });
    LocalStorage.clearLocalStorage('token');
    const ls = new LocalStorage('token', token.data.token);
    ls.saveItemLocalStorage();
    Vue.$vToastify.success('Password updated successfully!');
    commit('loading', false);
  } catch (error) {
    commit('loading', false);
    commit('errorState', error);
  }
};
