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

function edit_alert_form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_EDITED_ALERT_FORM':
      return Object.assign({}, state, action.data);
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_user= {
  name: "",
  email: "",
  pass: "",
};

function userform(state = empty_user, action) {
  switch (action.type) {
    case 'UPDATE_USER_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_USER_FORM':
      return empty_user;
    default:
      return state;
  }
}

function register_form(state = empty_user, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_USER_FORM':
      return empty_user;
    default:
      return state;
  }
}

let empty_login = {
    email: "",
    pass: "",
};

function login(state = empty_login, action) {
    switch (action.type) {
        case "UPDATE_LOGIN_FORM":
            return Object.assign({}, state, action.data);
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
