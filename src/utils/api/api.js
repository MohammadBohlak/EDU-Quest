// utils/api/api.js
import axios from "axios";
import { store } from "../../store/store";
import { hideLoader, showLoader } from "../../store/slices/loaderSlice";
import { logout } from "../../store/slices/authSlice";

const API_BASE_URL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// طلب: إظهار اللودر + إرفاق التوكن إن وجد
api.interceptors.request.use((config) => {
  store.dispatch(showLoader());
  const token = store.getState().auth?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// استجابة: إخفاء اللودر + معالجة 401 (تسجيل خروج تلقائي)
api.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    if (error?.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
