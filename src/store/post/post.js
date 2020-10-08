import * as mutations from './mutations/mutation';
import * as actions from './actions/action';

const store = {
  state: {
    loading: false,
    posts: [],
    error: false,
  },
  mutations: {
    loading: mutations.loading,
    getPosts: mutations.getPosts,
    errorState: mutations.errorState,
  },
  actions: {
    getMyPosts: actions.getMyPosts,
    getAllPosts: actions.getAllPost,
  },
};

export default store;
