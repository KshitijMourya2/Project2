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


// Get the modal
var modal = document.getElementById('registerModal');

// Get the button that opens the modal
var btn = document.getElementById("registerBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$(start);
