import store from "./store";
import _ from "underscore";

class TheServer {
    create_user(_csrf_token, user) {
        $.ajax("/users/new", {
            method: "post",
            dataType: "json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader('_csrf_token', _csrf_token.replace(/\s/g, '+'))
            },
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({user: user}),
            success: (resp) => {
                console.log("registered ", resp);
                // let action = {
                //     type: "ADD_USER",
                //     user: resp.data,
                // };
                // store.dispatch(action);
            }
        });
    }
}

export default new TheServer();