import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import api from '../api';

function User(params) {
  let user = params.user;

  function edit_user(ev) {
    let action = {
      type: 'UPDATE_REGISTER_FORM',
      data: params.user,
    };
    params.dispatch(action);
  }

  function submit(ev) {
    api.delete_user(params.user.id);
  }

  return <Card>
    <CardBody>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p>Name: <b>{ user.name }</b></p>
        <p>Email id: <b>{ user.email }</b></p>
      </div>
    </CardBody>
  </Card>;
}

function state2props(state) {
  return {
    form: state.form,
    users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2props)(User);
