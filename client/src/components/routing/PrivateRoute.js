import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated }
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
