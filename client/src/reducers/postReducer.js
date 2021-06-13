import {
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST
} from '../contexts/actionType';

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        postsLoading: false
      };
    default:
      return state;
  }
};
