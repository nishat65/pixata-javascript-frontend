import * as mutations from './mutations/mutation';
import * as actions from './actions/action';

const store = {
  state: {
    loading: false,
    myData: {},
    error: false,
    token: '',
  },
  mutations: {
    loading: mutations.loading,
    myData: mutations.myData,
    errorState: mutations.errorState,
  },
  actions: {
    getMyData: actions.getMyData,
    updateProfile: actions.updateProfile,
    updatePassword: actions.updatePassword,
  },
  modules: {},
};

export default store;
