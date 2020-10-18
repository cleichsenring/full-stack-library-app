import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form'

import { APIHelper } from '../APIHelper';
const helper = new APIHelper();

export default class UserSignIn extends Component {
  state = {
    username: '',
    password: '',
    errors: [],
  }
  
  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.change}
                  placeholder="Username" />
                <input 
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
              </React.Fragment>  
            )}
          />
          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
    );
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return { [name]: value };
    });
  }

  submit = () => {
    // TODO - fix FROM
    // const { from } = this.props.location.state || {from: {pathname: 'CHANGE ME'}}
    const { username, password, } = this.state;
    //Add context here
    helper.getUser(username, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful'] };
          });
        } else {
          // this.props.history.push(from);
          console.log('Sign in successful!');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error')
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}