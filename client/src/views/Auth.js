import LoginForm from '../components/auth/LoginForm';

const Auth = ({ authRoute }) => {
  return (
    <>
      {authRoute === 'login' && <LoginForm />}
      {/* {authRoute === 'login' && <RegisterForm />} */}
    </>
  );
};

export default Auth;
