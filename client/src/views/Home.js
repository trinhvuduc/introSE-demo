import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';

const Home = () => {
  const {
    authState: { user }
  } = useContext(AuthContext);

  console.log(user);
  const { role, expertId, clientId } = user;
  const name = role === 'client' ? clientId.name : expertId.name;

  return <h1>Xin chào {name}</h1>;
};

export default Home;
