import React from 'react';
import {Provider} from "react-redux";
import {connect} from "react-redux";
import $ from "jquery";
import api from "../api";
import _ from "underscore";
import {FormGroup, Label, Input} from 'reactstrap';
import ReactDOM from "react-dom";

export default function register_form(store, root) {
    ReactDOM.render(
        <Provider store={store}>
            <RegisterForm />
        </Provider>, root
    );
}

    // let registerForm = props.register_form;
    //
    // function register() {
    //
    //     let backBtn = $("#backBtn");
    //     let data = {isRegisterClicked: true};
    //     let action = {
    //         type: "UPDATE_REGISTER_FROM",
    //         data: data,
    //     };
    //
    //     props.dispatch(action);
    //
    //     if(isInputValid()) {
    //
    //         let user = {
    //             username: registerForm.username,
    //             password_hash: registerForm.password,
    //         }
    //
    //         api.create_user(user);
    //
    //         let empty_register_form = {
    //             username: "",
    //             password: "",
    //             confirmPassword: "",
    //             isRegisterClicked: false
    //         };
    //
    //         let action2 = {
    //             type: "UPDATE_REGISTER_FROM",
    //             data: empty_register_form,
    //         };
    //
    //         props.dispatch(action2);
    //
    //         alert("user registered successfully");
    //         //return <Redirect to="/"/>;
    //         window.location.href = "/";
    //         //window.history.pushState("", "", "/");
    //         //ChangeUrl("page1", "/");
    //         //backBtn.trigger("click");
    //
    //     }
    //
    // }

    // function ChangeUrl(page, url) {
    //     if (typeof (history.pushState) != "undefined") {
    //         var obj = {Page: page, Url: url};
    //         history.pushState(obj, obj.Page, obj.Url);
    //     } else {
    //         window.location.href = "/";
    //         // alert("Browser does not support HTML5.");
    //     }
    // }


    // function isInputValid() {
    //
    //     let flag = true;
    //
    //     if(registerForm.username == "" || registerForm.password == "" || registerForm.confirmPassword == "") {
    //         flag = false;
    //     }
    //
    //     if(isUsernameExist()) {
    //         flag = false;
    //     }
    //
    //     if(registerForm.password.length < 8) {
    //         flag = false;
    //     }
    //
    //     if(registerForm.password != registerForm.confirmPassword) {
    //         flag = false;
    //     }
    //
    //     return flag;
    // }
    //
    // function isUsernameExist() {
    //
    //     let temp_user = _.filter(props.users, (user) => user.username == registerForm.username);
    //
    //     if(temp_user.length > 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //
    // }
    //
    // function input_update(ev) {
    //
    //     let target = $(ev.target);
    //     let data = {};
    //
    //     data[target.attr("id")] = target.val();
    //     let action = {
    //         type: "UPDATE_REGISTER_FROM",
    //         data: data,
    //     };
    //
    //     props.dispatch(action);
    //
    // }



    let RegisterForm = connect((state) => state)((props) => {
        let registerForm = props.register_form;
        console.log("FORM ", registerForm);
        let _csrf_token = $('[name="_csrf_token"]').val();
        console.log("_csrf_token ", _csrf_token);
        function input_update(ev) {

            let target = $(ev.target);
            let data = {};

            data[target.attr("id")] = target.val();
            let action = {
                type: "UPDATE_REGISTER_FROM",
                data: data,
            };

            props.dispatch(action);

            if(registerForm.isRegisterClicked) {
                isInputValid();
            }

        }

        function register() {

            let data = {isRegisterClicked: true};
            let action = {
                type: "UPDATE_REGISTER_FROM",
                data: data,
            };

            props.dispatch(action);

            if(isInputValid()) {
                let user = {
                    email: registerForm.email,
                    name: registerForm.name,
                    contactnumber: registerForm.contactnumber,
                    password: registerForm.password,
                    password_confirmation: registerForm.password_confirmation,
                }

                api.create_user(_csrf_token, user);
            }


        }

        function isInputValid() {

            let emailInput = $("#email");
            let nameInput = $("#name");
            let contactnumberInput = $("#contactnumber");
            let passwordInput = $("#password");
            let password_confirmationInput = $("#password_confirmation");

            let flag = true;

            if(emailInput.val() == "") {
                flag = false;
                emailInput.addClass("is-invalid");
            } else {
                emailInput.removeClass("is-invalid");
            }

            if(nameInput.val() == "") {
                flag = false;
                nameInput.addClass("is-invalid");
            } else {
                nameInput.removeClass("is-invalid");
            }

            if(contactnumberInput.val() == "") {
                flag = false;
                contactnumberInput.addClass("is-invalid");
            } else {
                contactnumberInput.removeClass("is-invalid");
            }

            if(passwordInput.val().length < 8) {
                flag = false;
                passwordInput.addClass("is-invalid");
            } else {
                passwordInput.removeClass("is-invalid");
            }

            if(passwordInput.val() != password_confirmationInput.val()) {
                console.log("pass ", registerForm.password);
                console
                flag = false;
                password_confirmationInput.addClass("is-invalid");
            } else {
                password_confirmationInput.removeClass("is-invalid");
            }

            return flag;
        }

        return <form className="needs-validation" novalidate>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label for="validationCustom01">Email</label>
                    <input className="form-control" id="email" name="user[email]" type="email" value={registerForm.email} required
                           onChange={input_update}/>
                    <div className="invalid-feedback">
                        Email is Required
                    </div>
                </div>

                    <div className="col-md-4 mb-3">
                        <label for="validationCustom01">Name</label>
                        <input className="form-control" id="name" name="user[name]" type="text" value={registerForm.name} required
                               onChange={input_update}/>
                        <div className="invalid-feedback">
                            Name is Required
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label for="validationCustom01">Contact Number</label>
                        <input className="form-control" id="contactnumber" name="user[contactnumber]" type="number" value={registerForm.contactnumber} required
                               onChange={input_update}/>
                        <div className="invalid-feedback">
                            Contact Number is Required
                        </div>
                    </div>
                </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label for="validationCustom01">Password</label>
                    <input className="form-control" id="password" name="user[password]" type="password" value={registerForm.password} required
                           onChange={input_update}/>
                    <div className="invalid-feedback">
                        Password should have at least 8 characters
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label for="validationCustom01">Password Confirmation</label>
                    <input className="form-control" id="password_confirmation" name="user[password_confirmation]" type="password" value={registerForm.password_confirmation} required
                           onChange={input_update}/>
                    <div className="invalid-feedback">
                        Password didn't match
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" type="submit" onClick={register}>Register</button>
            <a href={"/"} className={"btn btn-primary ml-2"}>Back</a>
        </form>

})