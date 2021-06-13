export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, clients }
  } = action;

  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
        clients
      };

    default:
      return state;
  }
};
