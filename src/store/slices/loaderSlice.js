import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
    requestCount: 0
  },
  reducers: {
    showLoader: (state) => {
      state.requestCount += 1;
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.requestCount = Math.max(0, state.requestCount - 1);
      state.isLoading = state.requestCount > 0;
    }
  }
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;