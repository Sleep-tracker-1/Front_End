import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { formatDateForInput } from "../utils/formatDateForInput";
import useOnClickOutside from "../hooks/useOnClickOutside";

import {
    getMainData,
    editMood,
    editTiredness,
    editWakeAndBedTimes,
    getDataFromOneDate,
} from "../actions/bwActions";

import {
    LandingPageContainer,
    ButtonsContainer,
    InputFormButton,
} from "./UserLandingPage/LandingPage";
import CircleProgressbars from "./UserLandingPage/CircleProgressbars";
import UserInputForm from "./UserLandingPage/UserInputForm";

const DateInputContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;

    & label {
        margin-bottom: 0;
    }

    & input {
        max-width: 150px;
    }
`;

const EditData = ({
    dateToEdit,
    getDataFromOneDate, // need to destructure b/c of useEffect dependency array warning error
    getMainData, // need to destructure b/c of useEffect dependency array warning error
    moodEmojis,
    tirednessEmojis,
    ...props
}) => {
    const [date, setDate] = useState(new Date());

    // for "closing" forms when clicking outside of them
    const wakeUpFormRef = useRef(null);
    const middayFormRef = useRef(null);
    const bedtimeFormRef = useRef(null);

    const wakeUpButtonRef = useRef(null);
    const middayButtonRef = useRef(null);
    const bedtimeButtonRef = useRef(null);

    // for the IconTab swiping animation
    const [wakeUpSlide, setWakeUpSlide] = useState(0);
    const [bedtimeSlide, setBedtimeSlide] = useState(0);
    const [middaySlide, setMiddaySlide] = useState(0);

    // handleTap functions for the IconTab animations
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

    const handleDateChange = e => {
        setDate(e.target.value);
    };

    // handleSubmit for sending the PUT request to the server
    const handleMoodSubmit = (timeOfDay, dateId, updatedMood) => {
        // invoke action creator here that does the PUT request
        // action.payload = the date's updated redux state for the times, mood, and tiredness
        props.editMood(timeOfDay, dateId, updatedMood);
    };

    const handleTirednessSubmit = (
        initialVals,
        timeOfDay,
        dateId,
        updatedTiredness
    ) => {
        props.editTiredness(timeOfDay, dateId, updatedTiredness);
    };

    const handleSleepTimesSubmit = (timeOfDay, dateId, updatedTime) => {
        // updatedTime needs to be Date.toISOString()
        props.editWakeAndBedTimes(timeOfDay, dateId, updatedTime);
    };

    useEffect(() => {
        // do GET request via action creator to update state in redux store
        // want to do a new GET request when the user selects a different date to edit
        const getDateData = day => {
            getDataFromOneDate(day);
        };

        console.log("date in EditData: ", date);

        getDateData(formatDateForInput(date));
    }, [date, getDataFromOneDate]);

    useEffect(() => {
        // when the input values get updated in the redux store (pass into the dependency array for this useEffect), set the local state 'initialValues' and 'initialValuesPlusTime'
        // might have to convert wake and bed times from Date object to string first? something to check
        const fetchUserData = () => {
            getMainData();
        };

        fetchUserData();
    }, [getMainData]);

    return (
        <LandingPageContainer>
            <DateInputContainer>
                <label htmlFor="editDate">Date to edit:</label>
                <input
                    id="editDate"
                    type="date"
                    name="editDate"
                    value={formatDateForInput(date)}
                    onChange={e => {
                        handleDateChange(e);
                    }}
                />
            </DateInputContainer>

            {/* Amount of sleep, mood, and tiredness levels compared to averages as circular progress "bars" */}
            <CircleProgressbars />

            <ButtonsContainer>
                <InputFormButton
                    ref={wakeUpButtonRef}
                    onTap={() => wakeUpTap()}
                    isWakeUp={true} // used for styled components for conditional styles
                >
                    Wake Up
                </InputFormButton>

                <InputFormButton
                    ref={middayButtonRef}
                    onTap={() => middayTap()}
                    isMidday={true} // used for styled components for conditional styles
                >
                    Midday
                </InputFormButton>

                <InputFormButton
                    ref={bedtimeButtonRef}
                    onTap={() => bedtimeTap()}
                    isBedtime={true} // used for styled components for conditional styles
                >
                    Bedtime
                </InputFormButton>
            </ButtonsContainer>

            <UserInputForm
                dateId={dateToEdit.dateId}
                heading="Wake Up"
                needsTimeInput={true}
                timeLabel="Wake up time"
                timeId="wakeUpTime"
                timeOfDay="wakeUp"
                initialValues={dateToEdit.wakeUp}
                handleMoodSubmit={handleMoodSubmit}
                handleTirednessSubmit={handleTirednessSubmit}
                handleSleepTimesSubmit={handleSleepTimesSubmit}
                animateY={wakeUpSlide}
                closeForm={wakeUpTap}
                formRef={wakeUpFormRef}
            />
            <UserInputForm
                dateId={dateToEdit.dateId}
                heading="Midday"
                timeOfDay="midday"
                initialValues={dateToEdit.midday}
                handleMoodSubmit={handleMoodSubmit}
                handleTirednessSubmit={handleTirednessSubmit}
                isMidday={true} // for styling
                animateY={middaySlide}
                closeForm={middayTap}
                formRef={middayFormRef}
            />
            <UserInputForm
                dateId={dateToEdit.dateId}
                heading="Bedtime"
                needsTimeInput={true}
                timeLabel="Bedtime"
                timeId="bedtime"
                timeOfDay="bedtime"
                initialValues={dateToEdit.bedtime}
                handleMoodSubmit={handleMoodSubmit}
                handleTirednessSubmit={handleTirednessSubmit}
                handleSleepTimesSubmit={handleSleepTimesSubmit}
                animateY={bedtimeSlide}
                closeForm={bedtimeTap}
                formRef={bedtimeFormRef}
            />
        </LandingPageContainer>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        moodEmojis: state.moodEmojis,
        tirednessEmojis: state.tirednessEmojis,
        dateToEdit: state.dateToEdit,
    };
};

export default connect(mapStateToProps, {
    getMainData,
    editMood,
    editTiredness,
    editWakeAndBedTimes,
    getDataFromOneDate,
})(EditData);
