import React, { useState } from "react";
import styled from "styled-components";
import TestGraph from "../TestGraph";
import IconTab from "./IconTab";
import TestGraph from "../TestGraph";
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

    return (
        <>
            <TestGraph />
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
            />
            <IconTab
                heading="Midday"
                initialValues={initialValues}
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
                isBedtime={true}
                icon={FiMoon}
                animateX={bedtimeSlide}
                tapFunc={bedtimeTap}
            />
        </>
    );
};

export default LandingPage;
