import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import {
    getUserData,
    getMainData,
    postBedtimeInputs,
    postWakeUpInputs,
    postMiddayInputs,
} from "../../actions/bwActions";

import TestGraph from "../TestGraph";
import CircleProgressbar from "./CircleProgressbar";
import UserInputForm from "./UserInputForm";

// if you change the height of the header, the LandingPageContainer min and max height calcs need to be adjusted
export const LandingPageContainer = styled.div`
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    height: 100%;
    min-height: calc(100vh - 75px);
    max-height: calc(100vh - 75px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// padding is to make sure the IconTabs don't cover them up
export const ProgressBarsContainer = styled.div`
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

export const ProgressbarSleepAmount = styled.p`
    margin: 0;
`;

const RecommendedSleepContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const RecommendedSleep = styled.h2`
    font-size: 1.25rem;
`;

export const ButtonsContainer = styled.div`
    width: 200px;
    margin: 0 auto;
    display: grid;
    grid-template-rows: repeat(3, 40px);
    grid-gap: 10px;
`;

export const InputFormButton = styled(motion.button)`
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

export const Emoji = ({ emoji, ariaLabel }) => (
    <span role="img" aria-label={ariaLabel}>
        {emoji}
    </span>
);

const LandingPage = props => {
    const [formsSubmitted, setFormsSubmitted] = useState({
        wakeUp: false,
        midday: false,
        bedtime: false,
    });

    // for "closing" forms when clicking outside of them
    const wakeUpFormRef = useRef(null);
    const middayFormRef = useRef(null);
    const bedtimeFormRef = useRef(null);

    const wakeUpButtonRef = useRef(null);
    const middayButtonRef = useRef(null);
    const bedtimeButtonRef = useRef(null);

    // for UserInputForm transitions
    const [wakeUpSlide, setWakeUpSlide] = useState(0);
    const [bedtimeSlide, setBedtimeSlide] = useState(0);
    const [middaySlide, setMiddaySlide] = useState(0);

    const wakeUpTap = () => {
        let slidePosition = wakeUpSlide;

        if (slidePosition === 0) {
            slidePosition -= 400;
        } else {
            slidePosition += 400;
        }

        setWakeUpSlide(slidePosition);
    };

    const bedtimeTap = () => {
        let newPos = bedtimeSlide;

        if (newPos === 0) {
            newPos -= 400;
        } else {
            newPos += 400;
        }

        setBedtimeSlide(newPos);
    };

    const middayTap = () => {
        let newPosition = middaySlide;

        if (newPosition === 0) {
            newPosition -= 393;
        } else {
            newPosition += 393;
        }

        setMiddaySlide(newPosition);
    };

    useOnClickOutside(wakeUpFormRef, wakeUpButtonRef, () => {
        setWakeUpSlide(0);
    });

    useOnClickOutside(middayFormRef, middayButtonRef, () => {
        setMiddaySlide(0);
    });

    useOnClickOutside(bedtimeFormRef, bedtimeButtonRef, () => {
        setBedtimeSlide(0);
    });

    const handleBedtimeSubmit = values => {
        let timeAsDate = new Date(values.time); // convert `time` to Date object for POST request
        timeAsDate = timeAsDate.toISOString();

        const postRequestObj = {
            ...values,
            time: timeAsDate,
        };

        // const postRequestObj = {
        //     nightTime: {
        //         bedtime: timeAsDate,
        //     },
        //     nightMood: {
        //         nightMood: values.mood,
        //     },
        //     nightTired: {
        //         nightTired: values.tiredness,
        //     },
        // };

        props.postBedtimeInputs(postRequestObj);
    };

    const handleWakeUpSubmit = values => {
        console.log("in wakeUp submit form");
        let timeAsDate = new Date(values.time); // convert `time` to Date object for POST request
        timeAsDate = timeAsDate.toISOString();

        const postRequestObj = {
            ...values,
            time: timeAsDate,
        };

        props.postWakeUpInputs(postRequestObj);
    };

    const handleMiddaySubmit = values => {
        props.postMiddayInputs(values);
    };

    const toggleIsFormSubmitted = timeOfDay => {
        const submittedForm = { ...formsSubmitted };

        if (timeOfDay === "wakeUp") {
            submittedForm.wakeUp = true;
        } else if (timeOfDay === "midday") {
            submittedForm.midday = true;
        } else if (timeOfDay === "bedtime") {
            submittedForm.bedtime = true;
        }

        setFormsSubmitted(submittedForm);
    };

    // fetch user data from API via action creator
    const fetchUserData = () => {
        props.getMainData();
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
                    <ProgressbarSleepAmount>7hr 12min</ProgressbarSleepAmount>
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

            <RecommendedSleepContainer>
                <RecommendedSleep>
                    Sleep recommendation:{" "}
                    {props.user.sleepRecommendation ? (
                        <strong>{props.user.sleepRecommendation}hours</strong>
                    ) : (
                        <strong>Not available</strong>
                    )}
                </RecommendedSleep>
            </RecommendedSleepContainer>

            <ButtonsContainer>
                <InputFormButton
                    ref={wakeUpButtonRef}
                    disabled={formsSubmitted.wakeUp} // don't want to allow more inputs/submissions after first submission
                    onTap={() => wakeUpTap()}
                    isWakeUp={true} // used for styled components for conditional styles
                >
                    Wake Up
                </InputFormButton>

                <InputFormButton
                    ref={middayButtonRef}
                    disabled={formsSubmitted.midday} // don't want to allow more inputs/submissions after first submission
                    onTap={() => middayTap()}
                    isMidday={true} // used for styled components for conditional styles
                >
                    Midday
                </InputFormButton>

                <InputFormButton
                    ref={bedtimeButtonRef}
                    disabled={formsSubmitted.bedtime} // don't want to allow more inputs/submissions after first submission
                    onTap={() => bedtimeTap()}
                    isBedtime={true} // used for styled components for conditional styles
                >
                    Bedtime
                </InputFormButton>
            </ButtonsContainer>

            <UserInputForm
                heading="Wake Up"
                needsTimeInput={true}
                timeLabel="Wake up time"
                timeId="wakeUpTime"
                timeOfDay="wakeUp"
                toggleIsFormSubmitted={toggleIsFormSubmitted}
                initialValues={initialValuesPlusTime}
                handleSubmit={handleWakeUpSubmit}
                animateY={wakeUpSlide}
                closeForm={wakeUpTap}
                formRef={wakeUpFormRef}
                isDisabled={formsSubmitted.wakeUp}
            />
            <UserInputForm
                heading="Midday"
                timeOfDay="midday"
                toggleIsFormSubmitted={toggleIsFormSubmitted}
                initialValues={initialValues}
                handleSubmit={handleMiddaySubmit}
                isMidday={true} // for styling
                animateY={middaySlide}
                closeForm={middayTap}
                formRef={middayFormRef}
                isDisabled={formsSubmitted.midday}
            />
            <UserInputForm
                heading="Bedtime"
                needsTimeInput={true}
                timeLabel="Bedtime"
                timeId="bedtime"
                timeOfDay="bedtime"
                toggleIsFormSubmitted={toggleIsFormSubmitted}
                initialValues={initialValuesPlusTime}
                handleSubmit={handleBedtimeSubmit}
                animateY={bedtimeSlide}
                closeForm={bedtimeTap}
                formRef={bedtimeFormRef}
                isDisabled={formsSubmitted.bedtime}
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

export default connect(mapStateToProps, {
    getUserData,
    getMainData,
    postBedtimeInputs,
    postWakeUpInputs,
    postMiddayInputs,
})(LandingPage);
