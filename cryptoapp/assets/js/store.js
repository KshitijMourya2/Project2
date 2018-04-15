import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze";

function alerts(state = [], action) {
  switch (action.type) {
    case 'CREATE_ALERT':
      return [action.alert, ...state];
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'CREATE_USER':
      return [action.user, ...state];
    default:
      return state;
  }
}

let empty_form = {
    user_id: "",
    currency_name: "",
    upper_limit: 0.0,
    lower_limit: 0.0,
    currentprice: 0.0,
};

function create_alert_form(state = empty_form, action) {
    switch (action.type) {
        case "UPDATE_ALERT_FORM":
            return Object.assign({}, state, action.alert);
        case "SET_TOKEN":
            let newState = {
                user_id: action.token.user_id,
                title: "",
                description: "",
                assigned_to: "",
                time: 0,
                complete: false,
                isAssignClicked: false
            };
            return Object.assign({}, state, newState);
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
    console.log("state0", state0);
    let reducer = combineReducers({ alerts, users, token, login, create_alert_form, edit_alert_form});
    let state1 = reducer(state0, action);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);

export default store;
