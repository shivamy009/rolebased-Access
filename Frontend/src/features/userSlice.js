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

// Helper functions for admin data in localStorage
const loadAdminFromLocalStorage = () => {
  const savedAdmin = localStorage.getItem('adminData');
  return savedAdmin ? JSON.parse(savedAdmin) : null;
};

const saveAdminToLocalStorage = (adminData) => {
  localStorage.setItem('adminData', JSON.stringify(adminData));
};

const clearAdminFromLocalStorage = () => {
  localStorage.removeItem('adminData');
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: loadUserFromLocalStorage(), // Load user from localStorage
    access_token: localStorage.getItem('access_token') || null,
    adminData: loadAdminFromLocalStorage(), // Load admin from localStorage
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      saveUserToLocalStorage(action.payload); // Save user to localStorage
    },
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
      localStorage.setItem('access_token', action.payload); // Save token to localStorage
    },
    clearUser: (state) => {
      state.userData = null;
      clearUserFromLocalStorage(); // Clear user from localStorage
    },
    clearAccessToken: (state) => {
      state.access_token = null;
      localStorage.removeItem('access_token'); // Clear token from localStorage
    },
    setAdmin: (state, action) => {
      state.adminData = action.payload;
      saveAdminToLocalStorage(action.payload); // Save admin to localStorage
    },
    clearAdmin: (state) => {
      state.adminData = null;
      clearAdminFromLocalStorage(); // Clear admin from localStorage
    },
  },
});

export const { setUser, clearUser, setAccessToken, clearAccessToken, setAdmin, clearAdmin } = userSlice.actions;
export default userSlice.reducer;
