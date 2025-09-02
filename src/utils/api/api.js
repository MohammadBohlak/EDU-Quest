// utils/api/api.js
import axios from "axios";
// import { store } from "../../store/store";
// import { hideLoader, showLoader } from "../../store/slices/loaderSlice";

const API_BASE_URL = "https://edu-f.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 11|2dQz9cNtDcNJrfURsh1iy4veODbF9czc9tCUYx059956e2ad",
  },
});

// api.interceptors.request.use((config) => {
//   store.dispatch(showLoader());
//   return config;
// });

// api.interceptors.response.use(
//   (response) => {
//     store.dispatch(hideLoader());
//     return response;
//   },
//   (error) => {
//     store.dispatch(hideLoader());
//     return Promise.reject(error);
//   }
// );
