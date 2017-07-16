import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const postToSignUp = (body) => {
  console.log('posting:', body);
  fetch("/signup",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(body)
  });
}

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(postToSignUp)}>
        <Field name='email' component='input' type='text' />
        <button type='submit'>Sign Up!</button>
      </form>
    );
  }
};

SignUpForm = reduxForm({
  form: 'signUp'
})(SignUpForm);

export default SignUpForm;
