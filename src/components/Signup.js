import React, { useState } from "react";
import axios from "axios";
import { SignupContainer } from "./styles/SignupContainer";

const SignupForm = () => {
    
    const [ user, setUser] = useState({
        username: '',
        password: '',
        firstName: '',
        email: '',
    })
    console.log(user);
    

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
            .then(res => {
              console.log(res)
            localStorage.setItem("token", res.data.token)
            })
          .catch(err => console.log(err))
    };

    return (
        <>
            <SignupContainer>
                <form >
                    <label htmlFor="firstname">name    </label>
                    <input
                        id="fname"
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">email   </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email"
                        value={user.email}
                        onChange={handleChange}
                    />
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