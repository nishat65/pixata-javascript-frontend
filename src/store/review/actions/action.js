import Vue from 'vue';

import FetchApi from '../../../utils/fetchApi';

export const getMyReviews = async ({ commit }) => {
  commit('loading', true);
  try {
    const fetch = new FetchApi('reviews');
    const myReviews = await fetch.getAllApi();
    commit('getReviews', myReviews.data.data.review);
    commit('loading', false);
  } catch (error) {
    commit('loading', false);
    commit('reviewErrorState', error);
  }
};

export const postReview = async ({ commit }, { post, rating, comments }) => {
  commit('reviewLoading', true);
  try {
    const fetch = new FetchApi('reviews');
    await fetch.postApi({ post, rating, comments });
    commit('reviewLoading', false);
  } catch (error) {
    commit('reviewLoading', false);
    commit('reviewErrorState', error);
  }
};

export const deleteReview = async ({ commit }, token) => {
  // commit('reviewLoading', true);
  try {
    const fetch = new FetchApi('reviews');
    await fetch.deleteApi(token);
    Vue.$vToastify.success('Successfully deleted!');
    // commit('reviewLoading', false);
  } catch (error) {
    // commit('reviewLoading', false);
    const {
      response: {
        data: { message },
      },
    } = error;
    Vue.$vToastify.error(message);
    commit('reviewErrorState', error);
  }
};
