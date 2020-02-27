import React from 'react';
import { Switch, Route, withRouter, Redirect } from  'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../component/Homepage';
import AuthForm from '../component/AuthForm';


const Main = props => {
  return (
    <div className="container">
      <Switch>
        <Route exact path='/' render={ props => <Homepage {...props}/>} />        
        <Route exact path='/singin' render={ props => {
          return (
            <AuthForm buttonText="Log in" heading="Welcome back bird!" {...props}/>
          );            
        }} />
        <Route exact path='/singup' render={ props => {
          return (
            <AuthForm buttonText="Sign me up" heading="Get in on the action" {...props}/>
          );            
        }} />            
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps, null)(Main))