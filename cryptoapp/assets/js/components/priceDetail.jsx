import React from 'react';
import {connect} from "react-redux";
import api from "../api";
import _ from "underscore";
import {Link, Redirect} from 'react-router-dom';
import {Table, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {withRouter} from "react-router-dom";


function PriceDetail(props) {


    let pricesDetail = props.pricesDetail;

    let priceDetailComponent = <div>Loading</div>
    if (pricesDetail != null) {
        priceDetailComponent = <div className="table-responsive-sm">
            <Table size="sm">
                <thead>
                <tr>
                    <th>Prices</th>
                    <th>Direct Vol. 24H</th>
                    <th>Total Vol. 24H</th>
                    <th>Market Cap</th>
                    <th>Chg. 24H</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">{pricesDetail.USD.PRICE}</th>
                    <td>{pricesDetail.USD.VOLUME24HOURTO}</td>
                    <td>{pricesDetail.USD.TOTALVOLUME24HTO}</td>
                    <td>{pricesDetail.USD.MKTCAP}</td>
                    <td>{pricesDetail.USD.CHANGEPCT24HOUR}%</td>
                </tr>
                <tr>
                    <th scope="row">{pricesDetail.EUR.PRICE}</th>
                    <td>{pricesDetail.EUR.VOLUME24HOURTO}</td>
                    <td>{pricesDetail.EUR.TOTALVOLUME24HTO}</td>
                    <td>{pricesDetail.EUR.MKTCAP}</td>
                    <td>{pricesDetail.EUR.CHANGEPCT24HOUR}%</td>
                </tr>
                <tr>
                    <th scope="row">{pricesDetail.CNY.PRICE}</th>
                    <td>{pricesDetail.CNY.VOLUME24HOURTO}</td>
                    <td>{pricesDetail.CNY.TOTALVOLUME24HTO}</td>
                    <td>{pricesDetail.CNY.MKTCAP}</td>
                    <td>{pricesDetail.CNY.CHANGEPCT24HOUR}%</td>
                </tr>
                </tbody>
            </Table>
        </div>
    }

    return <div>{priceDetailComponent}</div>;
}

function state2props(state) {
    return {coin_price_history_min: state.coin_price_history_min};
}

export default withRouter(connect(state2props)(PriceDetail));
