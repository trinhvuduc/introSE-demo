import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import Home from './views/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import Diet from './views/Diet';
import Post from './views/Post';

function App() {
  return (
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
        <PrivateRoute exact path='/diet' component={Diet} />
        <PrivateRoute exact path='/post' component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
