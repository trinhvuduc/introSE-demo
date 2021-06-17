import { createContext, useReducer } from 'react';
import axios from 'axios';

import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST
} from './actionType';
import { postReducer } from '../reducers/postReducer';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // State
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true
  });

  // Get all posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/post`);
      if (res.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: res.data.posts });
        return res.data;
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // Create post
  const addPost = async (newPost) => {
    try {
      const res = await axios.post(`${apiUrl}/post`, newPost);
      if (res.data.success) {
        dispatch({ type: ADD_POST, payload: res.data.post });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error!' };
    }
  };

  // Post context data
  const postContextData = { postState, getPosts, addPost };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
