import React from 'react';
import api from "../api";
import {Card, CardBody} from 'reactstrap';
import {connect} from "react-redux";

function Coin(props) {

    let coin = props.coin;
    let USD = 0;
    let EUR = 0;
    if (props.prices != []) {
        let prices = _.find(props.prices, (pp) => pp.Name == coin.Name);//_.filter(props.prices, (pp) => pp.Name == coin.Name);
        if (prices != undefined) {
            USD = prices.USD;
            EUR = prices.EUR;
        }
    }

    let baseUrl = "https://www.cryptocompare.com/";

    return (<Card>
        <CardBody>
            <div className={"row"}>
                <div className={"col-6"}>
                    <img style={{width: "40px"}} src={baseUrl + coin.ImageUrl}></img>
                    <p>{coin.Name}</p>
                </div>
                <div className={'col-3 offset-3'}>
                    <p><b>$ </b>{USD}</p>
                </div>
            </div>
        </CardBody>
    </Card>);
}

function state2props(state) {
    console.log("task form state2props", state.coin_price_list);
    return {prices: state.coin_price_list};
}

export default connect(state2props)(Coin);
