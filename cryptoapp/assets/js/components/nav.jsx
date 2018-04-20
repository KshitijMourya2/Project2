import $ from "jquery";
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button, Collapse, Toggle, NavbarToggler, Navbar, UncontrolledDropDown, NavbarBrand, Container, ButtonDropDown,DropDownToggle, DropDownMenu, DropDownItem } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import app from '../app';


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

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="email" name="email" placeholder="abc@example.com" class="form-control form-control-sm" onChange={update} required/>
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password" class="form-control form-control-sm" onChange={update} required/>
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
    <Link to="/users" href="#"><img src="../images/profile.png" alt="Profile" width="40" height="40"/></Link>
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
    session_info = <LoginForm/>
  }

  if(props.token){
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top" role="navigation">
        <div class="container">
        <span className="navbar-brand">
          CryptoApp
        </span>

        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">

        </button>
        <div class="collapse navbar-collapse" id="exCollapsingNavbar">
          <ul class="nav navbar-nav">
              <li>
               <NavLink to="/" exact={true} activeClassName="active" classname="nav-link">Coinfeed</NavLink>
              </li>
              <li><NavLink to="/newAlert" exact={true} classname="nav-link">  Subscribe  </NavLink></li>
              <li><NavLink to="/alerts" exact={true} classname="nav-link">   Alerts  </NavLink></li>
              <li>{session_info}</li>
          </ul>
          <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
              <li class="nav-item order-2 order-md-1"><a href="#" class="nav-link" title="settings"><i class="fa fa-cog fa-fw fa-lg"></i></a></li>
              <li class="dropdown order-1">
                  <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-secondary dropdown-toggle">Login <span class="caret"></span></button>
                  <ul class="dropdown-menu dropdown-menu-right mt-2">
                     <li class="px-3 py-2">
                           { session_info }
                      </li>
                  </ul>
              </li>
          </ul>
        </div>
      </div>
      </nav>
    );
  }
  else {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top" role="navigation">
        <div class="container">
        <span className="navbar-brand">
          CryptoApp
        </span>
        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#collapse">
            &#9776;
        </button>
        <div class="collapse navbar-collapse" id="collapse">
          <ul class="nav navbar-nav">
            <li> { session_info } </li>
            <li> <NavLink to="/register" href="#" className="btn btn-primary">Register</NavLink>
            </li>
          </ul>
          </div>
      </div>
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
