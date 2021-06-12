import React from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

const Header = (props) => {
  const {
    authState: {
      user: { role, expertId, clientId }
    },
    logoutUser
  } = useContext(AuthContext);

  const name = role === 'client' ? clientId.name : expertId.name;

  return (
    <>
      <Container>
        <Row>
          <Col />
          <Col md={12} xs={12} className='text-center mt-3'>
            <Navbar bg='light' expand='lg'>
              <Navbar.Brand href='#home'>Health App</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link href='#home'>Trang chủ</Nav.Link>
                  <Nav.Link href='#diet'>Chế độ ăn</Nav.Link>
                  <Nav.Link href='#exercise'>Chế độ tập luyện</Nav.Link>
                  {role === 'expert' && (
                    <Nav.Link href='#link'>Đăng bài</Nav.Link>
                  )}
                </Nav>
                <div>
                  <span>Xin chào, {name}</span>
                  <Button
                    variant='secondary'
                    className='ml-2'
                    onClick={logoutUser}
                  >
                    Log out
                  </Button>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  );
};

export default Header;
