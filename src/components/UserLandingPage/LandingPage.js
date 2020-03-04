import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

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
            slidePosition += 165;
        } else {
            slidePosition -= 165;
        }

        setWakeUpSlide(slidePosition);
    };

    const bedtimeTap = e => {
        let newPos = bedtimeSlide;

        if (newPos === 0) {
            newPos -= 165;
        } else {
            newPos += 165;
        }

        setBedtimeSlide(newPos);
    };

    const middayTap = e => {
        let newPosition = middaySlide;

        if (newPosition === 0) {
            newPosition -= 135;
        } else {
            newPosition += 135;
        }

        setMiddaySlide(newPosition);
    };

    const handleSubmit = values => {
        const timeAsDate = new Date(values.time); // convert `time` to Date object for POST request

        console.log("values in handleSubmit: ", values);
        console.log("about to do POST request");

        // need to import action creator that will invoke the POST request
    };

    return (
        <LandingPageContainer>
            <TestGraph />
            <ProgressBarsContainer>
                {/* progressColor and emoji for each will need to be dynamic to change depending on the ratio */}

                {/* sleep ratio */}
                <CircleProgressbar progressColor="red" value={30}>
                    {/* placeholder value */}
                    <p>7hr 12min</p>
                </CircleProgressbar>

                {/* mood ratio */}
                <CircleProgressbar progressColor="yellow" value={52}>
                    <Emoji
                        emoji={props.moodEmojis.great.emoji}
                        ariaLabel={props.moodEmojis.great.desc}
                    />
                </CircleProgressbar>

                {/* tiredness ratio */}
                <CircleProgressbar progressColor="green" value={80}>
                    <Emoji
                        emoji={props.tirednessEmojis.great.emoji}
                        ariaLabel={props.tirednessEmojis.great.desc}
                    />
                </CircleProgressbar>
            </ProgressBarsContainer>
            <IconTab
                heading="Wake Up"
                needsTimeInput={true}
                timeLabel="Wake up time"
                timeId="wakeUpTime"
                initialValues={initialValuesPlusTime}
                handleSubmit={handleSubmit}
                isWakeUp={true}
                animateX={wakeUpSlide}
                tapFunc={wakeUpTap}
                icon={Sunrise}
            />
            <IconTab
                heading="Midday"
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                icon={FiSun}
                isMidday={true}
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
                animateX={bedtimeSlide}
                tapFunc={bedtimeTap}
            />
        </LandingPageContainer>
    );
};

const mapStateToProps = state => {
    return {
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
    };
};

export default connect(mapStateToProps, {})(LandingPage);
