import React from 'react';
import { Field, reduxForm } from 'redux-form';

const postToSignUp = info =>
  fetch('/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

const SignUpForm = () => {
  const { handleSubmit } = this.props;
  return (
    <form onSubmit={handleSubmit(postToSignUp)}>
      <Field name="email" component="input" type="text" />
      <button type="submit">Sign Up!</button>
    </form>
  );
};

export default reduxForm({ form: 'signUp' })(SignUpForm);
