import React from 'react';
import api from "../api";
import {Link, withRouter} from 'react-router-dom';
import {Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {connect} from "react-redux";
import _ from 'underscore';
import CoinDetails from './coinDetails';

function Coin(props) {

    let coin = props.coin;
    let index = props.index;
    let widgetControl = props.coin_details_widget;
    console.log("widgetControl", widgetControl);
    let USD = 0;
    let EUR = 0;
    let CNY = 0;
    if (props.prices != []) {
        let prices = _.find(props.prices, (pp) => pp.Name == coin.Name);//_.filter(props.prices, (pp) => pp.Name == coin.Name);
        if (prices != undefined) {
            USD = prices.USD;
            EUR = prices.EUR;
            CNY = prices.CNY;
        }
    }

    let baseUrl = "https://www.cryptocompare.com/";

    function toggleWidget() {
        if (!widgetControl.modal[index]) {
            api.getCoinDetails(coin.Name, "USD", props, index);
        } else {
            let newWidget = {
                modal: Array(20).fill(false)
            };
            let action = {
                type: "TOGGLE_COIN_DETAIL_MODAL_STATE",
                data: newWidget
            };
            props.dispatch(action);
        }



    }

    function getCoinDetails() {
        api.getCoinDetails(coin.Name, "USD", props);
    }


    return (<div>
        <Card className={"m-3"}>
            <CardHeader><b>{coin.Name}</b></CardHeader>
            <CardBody>
                <div className={"row"}>
                    <div className={"col-3"}>
                        <img style={{width: "40px"}} src={baseUrl + coin.ImageUrl}></img>
                    </div>
                    <div className={'col-3'}>
                        <span><b>$ </b>{USD}</span><br/>
                        <span><b>€ </b>{EUR}</span><br/>
                        <span><b>¥ </b>{CNY}</span>
                    </div>
                    <div className={'col-5 text-right'}>
                        <Button onClick={toggleWidget}>Price Chart</Button>
                    </div>
                </div>
            </CardBody>
        </Card>
        <Modal size={"lg"} isOpen={widgetControl.modal[index]} toggle={toggleWidget} backdrop={false} >
            <ModalHeader><b>{coin.Name} To USD</b></ModalHeader>
            <ModalBody>
                <CoinDetails />
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggleWidget}>Close</Button>
            </ModalFooter>
        </Modal>
    </div>);
}

function state2props(state) {
    //console.log("task form state2props", state.coin_price_list);
    return {prices: state.coin_price_list, coin_details_widget: state.coin_details_widget};
}

export default withRouter(connect(state2props)(Coin));
