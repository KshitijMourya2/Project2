import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import app from '../app';
import $ from "jquery";

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
  }
  console.log("props.login: " + props.login);
  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="email" name="email" placeholder="abc@example.com"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token} color="primary">Log In</Button>&nbsp;
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {

  function logout(ev) {
    // window.location.reload();
    let action = {
        type: "SET_TOKEN",
        token: "",
    };
    props.dispatch(action);
  }

  return <div className="navbar-text">
    Welcome { props.token.user_name } &nbsp;
    <Link onClick={ logout } className="btn btn-danger" to={"/"}>Logout</Link>
  </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  if(props.token){
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <span className="navbar-brand">
          CryptoApp
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/" exact={true} activeClassName="active" className="nav-link">CoinFeed</NavLink>
          </NavItem>
          <UncontrolledDropdown>
            <DropdownToggle caret>
              Subscribe
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} to="/alerts" exact={true}>Alerts</DropdownItem>
              <DropdownItem tag={Link} to="/newAlert" href="#">Create Alert</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </ul>
        { session_info }
      </nav>
    );
  }
  else {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <span className="navbar-brand">
          CryptoApp
        </span>
        <ul className="navbar-nav mr-auto"></ul>
        { session_info }
        <NavLink to="/register" href="#" className="btn btn-primary">Register</NavLink>
      </nav>
    );
  }
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props,null,null,{pure: false})(Nav);
