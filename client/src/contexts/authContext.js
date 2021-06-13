import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { apiUrl } from './actionType';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    clients: null
  });

  // Authenticate user
  const loadUser = async () => {
    if (localStorage['user']) {
      setAuthToken(localStorage['user']);
    }

    try {
      const res = await axios.get(`${apiUrl}/auth`);
      if (res.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: res.data.user,
            clients: res.data.clientsId
          }
        });
      }
    } catch (error) {
      localStorage.removeItem('user');
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null }
      });
    }
  };

  useEffect(() => loadUser(), []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem('user', response.data.accessToken);

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem('user', response.data.accessToken);

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem('user');
    dispatch({
      type: 'SET_AUTH',
      payload: { isAuthenticated: false, user: null }
    });
  };

  // Context data
  const authContextData = { loginUser, registerUser, logoutUser, authState };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
