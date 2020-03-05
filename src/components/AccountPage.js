import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserData } from "../actions/bwActions";
import * as Style from "./styles/AccountStyles";
import { Label } from "react-bootstrap";

const AccountPage = (props) => {
    useEffect(() => {
        props.getUserData()

    }, [])

    const [ users, setUsers] = useState({
        username: '',
        password: '',
        firstName: '',
        email: '',
    })
    
    const handleChange = e => {
        setUsers({
          ...users,
          [e.target.name]: e.target.value,
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        // axios
        // .post('https://sleep-tracker-server.herokuapp.com/api/auth/register', user)
        //     .then(res => {
        //         console.log(res)
        //         localStorage.setItem("token", res.data.token);
        //         props.history.push('/home')
        //     })
        //   .catch(err => console.log(err))
    };
    
    return(
        <>  
            <Style.MContainer>
                <Style.Header>Account Information</Style.Header>
                <Style.InfoDiv>
                    <Style.Label>Username:</Style.Label>
                    <Style.DataH4 type="text" name="username" value={props.user.username} onChange={handleChange} />
                </Style.InfoDiv>
                <Style.InfoDiv>
                    <Style.Label>First Name:</Style.Label>
                    <Style.DataH4 type="text" name="firstName" value={props.user.firstName} onChange={handleChange} />
                </Style.InfoDiv>
                <Style.InfoDiv>    
                    <Style.Label>Email:</Style.Label>
                    <Style.DataH4 type="email" name="email" value={props.user.email} onChange={handleChange} /> 
                </Style.InfoDiv>
            </Style.MContainer>
        </>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect( mapStateToProps, {getUserData} )(AccountPage);