// Attrbution -> https://www.cryptocompare.com/api/

import store from './store';

class TheServer {
  request_alerts() {
    $.ajax("/api/v1/alerts", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'ALERTS_LIST',
          alerts: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_alert(data) {
    $.ajax("/api/v1/alerts", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, alert: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_ALERT',
          alert: resp.data,
        });
        alert("Alert created successfully!");
      },
      error: (resp) => {
        alert(resp.alert_id);
      },
    });
  }

  edit_alert(data, alert_id) {
    $.ajax("/api/v1/alerts"+ "/" + alert_id, {
      method: "patch",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, alert: data }),
      success: (resp) => {
        this.request_alerts();
      },
      error: (resp) => {
        alert(resp.alert_id);
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        alert(resp.user_id);
      },
    });
  }

  submit_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ user: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
        alert("Registered successfully!");
      },
      error: (resp) => {
        alert("Error in Registration:" + resp.user_id);
      },
    });
  }

  request_coin_price(name, url) {
      $.ajax(url, {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          success: (resp) => {
              // console.log("api price", resp);
              resp.Name = name;
              let action = {
                  type: "COIN_PRICE_LIST",
                  prices: resp,
              };
              store.dispatch(action);
          }
      });
  }

  request_coin_list() {
      $.ajax("https://min-api.cryptocompare.com/data/all/coinlist", {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          success: (resp) => {
              console.log("api", resp.Data);
              let c = this.coin_list_process(resp.Data);

          }
      });
  }

  coin_list_process(coin_list) {
      let a = [];
      for (var k in coin_list) {
          a.push(coin_list[k]);
      }

      a.sort(sortCoins);
      let b = a.slice(0, 25);

      for (let i = 0; i < b.length; i++) {
          console.log("cc in for", b[i]);
          let requestCoinPriceUrl = "https://min-api.cryptocompare.com/data/price?fsym=" + b[i].Name + "&tsyms=USD,EUR";
          this.request_coin_price(b[i].Name, requestCoinPriceUrl);
      }

      console.log('c api', b);
      let action = {
          type: "COIN_LIST",
          coins: b,
      };
      store.dispatch(action);


      function sortCoins(a, b) {
          if ((a.SortOrder - b.SortOrder) > 0) {
              return 1;
          } else {
              return -1;
          }
      }
      return b;
    }
}

export default new TheServer();
