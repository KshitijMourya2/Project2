import React from 'react';
import Coin from './coin';

export default function Coins(props) {
    let coins = _.filter(props.coins, (cc) => cc.SortOrder < 25);
    coins = _.map(coins, (cc, index) => <Coin coin={cc} index={index} />);
    return <div>
        {coins}
    </div>;
}
