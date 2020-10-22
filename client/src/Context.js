import React, { Component } from 'react';
import { APIHelper } from './APIHelper';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.helper = new APIHelper();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    token: Cookies.getJSON('token') || null,
  }

  render() {
    const { authenticatedUser, token } = this.state;
    const value = {
      authenticatedUser,
      token,
      helper: this.helper,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    }

    return (
      <Context.Provider value={value} >
        {this.props.children}
      </Context.Provider>
    );
  }

  //Context actions
  signIn = async (emailAddress, password) => {
    // Generate credential token for future auth calls
    const encodedCredentials = btoa(`${emailAddress}:${password}`);
    const token = `Basic ${encodedCredentials}`
    
    const user = await this.helper.getUser(token);
    if (user !== null) {
      this.setState(() => {
        return { authenticatedUser: user, token }
      });

      // Set cookies for future calls
      Cookies.set('authenticatedUser', JSON.stringify(user),{ expires: 1 });
      Cookies.set('token', JSON.stringify(token), { expires: 1 });
    }
    return user;
  }
  signOut = () => {
    this.setState({ 
      authenticatedUser: null,
      token: null,
   });
    Cookies.remove('authenticatedUser');
    Cookies.remove('token');
  }
}

export const Consumer = Context.Consumer;

// Context wrapper. Used to provide context to wrapped components
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}