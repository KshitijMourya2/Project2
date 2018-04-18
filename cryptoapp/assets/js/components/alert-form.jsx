import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../api';

function AlertForm(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};

    data[tgt.attr('name')] = tgt.val();
    data["coin_name"]=params.token.coin_name;

    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function submit(ev) {
    api.submit_alert(params.form);
  }

  let coins = _.map(params.coins, (cc) => <option key={cc.id} value={cc.coin_name}>{cc.coin_name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Alert</h2>
    <FormGroup>
      <Label for="currency_name">Select Currency Name</Label>
      <Input type="select" name="currency_name" value={coins.coin_name} onChange={update} multiple>
        {coins}
      </Input>
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
    <Button onClick={submit} color="success">Create Alert</Button> &nbsp; &nbsp; &nbsp;
    <Link className="btn btn-danger" to={"/"}>Cancel</Link>
  </div>;
}

function state2params(state) {
  return {
    form: state.form,
    users: state.users,
 };
}

// Export the result of a curried function call.
export default connect(state2params)(AlertForm);
