import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    }
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(() => {
      this.props.history.push('/')
    })
    .catch(err => {
      return err
    })
  };
  

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { heading, buttonText, signUp, errors, history, removeError } = this.props;

    //before return, call history.listen which will listen for any change in the route
    history.listen(() => {
      removeError();
    })

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (
              <div className="alert alert-danger">{errors.message}</div>
              )}
              <label htmlFor="email">Email</label>
              <input 
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={this.email}
                type="text"
                />
              <label htmlFor="password">Password</label>
              <input 
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}               
                type="password"
                />
                {signUp && ( // passed in signup from Main.js so we only show on signup page
                  <div>                   
                  <label htmlFor="username">Username</label>
                  <input 
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.username}
                    type="text"
                    />
                  <label htmlFor="image-url">Image URL</label>
                  <input 
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    onChange={this.handleChange}               
                    type="text"
                    value={this.profileImageUrl}
                    />
                  </div>
                )}
                <button
                type="submit" 
                className="btn btn-primary btn-block btn-lg" 
                onClick={this.handleSubmit}
                >
                {buttonText}
                </button>             
            </form>
          </div>
        </div>
      </div>
    );
  }
}
