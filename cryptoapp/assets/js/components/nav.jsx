import React from 'react';
import {connect} from "react-redux";
import {NavItem} from 'reactstrap';
import api from "../api";

function Nav(props) {

    function logOut() {

        let action = {
            type: "SET_TOKEN",
            token: "",
        };

        props.dispatch(action);

    }

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand">
              <span className="navbar-brand">
                  <b>Crypto<br/>App</b>
              </span>
            <ul className="navbar-nav mr-auto">
                <NavItem>
                    <a to="/" strict={true} exact={true} activeClassName="active" className="nav-link">Assign Task
                    </a>
                </NavItem>
                <NavItem style={{marginLeft: "10px"}}>
                    <a to="/mytasks" strict={true} exact={true} activeClassName="active" className="nav-link">My
                        Tasks
                    </a>
                </NavItem>
            </ul>
            <span className="navbar-text">
                  Hi, {props.token.username} | <a exact={true} to="/" onClick={logOut}>Log Out</a>
            </span>
        </nav>
    );

}

function state2props(state) {
    //console.log("task form state2props", state);
    return {token: state.token};
}

export default connect(state2props)(Nav);