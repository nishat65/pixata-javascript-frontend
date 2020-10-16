import * as mutations from './mutations/mutation';
import * as actions from './actions/action';

const store = {
  state: {
    loading: false,
    posts: [],
    myPosts: [],
    error: false,
  },
  mutations: {
    loading: mutations.loading,
    getPosts: mutations.getPosts,
    getMyPosts: mutations.getMyPosts,
    errorState: mutations.errorState,
  },
  actions: {
    getMyPosts: actions.getMyPosts,
    getAllPosts: actions.getAllPosts,
    createPost: actions.createPost,
  },
};

export default store;
