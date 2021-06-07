import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import Home from './views/Home';
import AuthContextProvider from './contexts/authContext';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route
            exact
            path='/login'
            render={(props) => <Auth {...props} authRoute='login' />}
          />
          <Route
            exact
            path='/register'
            render={(props) => <Auth {...props} authRoute='register' />}
          />
          <PrivateRoute exact path='/home' component={Home} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
