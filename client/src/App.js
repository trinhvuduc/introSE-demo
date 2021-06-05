import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing}></Route>
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
        <Route exact path='/home' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
