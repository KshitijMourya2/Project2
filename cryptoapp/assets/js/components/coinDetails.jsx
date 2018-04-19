import React from 'react';
import {connect} from "react-redux";
import api from "../api";
import _ from "underscore";
import {Link, Redirect} from 'react-router-dom';
import {ListGroup, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label} from 'recharts';


function CoinDetails(props) {


    let priceHistoryMin = props.coin_price_history_min;
    console.log("priceHistoryMin", priceHistoryMin);
    let data = _.map(priceHistoryMin.Data, (item) => {
        return {name: timeConvert(item.time), low: item.low, high: item.high, open: item.open}
    })
    console.log("data ", data);
    // let data = [
    //     {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    //     {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    //     {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    //     {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    //     {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    //     {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    //     {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    // ];

    function timeConvert(time) {
        let date = new Date(time * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();

        return hours + ':' + minutes.substr(-2);
    }

    return <ResponsiveContainer>
        <LineChart data={data}
                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name">
                <Label value="Time(Last Hour)" offset={-5} position="insideBottomRight"/>
            </XAxis>
            <YAxis type="number" domain={['auto', 'auto']}
                   label={{value: 'Price', angle: -90, position: 'left'}}/>
            <CartesianGrid strokeDasharray="5 5"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="high" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="low" stroke="#82ca9d"/>
        </LineChart>
    </ResponsiveContainer>;
}

function state2props(state) {
    return {coin_price_history_min: state.coin_price_history_min};
}

export default withRouter(connect(state2props)(CoinDetails));