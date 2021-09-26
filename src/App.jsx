import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/dashboard">
            {user ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/registration">
            {user ? <Redirect to="/dashboard" /> : <SignUp />}
          </Route>
          <Route exact path="/">
            {user ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
