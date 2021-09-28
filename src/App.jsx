import { useCookies } from 'react-cookie';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/dashboard/:id">
            {user ? <Dashboard /> : <Redirect to="/" />}
          </Route>
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
