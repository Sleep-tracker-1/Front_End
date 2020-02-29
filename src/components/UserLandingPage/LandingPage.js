import React, { useState } from "react";
import styled from "styled-components";

import IconTab from "./IconTab";

const LandingPage = props => {
    const [wakeUp, setWakeUp] = useState(null);
    const [bedtime, setBedtime] = useState(null);
    const [moods, setMoods] = useState({
        wakeUp: "",
        midday: "",
        bedtime: "",
    });
    const [tiredness, setTiredness] = useState({
        wakeUp: "",
        midday: "",
        bedtime: "",
    });

    const handleWakeUpChange = e => {
        setWakeUp(e.target.value);
    };

    const handleBedtimeChange = e => {
        setBedtime(e.target.value);
    };

    const handleMoodChange = e => {
        setMoods({
            ...moods,
            [e.target.name]: e.target.value,
        });
    };

    const handleTirednessChange = e => {
        setTiredness({
            ...tiredness,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <IconTab
                initialValue={wakeUp}
                timeId="wakeUpTime"
                moodId="wakeUpMood"
                tirednessId="wakeUpTiredness"
                handleChange={handleWakeUpChange}
            />
            <IconTab
                initialValue={null}
                moodId="middayMood"
                tirednessId="middayTiredness"
            />
            <IconTab
                initialValue={bedtime}
                timeId="bedtime"
                moodId="bedtimeMood"
                tirednessId="bedtimeTiredness"
                handleChange={handleBedtimeChange}
            />
        </div>
    );
};

export default LandingPage;
