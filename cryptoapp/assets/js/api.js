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

  delete_alert(alert_id) {
    $.ajax("/api/v1/alerts"+ "/" + alert_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
       data: "",
      success: (resp) => {
      this.request_alerts();
      alert("Alert deleted!");
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
        alert("User does not exist!");
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
        alert("Error in Registration!");
      },
    });
  }

  delete_user(user_id) {
    $.ajax("/api/v1/users"+ "/" + user_id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
       data: "",
      success: (resp) => {
      this.request_users();
      alert("User deleted!");
      },
    });
  }

  request_coin_price(name, url) {
      $.ajax(url, {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          success: (resp) => {
              console.log("api name", name);
              console.log("api price", resp.USD);
    //          this.update_current_price(name, resp.USD);
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
    //          console.log("api", resp.Data);
              let c = this.coin_list_process(resp.Data);
    //          console.log("---------------c: " + c);
          }
      });
  }

  /*update_current_price(name, price) {
    $.ajax("/api/v1/alerts", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, alert: data }),
      success: (resp) => {
        store.dispatch({
          type: 'UPDATE_CURR_PRICE',
          alert: resp.data,
        });
        alert("Alert created successfully!");
      },
      error: (resp) => {
        alert(resp.alert_id);
      },
    });
  }*/

  coin_list_process(coin_list) {
      let a = [];
      for (var k in coin_list) {
          a.push(coin_list[k]);
      }

      a.sort(sortCoins);
      let b = a.slice(0, 20);

      for (let i = 0; i < b.length; i++) {
  //        console.log("cc in for", b[i]);
          let requestCoinPriceUrl = "https://min-api.cryptocompare.com/data/price?fsym=" + b[i].Name + "&tsyms=USD,EUR,CNY";
          this.request_coin_price(b[i].Name, requestCoinPriceUrl);
        //  this.update_current_price(b[i].Name,);
      }

  //    console.log('c api', b);
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

    getCoinDetails(coinName, toCurrency, props, coinIndex) {
        $.ajax("https://min-api.cryptocompare.com/data/histominute?fsym="+ coinName + "&tsym="+ toCurrency+"&limit=60&e=CCCAGG", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                console.log("getCoinDetails", resp.Data);
                let action = {
                    type: "SET_COIN_PRICE_HISTORY_MIN",
                    data: resp
                }
                props.dispatch(action);

                let newWidget = {
                    modal: Array(20).fill(false)
                };
                newWidget.modal[coinIndex] = !props.coin_details_widget.modal[coinIndex];
                let action2 = {
                    type: "TOGGLE_COIN_DETAIL_MODAL_STATE",
                    data: newWidget
                };

                props.dispatch(action2);
                //props.history.push("/coinDetails");
            }
        });
    }
}

export default new TheServer();
