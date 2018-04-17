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

import cryptoapp_init from "./components/cryptoapp";

$(function() {
  api.request_alerts();
  api.request_users();
  api.request_coin_list();
  var inter = setInterval(() => api.request_coin_list(), 90000);

  cryptoapp_init(store);
});
