import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const signUp = (info) => {
  console.log('posting:', info);
  fetch('/signup', { method: 'POST', info })
  .then(res => console.log(res));
}

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(signUp)}>
        <Field name='email' component='input' type='text' />
        <button type='submit'>Sign Me Up!</button>
      </form>
    );
  }
};

SignUpForm = reduxForm({
  form: 'signUp'
})(SignUpForm);

export default SignUpForm;
