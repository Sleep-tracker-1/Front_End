import React from "react";
import * as Styles from "../styles/NewUserStyles.js";
import ControlledCarousel from "./Carousel.js";

const NewUser = () => {
    
    return (
        <>
            <Styles.NewUserContainer>
                <Styles.NewHeader>Welcome New User</Styles.NewHeader>
                <ControlledCarousel />
                <Styles.NewText>Swipe Left</Styles.NewText>
                <Styles.NewText>To Get Started</Styles.NewText>
            </Styles.NewUserContainer>
        </>
    )
}

export default NewUser;