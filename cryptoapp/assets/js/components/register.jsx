import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import api from '../api';

function Register(params) {

  let email = false;

  function handleValidSubmit(event, values) {
    this.setState({email: values.email});
  }

  function handleInvalidSubmit(event, errors, values) {
    this.setState({email: values.email, error: true});
  }

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();

    let action = {
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function submit(ev) {
    var new_user = {name: params.form.name, email: params.form.email, password: params.form.pass}
    api.submit_user(new_user);
  }

  function clear(ev) {
    params.dispatch({
      type: 'CLEAR_REGISTER_FORM',
    });
  }

  return <div style={{padding: "4ex"}}>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <h3>New User</h3>
    <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
        <AvField name="name" label="Name" value={params.form.name} placeholder="Abc" onChange={update} required />
        <AvField name="email" label="Email Address" type="email" value={params.form.email} placeholder="abc@example.com" onChange={update} required />
        <AvField name="pass" label="Password" type="password" value={params.form.pass} placeholder="password" onChange={update} required />
      <Link onClick={submit} to={"/"} className="btn btn-success">Register</Link> &nbsp; &nbsp;
      <Button onClick={clear} color="danger">Clear</Button>
    </AvForm>
  </div>;
}

function state2params(state) {
  return {
    form: state.register,
    users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2params)(Register);
