import React from 'react';
import api from "../api";
import {Link, withRouter} from 'react-router-dom';
import {Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {connect} from "react-redux";
import _ from 'underscore';
import CoinDetails from './coinDetails';
import PriceDetail from './priceDetail';
import $ from 'jquery';

function Coin(props) {

    let coin = props.coin;
    let index = props.index;
    let widgetControl = props.coin_details_widget;
    //console.log("prop price", props.prices);
    let USD = 0;
    let EUR = 0;
    let CNY = 0;
    let pricesDetail = null;
    if (props.prices != []) {
        let prices = _.find(props.prices, (pp) => pp.name == coin.Name);//_.filter(props.prices, (pp) => pp.Name == coin.Name);

        if (prices != undefined || prices != null) {
            pricesDetail = prices.priceDetail;
            //console.log("pricesDetail111 ", pricesDetail);
            USD = prices.priceDetail.USD.PRICE;
            EUR = prices.priceDetail.EUR.PRICE;
            CNY = prices.priceDetail.CNY.PRICE;
        }
    }

    let baseUrl = "https://www.cryptocompare.com/";

    function toggleWidget(ev) {
        let btn = $(ev.target);
        let toCurrency = "USD";
        if (!widgetControl.modal[index]) {
            if (btn.attr("id") == "USDPriceChartBtn") {
                toCurrency = "USD";
            } else if (btn.attr("id") == "EURPriceChartBtn") {
                toCurrency = "EUR";
            } else if (btn.attr("id") == "CNYPriceChartBtn") {
                toCurrency = "CNY";
            }

            let action = {
                type: "SET_COIN_DETAIL_MODAL_TITLE",
                data: {
                    modalTitle: coin.Name + " TO " + toCurrency,
                    modal: widgetControl.modal
                }
            }
            props.dispatch(action);
            api.getCoinDetails(coin.Name, toCurrency, props, index);

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

    const divStyle = {
        width: "200em",
        height: "100em",
    };

    return (<div>
        <Card className={"w-90 m-3"} >
            <CardHeader><b>{coin.Name}</b></CardHeader>
            <CardBody>
                <div className={"row"}>
                    <div className={"col-sm-1"}>
                        <img style={{width: "5rem"}} src={baseUrl + coin.ImageUrl}/>
                    </div>
                    <div className={'col-sm-9 text-center'} data-spy="scroll">
                        <PriceDetail pricesDetail={pricesDetail}/>
                    </div>
                    <div className={'col-sm-1 text-center'}>
                        <Button id={"USDPriceChartBtn"} className={"m-1"} onClick={toggleWidget}>USD Price Chart</Button>
                        <Button id={"EURPriceChartBtn"} className={"m-1"} onClick={toggleWidget}>EUR Price Chart</Button>
                        <Button id={"CNYPriceChartBtn"} className={"m-1"} onClick={toggleWidget}>CNY Price Chart</Button>
                    </div>
                </div>
            </CardBody>
        </Card>
        <Modal isOpen={widgetControl.modal[index]} toggle={toggleWidget} backdrop={false}>
            <ModalHeader className={"w-100"}><b id={"modalTile"}>{widgetControl.modalTitle}</b></ModalHeader>
            <ModalBody className={"w-100"}>
                <CoinDetails/>
            </ModalBody>
            <ModalFooter className={"w-100"}>
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
