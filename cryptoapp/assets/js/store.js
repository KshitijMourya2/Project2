import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze";

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

function alerts(state = [], action) {
    switch (action.type) {
    case 'ALERTS_LIST':
      return [...action.alerts];
    case 'ADD_ALERT':
      return [action.alert, ...state];
    default:
      return state;
    }
  }

  function users(state = [], action) {
    switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
    case 'ADD_USER':
      return [action.user, ...state];
    default:
      return state;
    }
  }

  let empty_form = {
    currency_name: "",
    upper_limit: 0,
    lower_limit: 0,
    currentprice: 0,
    user_id: "",
    token: "",
  };

  function form(state = empty_form, action) {
    switch (action.type) {
      case 'UPDATE_FORM':
        return Object.assign({}, state, action.data);
      case 'SET_TOKEN':
        return Object.assign({}, state, action.token);
      default:
        return state;
    }
  }

  function editform(state = empty_form, action) {
    switch (action.type) {
      case 'UPDATE_EDIT_FORM':
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

  function register(state = empty_user, action) {
    switch (action.type) {
      case 'UPDATE_REGISTER_FORM':
        return Object.assign({}, state, action.data);
      case 'CLEAR_REGISTER_FORM':
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
      case 'UPDATE_LOGIN_FORM':
        return Object.assign({}, state, action.data);
      default:
        return state;
    }
  }

function root_reducer(state0, action) {
    let reducer = combineReducers({
        coin_price_list: coin_price_list,
        coin_list: coin_list,
        alerts, users, form, token, login, register, editform
    });
    let state1 = reducer(state0, action);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
