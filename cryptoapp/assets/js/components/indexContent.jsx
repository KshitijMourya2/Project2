import React from 'react';
import {connect} from "react-redux";
import {NavItem} from 'reactstrap';
import api from "../api";

function IndexContent(props) {
    return (
        <div>
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <h4 className={"mx-3"}>Coin List</h4>
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                   aria-controls="nav-home" aria-selected="true">USD</a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                   aria-controls="nav-profile" aria-selected="false">BTC</a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab"
                   aria-controls="nav-contact" aria-selected="false">ETH</a>
            </div>
        </nav>
        < div class="tab-content" id="nav-tabContent" >
        < div class="tab-pane fade show active" id="nav-home" role = "tabpanel" aria-labelledby = "nav-home-tab" > </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        </div>
        </div>
);
}


function state2props(state) {
    //console.log("task form state2props", state);
    return {token: state.token};
}

export default connect(state2props)(IndexContent);