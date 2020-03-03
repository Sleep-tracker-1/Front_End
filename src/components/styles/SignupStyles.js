import styled from "styled-components"

export const SignupContainer = styled.div`
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    height: 70vh;
    width: 85vw;
    margin: auto;
    
`

export const Form = styled.form`
    display: block;
    margin-top: 0em;
    text-align: center;
`

export const NewUserInputs = styled.input`
    width: 75%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    align-items: flex-start;
` 

export const NewUserSubmit = styled.input`
    width: 70%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    :hover {
    background-color: #45a049;
    }
`

export const FormLabel = styled.label`
    padding: 2%;    

`