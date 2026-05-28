// src/store/slices/loaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
    requestCount: 0,
  },
  reducers: {
    showLoader: (state) => {
      state.requestCount += 1;
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.requestCount = Math.max(0, state.requestCount - 1);
      state.isLoading = state.requestCount > 0;
    },
    // للاستخدام في حال علق طلب أو عند تسجيل الخروج لتفادي بقاء spinner ظاهر
    resetLoader: (state) => {
      state.requestCount = 0;
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader, resetLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
