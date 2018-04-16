import React from 'react';
import Coin from './coin';

export default function Coins(props) {
    let coins = _.filter(props.coins, (cc) => cc.SortOrder < 25);
    coins = _.map(coins, (cc) => <Coin coin={cc} />);
    return <div>
        {coins}
    </div>;
}
