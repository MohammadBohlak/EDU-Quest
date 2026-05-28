// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// قراءة بيانات المصادقة المحفوظة (token + user) من localStorage
const getInitialAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null, isAuthenticated: false };
  }
  const token = window.localStorage.getItem("token");
  const userRaw = window.localStorage.getItem("user");
  let user = null;
  try {
    user = userRaw ? JSON.parse(userRaw) : null;
  } catch {
    user = null;
  }
  return {
    user,
    token: token || null,
    isAuthenticated: Boolean(token),
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuth(),
  reducers: {
    // عند نجاح تسجيل الدخول/الاشتراك: payload = { user, token }
    setCredentials: (state, action) => {
      const { user, token } = action.payload || {};
      state.user = user ?? null;
      state.token = token ?? null;
      state.isAuthenticated = Boolean(token);
    },
    // تحديث بيانات المستخدم فقط (مثلاً بعد تعديل الملف الشخصي)
    setUser: (state, action) => {
      state.user = action.payload ?? null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
