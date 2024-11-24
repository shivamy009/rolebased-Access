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
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      saveUserToLocalStorage(action.payload); // Save to localStorage
    },
    clearUser: (state) => {
      state.userData = null;
      clearUserFromLocalStorage(); // Clear localStorage
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
