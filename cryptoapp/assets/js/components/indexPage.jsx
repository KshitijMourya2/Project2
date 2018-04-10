import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {connect} from "react-redux";
import api from "../api";
import _ from "underscore";
//
import Nav from './nav';
import IndexContent from "./indexContent";
// import Login from "./login"
// import TaskForm from './task-form';
// import Tasks from './tasks';
// import TaskDetails from "./task-details";
// import RegisterForm from "./register";
// import Task from "./task";
// import Users from './users';

export default function index_page_init(store, root) {
    //console.log("store ", store);
    ReactDOM.render(
        <Provider store={store}>
            <TaskTracker/>
        </Provider>, root
    );
}

let TaskTracker = connect((state) => state)((props) => {
        return (<IndexContent/>);

});