import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';

const Home = () => {
  const {
    authState: {
      user: { role, expertId, clientId }
    }
  } = useContext(AuthContext);

  const name = role === 'client' ? clientId.name : expertId.name;

  return (
    <>
      <h1>Xin chào {name}</h1>
      <h3>role: {role}</h3>
    </>
  );
};

export default Home;
