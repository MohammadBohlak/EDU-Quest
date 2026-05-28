// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import themeReducer from "./slices/themeSlice";
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";
import { persistenceListener } from "./middleware/persistenceListener";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    theme: themeReducer,
    lang: languageReducer,
    auth: authReducer,
  },
  // إدراج الـ listener middleware قبل الـ default middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistenceListener.middleware),
  // تفعيل أدوات التطوير فقط في وضع التطوير (Vite يستخدم import.meta.env)
  devTools: import.meta.env.MODE !== "production",
});
