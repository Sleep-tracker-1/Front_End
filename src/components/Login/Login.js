import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./Login.css";
import * as loginStyles from "./LoginStyles";
import axios from "axios";
import axiosWithAuth from "axios";
function Login(props) {
    const [userAndPw, setUserAndPw] = useState({
        username: "",
        password: "",
    });

    const submitHandler = event => {
        event.preventDefault();

        axios
            .post(
                "https://sleep-tracker-server.herokuapp.com/api/auth/login",
                userAndPw
            )
            .then(res => {
                console.log(res);

                localStorage.setItem("token", res.data.token);
                props.history.push("/home");
            })
            .catch(err => {
                console.log(`the chef has cooked up ${err} error`);
            });
    };
    //test
    const onInputChange = event => {
        // console.log`name is currently ${nameInput.value} email is currently ${emailInput.value} role is currently${roleInput.value}`();
        setUserAndPw({ ...userAndPw, [event.target.name]: event.target.value });
    };

    return (
        <loginStyles.LoginCard>
            <loginStyles.Title>Welcome back! Please log in</loginStyles.Title>
            <form onSubmit={submitHandler}>
                <label htmlFor>
                    Username:
                    <input
                        type="text"
                        name="username"
                        id="usernameInput"
                        placeholder={userAndPw.username}
                        onChange={onInputChange}
                        value={userAndPw.username}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        name="password"
                        id="passwordInput"
                        placeholder={userAndPw.password}
                        onChange={onInputChange}
                        value={userAndPw.password}
                    />
                </label>

                <button onSubmit={e => {}}>Login</button>
            </form>
        </loginStyles.LoginCard>
    );
}

export default Login;