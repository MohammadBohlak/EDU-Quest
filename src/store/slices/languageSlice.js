// src/store/slices/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";

// قراءة اللغة المحفوظة في localStorage (الافتراضي: en)
const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("lang");
  return saved === "ar" || saved === "en" ? saved : "en";
};

// الحالة الابتدائية
const initialState = {
  language: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // ⚠️ ملاحظة: تم نقل استدعاء i18n.changeLanguage إلى listener middleware
    // (انظر src/store/middleware/i18nListener.js) للحفاظ على نقاء الـ reducer.
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "ar" : "en";
    },
    setLanguage: (state, action) => {
      const next = action.payload;
      if (next === "ar" || next === "en") {
        state.language = next;
      }
    },
  },
});

// الإبقاء على التصدير القديم (changeLanguage) للتوافق مع الكود الحالي
export const { toggleLanguage, setLanguage } = languageSlice.actions;
export const changeLanguage = toggleLanguage;
export default languageSlice.reducer;
