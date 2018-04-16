import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api';

function EditForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};

    if (tgt.attr('name') == "completed") {
      data["completed"] = $(tgt).is(':checked') ? 'true' : 'false';
    }
    else {
      data[tgt.attr('name')] = tgt.val();
    }

    let action = {
      type: 'UPDATE_EDIT_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function edit(ev) {
    var alert_id = params.form.id;
    api.edit_alert(params.form, alert_id);
  }

  return <div style={{padding: "4ex"}}>
    <h2>Edit Alert</h2>
    <FormGroup>
      <Label for="currency_name">Currency Name</Label>
      <Input name="currency_name" value={params.form.currency_name} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="upper_limit">Upper limit</Label>
      <Input type="number" min="0" step="15" name="upper_limit" value={params.form.upper_limit || 0} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="lower_limit">Lower limit</Label>
      <Input type="number" min="0" step="15" name="lower_limit" value={params.form.lower_limit || 0} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="currentprice">Current Price</Label>
      <Input type="number" name="currentprice" value={params.form.currentprice} onChange={update} disabled />
    </FormGroup>
    <Link onClick={edit} className="btn btn-success" to={"/"}>Update Alert</Link> &nbsp;
    <Link className="btn btn-danger" to={"/"}>Cancel</Link>
  </div>;
}

function state2params(state) {
  return {
    form: state.editform,
    users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2params)(EditForm);
