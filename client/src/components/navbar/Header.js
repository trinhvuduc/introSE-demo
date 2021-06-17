import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { FaMeteor } from 'react-icons/fa';

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
          <Col md={12} xs={12}>
            <Navbar bg='light' expand='lg'>
              <a href='/home' style={{ color: '#565555' }}>
                <FaMeteor
                  style={{
                    width: '25px',
                    height: '25px',
                    marginBottom: '5px',
                    cursor: 'pointer'
                  }}
                />
                <Navbar.Brand className='ml-1'>HealthApp</Navbar.Brand>
              </a>

              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link to='/diet' as={Link}>
                    Chế độ ăn
                  </Nav.Link>
                  <Nav.Link>Chế độ tập luyện</Nav.Link>
                  {role === 'expert' && (
                    <Nav.Link to='/post' as={Link}>
                      Đăng bài
                    </Nav.Link>
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
        </Row>
      </Container>
    </>
  );
};

export default Header;
