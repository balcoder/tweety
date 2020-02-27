import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = ({ currentUser }) => {
  if(!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>What's going on</h1>
        <h4>New to Tweety</h4>
        <Link to='/signup' className="btn btn-primary">
          Sign up 
        </Link>
      </div>
    );
  } else {
    return (
      <div>Your in!!!!!!!!!!!!!</div>
    );
  }
    
}
  


export default Homepage;