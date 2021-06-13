import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { AuthContext } from '../contexts/authContext';

const Home = () => {
  const {
    authState: {
      user: { role, expertId, clientId }
    }
  } = useContext(AuthContext);

  const name = role === 'client' ? clientId.name : expertId.name;

  return (
    <>
      <Container>
        <Row>
          <Col md={12} xs={12} className='text-center mt-3'>
            <h1>Home</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
