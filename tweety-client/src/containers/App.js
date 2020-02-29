import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../containers/Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';


const store = configureStore();

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent tampering with the key fo jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }

}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="logged-out">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;
