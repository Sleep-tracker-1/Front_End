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
    const [stringDate, setStringDate] = useState(formatDateForInput(date));

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
        console.log("date before changing: ", date);
        const newTime = e.target.value;
        const timeZoneAdjusted = `${newTime}T00:00-0800`;

        console.log("date after changing: ", new Date(timeZoneAdjusted));
        setDate(new Date(timeZoneAdjusted));
        setStringDate(e.target.value);
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

    // useEffect(() => {
    //     // date starts as a Date object
    //     // need to convert to
    //     // const stringDate = date.toLocaleDateString().replace(/\//g, "-"); // 3-7-2020 format

    //     // convert to YYYY-M-DD

    //     // console.log("stringDate in EditData: ", stringDate);
    //     console.log("date in EditData: ", date);
    //     setStringDate(formatDateForInput(date));
    // }, [date]);

    useEffect(() => {
        // do GET request via action creator to update state in redux store
        // want to do a new GET request when the user selects a different date to edit
        const getDateData = day => {
            getDataFromOneDate(day);
        };

        console.log("date in EditData: ", date); // Date object

        // let dateString = date.toLocaleDateString().replace(/\//g, "-");

        // console.log("dateString in EditData: ", dateString);

        // if (dateString[1] === "-" && dateString[3] === "-") {
        //     // if day is formatted like 3-1-2020 (M-D-YYYY)
        //     // want to add a 0 before the day num @ dateString[2] and shift everything from index 2 over 1
        //     dateString = `${dateString.slice(0, 2)}0${dateString.slice(
        //         2,
        //         dateString.length
        //     )}`;
        // } else if (dateString[2] === "-" && dateString[4] === "-") {
        //     // if 7 days from current day is formatted like 12-1-2020 (MM-D-YYYY)
        //     // want to add a 0 before the day num @ dateString[3] and shift everything from index 3 over 1
        //     dateString = `${dateString.slice(0, 3)}0${dateString.slice(
        //         3,
        //         dateString.length
        //     )}`;
        // }

        // // if month is only a single digit, add a zero in front
        // if (dateString[1] === "-") {
        //     dateString = `0${dateString}`;
        // }

        // // convert to YYYY-MM-DD format
        // dateString = `${dateString.slice(
        //     6,
        //     dateString.length
        // )}-${dateString.slice(0, 5)}`;

        // console.log(
        //     "dateString before passing to formatDateForInput: ",
        //     dateString
        // );

        // value give to getDateData needs to be YYYY-MM-DD
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
                    value={stringDate}
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
