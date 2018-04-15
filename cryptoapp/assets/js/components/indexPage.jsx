import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from "react-redux";
import api from "../api";
import _ from "underscore";
import Nav from './nav';
import IndexContent from "./indexContent";

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
