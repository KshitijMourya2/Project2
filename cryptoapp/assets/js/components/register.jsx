import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api';

function Register(params) {

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
    <h3>New User</h3>
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input name="name" value={params.form.name} placeholder="Abc" onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" value={params.form.email} placeholder="abc@example.com" onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="pass">Password</Label>
          <Input type="password" name="pass" value={params.form.pass} placeholder="password" onChange={update} />
      </FormGroup>
      <Link onClick={submit} to={"/"} className="btn btn-success">Register</Link> &nbsp; &nbsp;
      <Button onClick={clear} color="danger">Clear</Button>
    </Form>
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
