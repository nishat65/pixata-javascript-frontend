export const reviewLoading = (state, payload) => {
  state.reviewLoading = payload;
};

export const getReviews = (state, payload) => {
  state.reviews = [...payload];
};

export const reviewErrorState = (state, payload) => {
  state.reviewError = payload;
};
