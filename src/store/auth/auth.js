import * as mutations from './mutations/mutation';
import * as actions from './actions/action';

const store = {
  state: {
    token: '',
    loading: false,
    message: '',
    error: false,
  },
  mutations: {
    loading: mutations.loading,
    message: mutations.message,
    responseToken: mutations.responseToken,
    errorState: mutations.errorState,
  },
  actions: {
    signUp: actions.signUp,
    signIn: actions.signIn,
    forgotPassword: actions.forgotPassword,
    resetPassword: actions.resetPassword,
    confirmEmail: actions.confirmEmail,
  },
  modules: {},
};

export default store;
