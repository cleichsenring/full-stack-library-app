import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from './Form'

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
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
    const { from } = this.props.location.state || {from: {pathname: '/'}};
    const { emailAddress, password, } = this.state;
    const { context } = this.props;
    // Attempt to get user from DB
    context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user === null) {
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful'] };
          });
        } else {
          // If user signs in successfully redirect back to path that they came from
          this.props.history.push(from);
          console.log('Sign in successful!');
        }
      })
      .catch(() => this.props.history.push('/error'));
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const {
      emailAddress,
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
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
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
}