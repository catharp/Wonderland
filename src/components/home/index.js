import React, { Component } from 'react';
import { SignUpForm } from '..';
import logo from '../../../assets/logo.svg';
import './styles.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Like great food and learning new skills from real people?</h2>
        </div>
        <p className="App-intro">
           So do we, and we're planning something big!  Sign up, and we'll keep you posted...
        </p>
        <SignUpForm />
      </div>
    );
  }
}

export default Home;
