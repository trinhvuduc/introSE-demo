import LoginForm from '../components/auth/LoginForm';
import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated }
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  else if (isAuthenticated) return <Redirect to='/home' />;

  return (
    <>
      {authRoute === 'login' && <LoginForm />}
      {/* {authRoute === 'register' && <RegisterForm />} */}
    </>
  );
};

export default Auth;
