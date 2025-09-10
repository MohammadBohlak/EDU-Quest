import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n"; // استيراد i18next لتحديث اللغة فورًا

const initialState = {
  language: localStorage.getItem("language") || "en", // تحميل اللغة من التخزين المحلي
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      const newLang = action.payload;
      state.language = newLang;
      i18n.changeLanguage(newLang); // تحديث اللغة في i18next
      localStorage.setItem("language", newLang); // حفظ اللغة في التخزين المحلي
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
