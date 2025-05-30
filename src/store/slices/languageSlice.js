import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n"; // استيراد i18next لتحديث اللغة فورًا

// الحالة الابتدائية (اللغة الافتراضية هي الإنجليزية)
const initialState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en"; // تبديل اللغة بين العربية والإنجليزية فقط
      i18n.changeLanguage(state.language); // تحديث اللغة في i18next
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
