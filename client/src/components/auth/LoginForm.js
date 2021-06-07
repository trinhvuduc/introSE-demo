import { Button, Form, Container, Col, Row } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import AlertMessage from './AlertMessage';

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col />
        <Col md={6} xs={12} className='text-center mt-3'>
          <h2 className='my-2'>Đăng nhập</h2>
          <AlertMessage info={alert} />
          <Form onSubmit={onLogin}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Username'
                name='username'
                required
                value={username}
                onChange={onChangeLoginForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                required
                value={password}
                onChange={onChangeLoginForm}
              />
            </Form.Group>
            <Button variant='success' type='submit'>
              Login
            </Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default LoginForm;
