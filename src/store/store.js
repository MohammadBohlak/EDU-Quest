// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from "./slices/loaderSlice"
import themeSlice from "./slices/themeSlice"
import languageReducer from "./slices/languageSlice";
export const store = configureStore({
  reducer: {  
    loader: loaderSlice,
    theme: themeSlice , 
    lang: languageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // تفعيل أدوات التطوير فقط في وضع التطوير
});

