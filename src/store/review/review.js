import * as mutations from './mutations/mutation';
import * as actions from './actions/action';

const store = {
  state: {
    reviewLoading: false,
    reviewError: '',
    error: false,
  },
  mutations: {
    reviewLoading: mutations.reviewLoading,
    getReviews: mutations.getReviews,
    reviewErrorState: mutations.reviewErrorState,
  },
  actions: {
    getMyReviews: actions.getMyReviews,
    postReview: actions.postReview,
    deleteReview: actions.deleteReview,
  },
};

export default store;
