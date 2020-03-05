/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { motion } from "framer-motion";

import { getUserData } from "../../actions/bwActions";

import TestGraph from "../TestGraph";
import CircleProgressbar from "./CircleProgressbar";
import IconTab from "./IconTab";
import { WiSunrise } from "react-icons/wi";
import { FiSun, FiMoon } from "react-icons/fi";

// if you change the height of the header, the LandingPageContainer min and max height calcs need to be adjusted
const LandingPageContainer = styled.div`
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    height: 100%;
    min-height: calc(100vh - 75px);
    max-height: calc(100vh - 75px);
    position: relative;
`;

export const Sunrise = styled(WiSunrise)`
    font-size: 2.5rem;
    z-index: 5;
    position: absolute;
    right: 0;
    transform: rotate(90deg);
`;

// padding is to make sure the IconTabs don't cover them up
const ProgressBarsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(75px, 200px));
    grid-gap: 15px;
    box-sizing: border-box;
    padding: 0 40px;

    @media (max-width: 400px) {
        padding: 0 30px;
    }
`;

const ButtonsContainer = styled.div`
    width: 200px;
    margin: 0 auto;
    display: grid;
    grid-template-rows: repeat(3, 40px);
    grid-gap: 15px;
`;

const InputFormButton = styled(motion.button)`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
`;

// can get rid of these and import initial values from redux store
const initialValues = {
    mood: 0,
    tiredness: 0,
};

const initialValuesPlusTime = {
    ...initialValues,
    time: "",
};

const Emoji = ({ emoji, ariaLabel }) => (
    <span role="img" aria-label={ariaLabel}>
        {emoji}
    </span>
);

const LandingPage = props => {
    // for IconTab transitions
    const [wakeUpSlide, setWakeUpSlide] = useState(0);
    const [bedtimeSlide, setBedtimeSlide] = useState(0);
    const [middaySlide, setMiddaySlide] = useState(0);

    const wakeUpTap = e => {
        let slidePosition = wakeUpSlide;

        if (slidePosition === 0) {
            slidePosition -= 400;
        } else {
            slidePosition += 400;
        }

        setWakeUpSlide(slidePosition);
    };

    const bedtimeTap = e => {
        let newPos = bedtimeSlide;

        if (newPos === 0) {
            newPos -= 400;
        } else {
            newPos += 400;
        }

        setBedtimeSlide(newPos);
    };

    const middayTap = e => {
        let newPosition = middaySlide;

        if (newPosition === 0) {
            newPosition -= 393;
        } else {
            newPosition += 393;
        }

        setMiddaySlide(newPosition);
    };

    const handleSubmit = (values, timeOfDay) => {
        const timeAsDate = new Date(values.time); // convert `time` to Date object for POST request

        console.log("values in handleSubmit: ", values);
        console.log("about to do POST request");

        // need to import action creator that will invoke the POST request
        // timeOfDay will tell us which part of the data needs to be updated
    };

    const fetchUserData = () => {
        props.getUserData();
    };

    const setProgressBarColor = percentage => {
        if (percentage < 34) {
            return "#F20000"; //red
        } else if (percentage < 66 && percentage > 34) {
            return "#EFD914"; // yellow
        } else if (percentage > 66) {
            return "#20C261"; // green
        }

        return "#20C261"; // green
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        console.log("wakeUpSlide: ", wakeUpSlide);
    }, [wakeUpSlide]);

    console.log("props.user.username: ", props.user.username);

    return (
        <LandingPageContainer>
            <TestGraph />
            <ProgressBarsContainer>
                {/* progressColor and emoji for each will need to be dynamic to change depending on the ratio */}

                {/* sleep ratio */}
                <CircleProgressbar
                    progressColor={setProgressBarColor(30)}
                    value={30}
                >
                    {/* placeholder value */}
                    <p>7hr 12min</p>
                </CircleProgressbar>

                {/* mood ratio */}
                <CircleProgressbar
                    progressColor={setProgressBarColor(52)}
                    value={52}
                >
                    <Emoji
                        emoji={props.moodEmojis.great.emoji}
                        ariaLabel={props.moodEmojis.great.desc}
                    />
                </CircleProgressbar>

                {/* tiredness ratio */}
                <CircleProgressbar
                    progressColor={setProgressBarColor(80)}
                    value={80}
                >
                    <Emoji
                        emoji={props.tirednessEmojis.great.emoji}
                        ariaLabel={props.tirednessEmojis.great.desc}
                    />
                </CircleProgressbar>
            </ProgressBarsContainer>
            <ButtonsContainer>
                <InputFormButton
                    onClick={() => {
                        console.log("here");
                    }}
                    // maybe have an onTap Framer Motion here to trigger a motion.div for the necessary form transition
                    onTap={wakeUpTap}
                    isWakeUp={true} // used for styled components for conditional styles
                >
                    Wake Up
                </InputFormButton>

                <InputFormButton
                    onTap={middayTap}
                    isMidday={true} // used for styled components for conditional styles
                >
                    Midday
                </InputFormButton>

                <InputFormButton
                    onTap={bedtimeTap}
                    isBedtime={true} // used for styled components for conditional styles
                >
                    Bedtime
                </InputFormButton>
            </ButtonsContainer>

            <IconTab
                heading="Wake Up"
                needsTimeInput={true}
                timeLabel="Wake up time"
                timeId="wakeUpTime"
                initialValues={initialValuesPlusTime}
                handleSubmit={handleSubmit}
                isWakeUp={true}
                animateY={wakeUpSlide}
                tapFunc={wakeUpTap}
                icon={Sunrise}
            />
            <IconTab
                heading="Midday"
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                icon={FiSun}
                isMidday={true}
                isMiddayTiredness={true}
                animateY={middaySlide}
                tapFunc={middayTap}
            />
            <IconTab
                heading="Bedtime"
                needsTimeInput={true}
                timeLabel="Bedtime"
                timeId="bedtime"
                initialValues={initialValuesPlusTime}
                handleSubmit={handleSubmit}
                isBedtime={true}
                icon={FiMoon}
                animateY={bedtimeSlide}
                tapFunc={bedtimeTap}
            />
        </LandingPageContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
    };
};

export default connect(mapStateToProps, { getUserData })(LandingPage);
