import styled from "styled-components"

export const SignupContainer = styled.div`
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 10px;
    height: 70%;
    width: 70%;
    margin: auto; 
    text-align: center; 
    
`

export const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    width: 80%;
    margin: auto;
    padding: 4%;
    text-align: center;
    position: relative;
`

export const InputContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin: 0 auto;
    padding: 0;
`

export const NewUserInputs = styled.input`
    width: 65%;
    padding: 2% 3%;
    margin: 1%;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    align-items: flex-start;
    align-self: center;
` 

export const NewUserSubmit = styled.input`
    background-color: #4CAF50;
    color: white;
    padding: 2% 5%;
    margin: 0 auto;
    margin-top: 3%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    :hover {
    background-color: #45a049;
    }
`

export const FormLabel = styled.label`
    padding: 1%;    

`

export const Header = styled.h3`
    margin: 0 auto;
`