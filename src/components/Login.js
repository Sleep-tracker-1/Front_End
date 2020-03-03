import React, { useEffect, useState } from "react";

function Login() {
    const [statesHere, setStateshere] = useState("");

    const submitHandler = event => {
        event.preventDefault();
    };
    const onInputChange = event => {
        // console.log`name is currently ${nameInput.value} email is currently ${emailInput.value} role is currently${roleInput.value}`();

        // setNewMember({
             // ...newMember,
             // [event.target.name]: event.target.value,
        // });
    };

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor>
                Username
                <input
                    type="text"
                    name="name"
                    id="nameInput"
                    // placeholder={newMember.name}
                    // onChange={onInputChange}
                    // value={newMember.name}
                />
            </label>
            <label>
                Password:
                <input
                    type="text"
                    name="email"
                    id="passwordInput"
                    onChange={onInputChange}
                />
            </label>

            <button onSubmit={e => {}}>Login</button>
        </form>
    );
}

export default Login;
