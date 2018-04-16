import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import api from '../api';

function Alert(params) {
  let alert = params.alert;

  function edit_alert(ev) {
    let action = {
      type: 'UPDATE_EDIT_FORM',
      data: params.alert,
    };
    params.dispatch(action);
  }
  return <Card>
    <CardBody>
      <div>
        <p>Currency Name: <b>{ alert.currency_name }</b></p>
        <p>Upper Limit: <b>{ alert.upper_limit }</b></p>
        <p>Lower Limit: <b>{ alert.lower_limit ? "Yes" : "No" }</b></p>
        <p>Current Price: <b>{ alert.currentprice }</b></p>
        <div><Link to={"/editAlert"} className="btn btn-primary" onClick={ edit_alert }>Edit</Link></div>
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
export default connect(state2props)(Alert);
