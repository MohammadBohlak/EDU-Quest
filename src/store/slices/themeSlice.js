// src/store/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

// قراءة التفضيل المحفوظ في localStorage (مع fallback لتفضيل النظام)
const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const initialState = getInitialTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => (state === "light" ? "dark" : "light"),
    // تعيين قيمة محددة (مفيدة عند المزامنة مع تفضيل النظام أو من زر معيّن)
    setTheme: (_state, action) => {
      const next = action.payload;
      return next === "dark" ? "dark" : "light";
    },
  },
});

// تصدير الإجراءات (actions) والمخفض (reducer)
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
