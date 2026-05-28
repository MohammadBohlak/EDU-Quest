// src/store/middleware/persistenceListener.js
// listener middleware يقوم بالـ side effects (localStorage + i18n)
// بحيث تبقى الـ reducers نقية (pure).
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import { toggleTheme, setTheme } from "../slices/themeSlice";
import { toggleLanguage, setLanguage } from "../slices/languageSlice";
import { setCredentials, logout } from "../slices/authSlice";

export const persistenceListener = createListenerMiddleware();

// 🎨 مزامنة التيم مع localStorage
persistenceListener.startListening({
  matcher: isAnyOf(toggleTheme, setTheme),
  effect: (_action, listenerApi) => {
    const theme = listenerApi.getState().theme;
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      /* تجاهل أخطاء localStorage (وضع التخفي/quota) */
    }
  },
});

// 🌐 مزامنة اللغة مع localStorage و i18n
persistenceListener.startListening({
  matcher: isAnyOf(toggleLanguage, setLanguage),
  effect: (_action, listenerApi) => {
    const { language } = listenerApi.getState().lang;
    try {
      window.localStorage.setItem("lang", language);
    } catch {
      /* تجاهل */
    }
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  },
});

// 🔐 مزامنة المصادقة مع localStorage
persistenceListener.startListening({
  matcher: isAnyOf(setCredentials, logout),
  effect: (_action, listenerApi) => {
    const { user, token } = listenerApi.getState().auth;
    try {
      if (token) {
        window.localStorage.setItem("token", token);
      } else {
        window.localStorage.removeItem("token");
      }
      if (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
      } else {
        window.localStorage.removeItem("user");
      }
    } catch {
      /* تجاهل */
    }
  },
});
