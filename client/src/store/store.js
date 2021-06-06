import {
  createSlice,
  configureStore,
  createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';

import { apiUrl, LS_TOKEN_NAME } from './constants';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (res.data.success) {
        localStorage.setItem('client', res.data.accessToken);
      }
      return res.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      return { success: false, message: error.message };
    }
  }
);

const authSlide = createSlice({
  name: 'auth',
  initialState: {
    auth: {
      isLoading: true,
      isAutenticated: false,
      user: null
    }
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      console.log('Posting loginUser...');
    },
    [loginUser.fulfilled]: (state, action) => {
      // state.isLoading = false,
      // state.isAutenticated = true,
      console.log(action.payload);
    }
  }
});

// Reducer
const authReducer = authSlide.reducer;

// Store
const store = configureStore({
  reducer: {
    authReducer
  }
});

// Selector
export const authSelector = (state) => state.authReducer.auth;

// Action
// export const { loginUser } = authSlide.actions;

export default store;
