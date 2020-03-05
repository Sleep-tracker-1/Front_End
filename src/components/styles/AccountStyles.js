// styles for Accounts page
import styled from "styled-components";

//main container for accounts info
export const MContainer = styled.div`
    height: 85vh;
    display: flex;
    flex-flow: column nowrap;
    text-align: center;
`

//main title heeader
export const Header = styled.h2`
    margin: 4% 0% 4% 0%;
`

//div for containing title and data for user info
export const InfoDiv = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column nowrap;
    margin: 0 auto;
`

export const Label = styled.h5`

`

export const DataH4 = styled.input`
    margin: 1% auto;
    border: none;
    font-size: 1.22em;
    width: 80%;
    text-align: center;
    font-weight: bolder;
`