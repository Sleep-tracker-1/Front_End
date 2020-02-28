import React, { useState } from "react";
import axios from "axios";
import { SignupContainer } from "./styles/SignupContainer";

const SignupForm = () => {
    
    const [ user, setUser] = useState({
        username: "",
        password: "",
    })

    const handleChange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post('https://sleep-tracker-server.herokuapp.com/api/auth/register', user)
          .then(res => console.log(res))
          .catch(err => console.log(err))
        // axios
        // .post('https://sleep-tracker-server.herokuapp.com/api/auth/login', user)
        //     .then(res => {
        //         localStorage.setItem('token', res.data);
        //         console.log(res);
                
        // })
        //     .catch(err => console.log(err))  
    };

    return (
        <>
            <SignupContainer>
                <form >
                    <label htmlFor="uname">username</label>
                    <input
                        id="uname"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="pword">password</label>
                    <input
                        id="pword"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <input 
                        type="submit"
                        value="submit"
                        onClick={handleSubmit}
                    />
                </form>
            </SignupContainer>
            
        </>
    )
};

export default SignupForm;