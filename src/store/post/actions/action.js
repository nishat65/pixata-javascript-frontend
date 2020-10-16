import FetchApi from '../../../utils/fetchApi';

export const getMyPosts = async ({ commit }) => {
  commit('loading', true);
  try {
    const fetch = new FetchApi('posts/me');
    const myPost = await fetch.getAllApi();
    commit('getMyPosts', myPost.data.data.post);
    commit('loading', false);
  } catch (error) {
    commit('loading', false);
    commit('errorState', error);
  }
};

export const getAllPosts = async ({ commit }, page) => {
  commit('loading', true);
  try {
    const fetch = new FetchApi('posts/');
    const myPost = await fetch.getAllPaginatedApi(page);
    commit('getPosts', myPost.data.data.posts);
    commit('loading', false);
  } catch (error) {
    commit('loading', false);
    commit('errorState', error);
  }
};

export const createPost = async ({ commit }, formData) => {
  commit('loading', true);
  try {
    const fetch = new FetchApi('posts/me');
    await fetch.postApi(formData);
    commit('loading', false);
  } catch (error) {
    commit('loading', false);
    commit('errorState', error);
  }
};
