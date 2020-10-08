export const loading = (state, payload) => {
  state.loading = payload;
};

export const getPosts = (state, payload) => {
  state.posts = [...payload];
};

export const errorState = (state, payload) => {
  state.error = payload;
};
