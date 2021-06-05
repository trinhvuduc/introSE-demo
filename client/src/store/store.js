import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlide = createSlice({
  name: 'auth',
  initialState: {
    auth: {
      authLoading: true,
      isAutenticated: false,
      user: null
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

export default store;
