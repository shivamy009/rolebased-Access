// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const loadUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem('userData');
  return savedUser ? JSON.parse(savedUser) : null;
};

const saveUserToLocalStorage = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

const clearUserFromLocalStorage = () => {
  localStorage.removeItem('userData');
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: loadUserFromLocalStorage(), // Load from localStorage
    access_token: localStorage.getItem("access_token") || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      saveUserToLocalStorage(action.payload); // Save to localStorage
    },
    setAccessToken: (state, action) => {
        state.access_token = action.payload;
        localStorage.setItem("access_token", action.payload); // Save to localStorage
      },
    clearUser: (state) => {
      state.userData = null;
      clearUserFromLocalStorage(); // Clear localStorage
    },
    clearAccessToken: (state) => {
        state.access_token = null;
        localStorage.removeItem("access_token"); // Clear from localStorage
      },
  },
});

export const { setUser, clearUser,setAccessToken,clearAccessToken } = userSlice.actions;
export default userSlice.reducer;
