import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze";
import _ from "underscore";
import api from "./api";

function coin_list(state= [], action) {
    switch (action.type) {
        case "COIN_LIST":
            // let a = [];
            // for (var k in action.coins) {
            //     a.push(action.coins[k]);
            // }
            //
            return action.coins;
            break;
        default:
            return state;
    }
}

function coin_price_list(state= [], action) {
    switch (action.type) {
        case "COIN_PRICE_LIST":
            // let a = [];
            // for (var k in action.prices) {
            //     a.push(action.prices[k]);
            // }
            //console.log('store price', action.prices);
            console.log([action.prices, ...state]);
            return [action.prices, ...state];
            break;
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case "USERS_LIST":
            return Object.assign({}, state, action.users);
            break;
        case "ADD_USER":
            return [action.user, ...state];
            break;
        default:
            return state;
    }
}

let empty_token = {
    username: "alice",
    user_id: 1,
    token: "hi",
};

function token(state = "", action) {
    switch (action.type) {
        case "SET_TOKEN":
            return action.token;
            break;
        default:
            return state;
    }
}


let empty_login_form = {
    username: "",
    password: "",
    isLoginClicked: false
};

function login_form(state = empty_login_form, action) {
    switch (action.type) {
        case "UPDATE_LOGIN_FROM":
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
}

let empty_register_form = {
    email: "",
    name: "",
    contactnumber: "",
    password: "",
    password_confirmation: "",
    isRegisterClicked: false
};

function register_form(state = empty_register_form, action) {
    switch (action.type) {
        case "UPDATE_REGISTER_FROM":
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
}



function root_reducer(state0, action) {
    //console.log("state0", state0);
    let reducer = combineReducers({
        coin_price_list: coin_price_list,
        coin_list: coin_list,
        register_form: register_form
    });
    let state1 = reducer(state0, action);
    console.log(state1);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);

export default store;