import { Button, Form, Container, Col, Row } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import AlertMessage from './AlertMessage';
import { FaMeteor } from 'react-icons/fa';

import './LoginForm.css';

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
          <div className='mt-3' style={{ color: '#565555' }}>
            <FaMeteor className='meteor' />
            <h5 className='mt-2'>HealthApp</h5>
          </div>
          <div
            style={{
              width: '400px',
              marginLeft: '70px',
              marginBottom: '-30px',
              marginTop: '37px'
            }}
          >
            <AlertMessage info={alert} style={{ borderRadius: '9px' }} />
          </div>
          <div className='box'>
            <h6 className='text-1'>Tên đăng nhập</h6>

            <Form onSubmit={onLogin}>
              <Form.Group>
                <Form.Control
                  type='text'
                  name='username'
                  required
                  value={username}
                  onChange={onChangeLoginForm}
                />
              </Form.Group>
              <h6 className='text-2'>Mật khẩu</h6>
              <h6 className='text-3a'>Quên mật khẩu?</h6>
              <Form.Group>
                <Form.Control
                  type='password'
                  name='password'
                  required
                  value={password}
                  onChange={onChangeLoginForm}
                />
              </Form.Group>
              <Button variant='success' type='submit' className='login'>
                Đăng nhập
              </Button>
            </Form>
          </div>
          <div className='newAccount'>
            Bạn mới sử dụng HealthApp? <span>Tạo tài khoản ngay.</span>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default LoginForm;
