import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { formatDate } from "../utils/formatDate";
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
    ProgressBarsContainer,
    ProgressbarSleepAmount,
    ButtonsContainer,
    InputFormButton,
    Emoji,
} from "./UserLandingPage/LandingPage";
import CircleProgressbar from "./UserLandingPage/CircleProgressbar";
import UserInputForm from "./UserLandingPage/UserInputForm";

const EditData = ({ dateToEdit, moodEmojis, tirednessEmojis, ...props }) => {
    const [date, setDate] = useState(new Date());
    const [averageMoodEmoji, setAverageMoodEmoji] = useState(0);
    const [moodEmojiAriaLabel, setMoodEmojiAriaLabel] = useState("");
    const [averageTirednessEmoji, setAverageTirednessEmoji] = useState(0);
    const [tirednessEmojiAriaLabel, setTirednessEmojiAriaLabel] = useState("");

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

    const fetchUserData = () => {
        props.getMainData();
    };

    const handleDateChange = e => {
        setDate(e.target.value);
    };

    const getDateData = day => {
        props.getDataFromOneDate(day);
    };

    // handleSubmit for sending the PUT request to the server
    const handleMoodSubmit = (timeOfDay, dateId, updatedMood) => {
        // e.preventDefault();

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
        // e.preventDefault();
        console.log("initialValues in tiredness submit: ", initialVals);
        props.editTiredness(timeOfDay, dateId, updatedTiredness);
    };

    const handleSleepTimesSubmit = (timeOfDay, dateId, updatedTime) => {
        // e.preventDefault();

        // updatedTime needs to be Date.toISOString()
        props.editWakeAndBedTimes(timeOfDay, dateId, updatedTime);
    };

    useEffect(() => {
        // do GET request via action creator to update state in redux store
        // want to do a new GET request when the user selects a different date to edit
        console.log("date: ", formatDate(date));

        getDateData(formatDate(date));
    }, [date]);

    useEffect(() => {
        let moodEmoji = "";
        let moodAriaLabel = "";
        let tirednessEmoji = "";
        let tirednessAriaLabel = "";

        if (dateToEdit.averageMood <= 1) {
            moodEmoji = moodEmojis.bad.emoji;
            moodAriaLabel = moodEmojis.bad.desc;
        } else if (dateToEdit.averageMood > 1 && dateToEdit.averageMood <= 2) {
            moodEmoji = moodEmojis.ok.emoji;
            moodAriaLabel = moodEmojis.ok.desc;
        } else if (dateToEdit.averageMood > 2) {
            moodEmoji = moodEmojis.great.emoji;
            moodAriaLabel = moodEmojis.great.desc;
        }

        if (dateToEdit.averageTiredness <= 1) {
            tirednessEmoji = tirednessEmojis.great.emoji;
            tirednessAriaLabel = tirednessEmojis.great.desc;
        } else if (
            dateToEdit.averageTiredness > 1 &&
            dateToEdit.averageTiredness <= 2
        ) {
            tirednessEmoji = tirednessEmojis.ok.emoji;
            tirednessAriaLabel = tirednessEmojis.ok.desc;
        } else if (dateToEdit.averageTiredness > 2) {
            tirednessEmoji = tirednessEmojis.bad.emoji;
            tirednessAriaLabel = tirednessEmojis.bad.desc;
        }

        setAverageMoodEmoji(moodEmoji);
        setMoodEmojiAriaLabel(moodAriaLabel);
        setAverageTirednessEmoji(tirednessEmoji);
        setTirednessEmojiAriaLabel(tirednessAriaLabel);
    }, [dateToEdit]);

    useEffect(() => {
        // when the input values get updated in the redux store (pass into the dependency array for this useEffect), set the local state 'initialValues' and 'initialValuesPlusTime'
        // might have to convert wake and bed times from Date object to string first? something to check
        fetchUserData();
    }, []);

    return (
        <div>
            <div>
                <label htmlFor="editDate">Date to edit:</label>
                <input
                    id="editDate"
                    type="date"
                    name="editDate"
                    value={formatDate(date)}
                    onChange={e => {
                        console.log("e.target.value: ", e.target.value);
                        handleDateChange(e);
                    }}
                />
            </div>

            {/* Amount of sleep, mood, and tiredness levels compared to averages as circular progress "bars" */}
            <ProgressBarsContainer>
                {/* sleep ratio */}
                <CircleProgressbar
                    progressColor={setProgressBarColor(30)}
                    value={dateToEdit.totalTimeInBed} // need to divide by overall average
                >
                    {/* placeholder value */}
                    <ProgressbarSleepAmount>
                        {dateToEdit.totalTimeInBed}hrs
                    </ProgressbarSleepAmount>
                </CircleProgressbar>

                {/* mood ratio */}
                <CircleProgressbar
                    progressColor={setProgressBarColor(52)}
                    value={dateToEdit.averageMood} // need to divide by overall average
                >
                    <Emoji
                        emoji={averageMoodEmoji}
                        ariaLabel={moodEmojiAriaLabel}
                    />
                </CircleProgressbar>

                {/* tiredness ratio */}
                <CircleProgressbar
                    progressColor={setProgressBarColor(80)}
                    value={dateToEdit.averageTiredness} // need to divide by overall average
                >
                    <Emoji
                        emoji={averageTirednessEmoji}
                        ariaLabel={tirednessEmojiAriaLabel}
                    />
                </CircleProgressbar>
            </ProgressBarsContainer>

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
        </div>
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
