// src/store/initUser.js
export const loadUserFromStorage = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    return {
      isAuthenticated: true,
      token,
      user,
    };
  }

  return {
    isAuthenticated: false,
    token: null,
    user: {
      id: null,
      name: "",
      email: "",
      role: "",
    },
  };
};
