import * as React from 'react';
// import './Blockstack.css';
import Signin from './Signin';
import Profile from './Profile';
import Home from "./Home";
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';

class Blockstack extends React.Component {

  constructor(props){
    super(props);
    this._handleSignIn = this._handleSignIn.bind(this);
    this._handleSignOut = this._handleSignOut.bind(this);
    this.state = {
      blockurl: window.location.origin + "/blockstack",
      manifest: window.location.origin + "/manifest.json",
    }
  }

  componentWillMount() {
    this.props.setBlockstackTrue();
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = this.state.blockurl;
      });
    }
  }

  _handleSignIn(e) {
    e.preventDefault();
    //https://blockstack.github.io/blockstack.js/index.html#redirecttosignin
    redirectToSignIn(this.state.blockurl, this.state.manifest);
  }

  _handleSignOut(e) {
    e.preventDefault();
    signUserOut(this.state.blockurl);
    // manually clear local storage blockstack key
    // @TODO ask proper way
    localStorage.setItem("blockstack-transit-private-key", false);
  }

  render () {
      return (
        <div className="Blockstack">
          {!isUserSignedIn() ?
            <Signin handleSignIn={this._handleSignIn}/>
            : <Profile handleSignOut={this._handleSignOut}/>}
          <Home {...this.props} />
        </div>)
  }
}

export default Blockstack;

