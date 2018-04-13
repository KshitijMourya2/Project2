// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import store from "./store";
import api from "./api";
import index_page_init from "./components/indexPage";
import register_form from  "./components/registerForm"
import $ from "jquery";

function start() {
    api.request_coin_list();
    let registerForm = document.getElementById('registerForm');
    let index = document.getElementById('indexContent');
    if(registerForm) {
        register_form(store, registerForm);
    }
    if (index) {
        index_page_init(store, index);
    }
}

$(start);
