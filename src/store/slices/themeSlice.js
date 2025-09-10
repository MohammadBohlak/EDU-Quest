// src/features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = "light";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => (state === "light" ? "dark" : "light"),
    setTheme: (state, action) => action.payload, // "light" أو "dark"
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
