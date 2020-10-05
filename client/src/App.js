import React, { useContext } from 'react';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';
import { AuthContext } from './context/authContext';
import Login from './components/login';
import Register from './components/register';

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  console.log(user, isAuthenticated);
  return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
  );
}

export default App;