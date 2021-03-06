import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from './Form';


export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }
  
  // Updates state value when form is updated
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return { [name]: value };
    });
  }

  submit = () => {
    const { context } = this.props;

    // Verify that password and confirm password match before attempting to create user
    if (this.state.password !== this.state.confirmPassword) {
      this.setState(() => {
        return {errors: ['Password must match!']}
      })
    } else {
      // Create user payload
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
      }

      // Create new user in DB
      context.helper.createUser(user)
        .then(errors => {
          if (errors.length) {
            this.setState(() => { 
              return {errors: errors}
            });
          } else {
            // If new user created successfully, sign user in and redirect to main page
            context.actions.signIn(user.emailAddress, user.password)
              .then(() => this.props.history.push('/'))
              .catch(() => this.props.history.push('/error'));
          }
        })
        .catch(() => this.props.history.push('/error'));
    }
  }

  cancel = () => {
    this.props.history.push('/');
  }
  
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name" />
                <input 
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name" />
                <input 
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" />
                <input 
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password" />
                <input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password" />
              </React.Fragment>
            )}
          />
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>      
      
    );
  }

}