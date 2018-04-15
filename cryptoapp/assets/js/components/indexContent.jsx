import React from 'react';
import {connect} from "react-redux";
import Coins from './coins';
import {NavItem} from 'reactstrap';
import api from "../api";

function IndexContent(props) {
    console.log("index props", props.coin_list);
    return (
        <div>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <h4 className={"mx-3"}>Coin List</h4>
                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                       aria-controls="nav-home" aria-selected="true">USD</a>
                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                       aria-controls="nav-profile" aria-selected="false">EUR</a>
                    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab"
                       aria-controls="nav-contact" aria-selected="false">CNY</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent" >
                <Coins coins={props.coin_list}/>
                <div class="tab-pane fade show active" id="nav-home" role = "tabpanel" aria-labelledby = "nav-home-tab" > </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
            </div>
            <br/><br/>
            <div className='wrapper'>
                <div id="coincompare"> Powered by <a href="https://www.cryptocompare.com/">CryptoCompare</a></div>
            </div>
            <br/><br/>
        </div>
);
}


function state2props(state) {
    console.log("coins from indexcontent", state);
    return {coin_list: state.coin_list};
}

export default connect(state2props)(IndexContent);
