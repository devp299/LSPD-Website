// auth.js
import { createSlice } from '@reduxjs/toolkit';
import { adminLogin, adminLogout, getAdmin } from "./thunks/admin";
import toast from 'react-hot-toast';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAdmin: false,
    user: null,
    isAuthenticated: false,
    adminOnly: false
  },
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    userNotExists: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user-token');
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user-token');
    },
    adminExists: (state,action) => {
      state.isAdmin = true;
      state.user = action.payload;
    },
    adminNotExists: (state) => {
      state.isAdmin = null;
      state.adminOnly = false;
      localStorage.removeItem('lspd-admin-token');
    },
    adminlogout: (state) => {
      state.isAdmin = false;
      state.adminOnly = false;
      localStorage.removeItem('lspd-admin-token');
    }
  },
});

export const { userExists, userNotExists, logout,adminExists,adminNotExists,adminlogout } = authSlice.actions;
export default authSlice.reducer;
