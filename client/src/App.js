import React from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';
// import { AuthContext } from './context/authContext';
import Login from './components/login';
import Register from './components/register';
import Todos from './components/todos';
import Admin from './components/admin';
import PrivateRoute from './hocs/privateRoute';
import UnPrivateRoute from './hocs/unprivateRoute';

function App() {
  // const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  // console.log(user, isAuthenticated);
  return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <PrivateRoute path='/todos' roles={["user", "admin"]} component={Todos} />
        <PrivateRoute path='/admin' roles={["admin"]} component={Admin} />
      </Router>
  );
}

export default App;