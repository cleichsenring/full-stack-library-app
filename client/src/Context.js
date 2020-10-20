import React, { Component } from 'react';
import {APIHelper} from './APIHelper';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.helper = new APIHelper();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
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
    const user = await this.helper.getUser(emailAddress, password);
    if (user !== null) {
      console.log(user)
      this.setState(() => {
        return { authenticatedUser: {user,password} }
      });
      console.log(this.state.authenticatedUser)
      Cookies.set('authenticatedUser', JSON.stringify(user),{ expires: 1 });
    }
    return user;
  }
  signOut = () => {
    this.setState({ authenticatedUser: null });
    console.log('I sign out now!');
    Cookies.remove('authenticatedUser')
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}