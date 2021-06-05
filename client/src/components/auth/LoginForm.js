import { Button, Form, Container, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Row>
        <Col />
        <Col md={6} xs={12} className='text-center mt-3'>
          <h2 className='ml-2'>Đăng nhập</h2>
          <Form>
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
