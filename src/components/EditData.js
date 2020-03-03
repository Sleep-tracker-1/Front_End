import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Sunrise } from "./UserLandingPage/LandingPage";
import { FiSun, FiMoon } from "react-icons/fi";

import IconTab from "./UserLandingPage/IconTab";

const EditData = () => {
    // for the IconTab swiping animation
    const [wakeUpSlide, setWakeUpSlide] = useState(0);
    const [bedtimeSlide, setBedtimeSlide] = useState(0);
    const [middaySlide, setMiddaySlide] = useState(0);

    // local state for the party that updates the date we want to do a GET request for
    const [dateToQuery, setDateToQuery] = useState(Date.now());

    // initial values for the times, moods, and tiredness before doing a GET request
    const [initialValues, setInitialValues] = useState({
        mood: 0,
        tiredness: 0,
    });
    const [initialValuesPlusTime, setInitialValuesPlusTime] = useState({
        ...initialValues,
        time: "",
    });

    // handleTap functions for the IconTab animations
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

    // handleSubmit for sending the PUT request to the server
    const handleSubmit = e => {
        e.preventDefault();

        // invoke action creator here that does the PUT request
        // action.payload = the date's updated redux state for the times, mood, and tiredness
    };

    useEffect(() => {
        // do GET request via action creator to update state in redux store
        // want to do a new GET request when the user selects a different date to edit
    }, [dateToQuery]);

    useEffect(() => {
        // when the input values get updated in the redux store (pass into the dependency array for this useEffect), set the local state 'initialValues' and 'initialValuesPlusTime'
    }, []);

    return (
        <div>
            {/* Graph that only shows 1 day of data with some sort of data selection that will do a GET request for a different day */}

            {/* Amount of sleep, mood, and tiredness levels compared to averages as circular progress "bars" */}

            {/* IconTab components with values initialized with data pulled in from GET request */}

            {/* Have each IconTab take an action creator that updates the redux store state on the client side, but don't send the PUT request to the server with those changes until they press the Submit button */}
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

            {/* button that invokes the action creator that does the PUT request */}
            <button onClick={handleSubmit}>Save Changes</button>
        </div>
    );
};

export default EditData;
