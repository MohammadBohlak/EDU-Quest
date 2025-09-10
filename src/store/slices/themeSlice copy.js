// src/features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = "light"

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return state === 'light' ? 'dark' : 'light';
    },

  }
});

// تصدير الإجراءات (actions) والمخفض (reducer)
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
