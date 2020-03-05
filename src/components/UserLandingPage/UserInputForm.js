import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { isDiff } from "../../utils/isDiff";

import RatingComponent from "./RatingComponent";

const TimeInput = ({ labelText, timeId, time, handleChange }) => (
    <>
        <label htmlFor={timeId}>{labelText}</label>
        <input
            type="dateime-local" // returns time as a string with the following format: "2020-02-29T02:00"
            id={timeId}
            name="time"
            value={time}
            onChange={handleChange}
        />
    </>
);

const UserInputForm = ({
    initialValues,
    handleSubmit,
    needsTimeInput,
    timeLabel,
    timeId,
    isMiddayTiredness, // used for styling midday tiredness input
    isWakeUp, // used for styled components for conditional styles
    isMidday, // used for styled components for conditional styles
    isBedtime, // used for styled components for conditional styles
}) => {
    const [timeOfDay, setTimeOfDay] = useState("");

    useEffect(() => {
        let time = "";

        if (isWakeup) {
            time = "wakeUp";
        } else if (isMidday) {
            time = "midday";
        } else if (isBedtime) {
            time = "bedtime";
        }

        setTimeOfDay(time);
    }, [isWakeUp, isMidday, isBedtime]);

    return (
        <div>
            <Formik
                initialValues={{
                    ...initialValues,
                }}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue, submitForm }) => (
                    <>
                        {needsTimeInput && (
                            <TimeInput
                                labelText={timeLabel}
                                timeId={timeId}
                                time={values.time}
                                handleChange={e => {
                                    handleChange(e);

                                    // automatically submit the form when all values have an input that are different from their initialized values
                                    if (
                                        isDiff(
                                            {
                                                ...values,
                                                time: e.target.value,
                                            },
                                            initialValues
                                        )
                                    ) {
                                        submitForm();
                                    }
                                }}
                            />
                        )}

                        {/* Mood rating input */}
                        <RatingComponent
                            isMoodForm={true}
                            name="mood"
                            id="mood"
                            timeOfDay={timeOfDay}
                            value={values.mood}
                            handleChange={newValue => {
                                setFieldValue("mood", newValue);
                                // automatically submit the form when all values have an input that are different from their initialized values
                                if (
                                    isDiff(
                                        {
                                            ...values,
                                            mood: newValue,
                                        },
                                        initialValues
                                    )
                                ) {
                                    submitForm();
                                }
                            }}
                        />

                        {/* Tiredness rating input */}
                        <RatingComponent
                            isMoodForm={false}
                            isMiddayTiredness={isMiddayTiredness}
                            name="tiredness"
                            id="tiredness"
                            timeOfDay={timeOfDay}
                            value={values.tiredness}
                            handleChange={newValue => {
                                setFieldValue("mood", newValue);
                                // automatically submit the form when all values have an input that are different from their initialized values
                                if (
                                    isDiff(
                                        {
                                            ...values,
                                            mood: newValue,
                                        },
                                        initialValues
                                    )
                                ) {
                                    submitForm();
                                }
                            }}
                        />
                    </>
                )}
            </Formik>
        </div>
    );
};

export default UserInputForm;
