// Attrbution -> https://www.cryptocompare.com/api/

import store from "./store";
import $ from 'jquery';
import _ from "underscore";

class TheServer {

    request_coin_price(name, url) {
        $.ajax(url, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                console.log("api price", resp);
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
            let requestCoinPriceUrl = "https://min-api.cryptocompare.com/data/price?fsym=" + b[i].Name + "&tsyms=USD";
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

    create_user(_csrf_token, user) {
        $.ajax("/users/new", {
            method: "post",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('_csrf_token', _csrf_token.replace(/\s/g, '+'))
            },
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({user: user}),
            success: (resp) => {
                console.log("registered ", resp);
                // let action = {
                //     type: "ADD_USER",
                //     user: resp.data,
                // };
                // store.dispatch(action);
            }
        });
    }
}

export default new TheServer();
