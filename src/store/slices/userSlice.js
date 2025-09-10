import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api/api";
import { useNavigate } from "react-router-dom";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {
    id: null,
    name: "",
    email: "",
    role: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("language", state.user.language);
      localStorage.setItem("darK_mode", state.user.darK_mode);
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("language");
      localStorage.removeItem("darK_mode");
      state.isAuthenticated = false;
      state.token = null;
      state.user = {
        id: null,
        name: "",
        email: "",
        role: "",
      };
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
