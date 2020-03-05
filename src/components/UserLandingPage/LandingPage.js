import React, { useState, useEffect } from "react";
import styled from "styled-components";

<<<<<<< Updated upstream
=======
import { getUserData } from "../../actions/bwActions";

import TestGraph from "../TestGraph";
import CircleProgressbar from "./CircleProgressbar";
>>>>>>> Stashed changes
import IconTab from "./IconTab";
import { WiSunrise } from "react-icons/wi";
import { FiSun, FiMoon } from "react-icons/fi";

const Sunrise = styled(WiSunrise)`
    font-size: 2.5rem;
    z-index: 5;
    position: absolute;
    right: 0;
    transform: rotate(90deg);
`;

const initialValues = {
    mood: 0,
    tiredness: 0,
};

const initialValuesPlusTime = {
    ...initialValues,
    time: "",
};

const LandingPage = () => {
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

<<<<<<< Updated upstream
    // const wakeUpDragConstraints = {
    //     left: 0,
    //     right: 165,
    // };
=======
    const handleSubmit = (values, timeOfDay) => {
        const timeAsDate = new Date(values.time); // convert `time` to Date object for POST request
>>>>>>> Stashed changes

    // const middayDragConstraints = {
    //     top: 135,
    //     bottom: 0,
    // };

<<<<<<< Updated upstream
    // const bedtimeDragConstraints = {
    //     left: -165,
    //     right: 0,
    // };

    // const horizontalDrag = "x";
    // const verticalDrag = "y";
=======
        // need to import action creator that will invoke the POST request
        // timeOfDay will tell us which part of the data needs to be updated
    };

    const fetchUserData = () => {
        props.getUserData();
    };
>>>>>>> Stashed changes

    useEffect(() => {
        fetchUserData();
    }, []);

    console.log("props.user.username: ", props.user.username);

    return (
        <LandingPageContainer>
            {/* <TestGraph /> */}
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
                isWakeUp={true}
                animateX={wakeUpSlide}
                tapFunc={wakeUpTap}
                icon={Sunrise}
                // dragDirection={horizontalDrag}
                // dragConstraints={wakeUpDragConstraints}
            />
            <IconTab
                heading="Midday"
                initialValues={initialValues}
                icon={FiSun}
                isMidday={true}
                animateY={middaySlide}
                tapFunc={middayTap}
                // dragDirection={verticalDrag}
                // dragConstratints={middayDragConstraints}
            />
            <IconTab
                heading="Bedtime"
                needsTimeInput={true}
                timeLabel="Bedtime"
                timeId="bedtime"
                initialValues={initialValuesPlusTime}
                isBedtime={true}
                icon={FiMoon}
                animateX={bedtimeSlide}
                tapFunc={bedtimeTap}
                // dragDirection={horizontalDrag}
                // dragConstraints={bedtimeDragConstraints}
            />
        </>
    );
};

<<<<<<< Updated upstream
export default LandingPage;
=======
const mapStateToProps = state => {
    return {
        user: state.user,
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
    };
};

export default connect(mapStateToProps, { getUserData })(LandingPage);
>>>>>>> Stashed changes
