import FetchApi from '../../../utils/fetchApi';

export const signUp = async (context, userData) => {
  // eslint-disable-next-line object-curly-newline
  const { firstname, lastname, username, email, password, confirmPassword } = userData.data;
  context.commit('loading', true);
  const fetch = new FetchApi('user/signUp');
  try {
    const res = await fetch.postApi({
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
};

export const signIn = async (context, { username, password }) => {
  context.commit('loading', true);
  const fetch = new FetchApi('user/signIn');
  try {
    const res = await fetch.postApi({ username, password });
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
};

export const forgotPassword = async (context, email) => {
  context.commit('loading', true);
  const fetch = new FetchApi('user/forgotPassword');
  try {
    await fetch.postApi({ email });
    context.commit('loading', false);
    context.commit('message', 'Email sent successfully.Please check your email!');
  } catch (error) {
    context.commit('loading', false);
    if (error.message.includes('404')) {
      context.commit('message', 'There is no user with that email address!');
    } else context.commit('message', 'Something went wrong!');
  }
};

export const resetPassword = async (context, { password, confirmPassword, token }) => {
  context.commit('loading', true);
  const fetch = new FetchApi('user/resetPassword');
  try {
    await fetch.patchApi(
      {
        password,
        confirmPassword,
      },
      token,
    );
    context.commit('loading', false);
    context.commit('message', 'Password updated successfully!');
  } catch (error) {
    context.commit('loading', false);
    if (error.message.includes('400')) {
      context.commit('message', 'Token is invalid or expired!');
    } else context.commit('message', 'Something went wrong!');
  }
};

export const confirmEmail = async (context, token) => {
  context.commit('loading', true);
  const fetch = new FetchApi('user/confirmEmail');
  try {
    context.commit('loading', false);
    await fetch.getApi(token);
    context.commit('errorState', false);
  } catch (error) {
    context.commit('loading', false);
    context.commit('errorState', true);
  }
};
