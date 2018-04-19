import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Nav from './nav';
import Alerts from './alerts';
import Users from './users';
import AlertForm from './alert-form';
import Register from './register';
import EditForm from './edit-form';
import IndexContent from "./indexContent";
import CoinDetails from './coinDetails';

export default function cryptoapp_init(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Cryptoapp/>
        </Provider>,
        document.getElementById('root'),
    );
}

let Cryptoapp = connect((state) => state)((props) => {
    if (props.token) {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Route path="/" exact={true} render={() =>
                        <div>
                            <IndexContent/>
                        </div>
                    }/>
                    <Route path="/alerts" exact={true} render={() =>
                        <div>
                            <Alerts alerts={_.filter(props.alerts, (tt) =>
                                props.token.user_id == tt.user.id)
                            }/>
                        </div>
                    }/>
                    <Route path="/newAlert" exact={true} render={() =>
                        <AlertForm users={props.users} root={this}/>
                    }/>
                    <Route path="/editAlert" exact={true} render={() =>
                        <EditForm users={props.users} root={this}/>
                    }/>
                    <Route path="/users" exact={true} render={() =>
                        <Users users={props.users}/>
                    }/>
                    <Route path="/editUser" exact={true} render={() =>
                        <Register users={props.users} root={this}/>
                    }/>
                    <Route path="/Alerts" render={({match}) =>
                        <Alerts alerts={_.filter(props.alerts, (tt) =>
                            match.params.user_id == tt.user.id)
                        }/>
                    }/>
                    <Route strict={true} path="/coinDetails" exact={true} render={() =>
                        <div>
                            <CoinDetails />
                        </div>
                    }/>
                </div>
            </Router>
        );
    }
    else {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Route path="/register" exact={true} render={() =>
                        <Register users={props.users} root={this}/>
                    }/>
                    <Route path="/" exact={true} render={() =>
                        <div>
                            <IndexContent/>
                        </div>
                    }/>
                    <Route strict={true} path="/coinDetails" exact={true} render={() =>
                        <div>
                            <CoinDetails />
                        </div>
                    }/>
                </div>
            </Router>
        );
    }
});
