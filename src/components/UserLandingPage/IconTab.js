import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik } from "formik";
import styled from "styled-components";
// import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { isDiff } from "../../utils/isDiff";

import RatingComponent from "./RatingComponent";

const FormContainer = styled(motion.div)`
    width: 200px;
    box-sizing: border-box;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: gray;
    position: absolute;
    bottom: 0;
    left: ${props => (props.isWakeUp ? "0px" : "calc((100vw / 2) - 100px)")};
    left: ${props => props.isBedtime && "unset"};
    right: ${props => (props.isBedtime ? "0" : null)};
    border-top-right-radius: ${props =>
        props.isWakeUp ? "50px 100px" : "unset"};
    border-bottom-right-radius: ${props =>
        props.isWakeUp ? "50px 100px" : "unset"};
    border-top-left-radius: ${props =>
        props.isBedtime ? "50px 100px" : "unset"};
    border-bottom-left-radius: ${props =>
        props.isBedtime ? "50px 100px" : "unset"};
`;

const IconContainer = styled.div`
    box-sizing: border-box;
    font-size: 2.5rem;
    z-index: 5;
    position: absolute;
    right: ${props => (props.isWakeUp ? "0" : "unset")};
`;

const InputTime = styled.input`
    width: 150px;
`;

const TimeInput = ({ labelText, timeId, time, handleChange }) => (
    <>
        <label htmlFor={timeId}>{labelText}</label>
        <InputTime
            type="datetime-local" // returns time as a string with the following format: "2020-02-29T02:00"
            id={timeId}
            name="time"
            value={time}
            onChange={handleChange}
        />
    </>
);

const IconTab = ({
    heading,
    needsTimeInput,
    timeLabel,
    timeId,
    initialValues,
    isWakeUp,
    isBedtime,
    icon: Icon,
}) => {
    const [wakeUpSlide, setWakeUpSlide] = useState(-170);

    console.log("initialValues: ", initialValues);
    const handleSubmit = values => {
        const timeAsDate = new Date(values.time); // convert `time` to Date object for POST request

        console.log("about to do POST request");
        // axiosWithAuth()
        //     .post()
        //     .then(res => {
        //         console.log("Rating POST res.data: ", res.data);
        //     })
        //     .catch(err => alert("Rating POST error: ", err));
        // }
    };

    return (
        <FormContainer
            isWakeUp={isWakeUp}
            isBedtime={isBedtime}
            animate={{ x: wakeUpSlide, initial: false }}
        >
            <h2>{heading}</h2>
            <Formik
                initialValues={{
                    ...initialValues,
                }}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue, submitForm }) => (
                    <>
                        {/* don't need time input for midday ratings */}
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
                            name="tiredness"
                            id="tiredness"
                            value={values.tiredness}
                            handleChange={newValue => {
                                setFieldValue("tiredness", newValue);
                                // automatically submit the form when all values have an input that are different from their initialized values
                                if (
                                    isDiff(
                                        {
                                            ...values,
                                            tiredness: newValue,
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
            <IconContainer
                isWakeUp={isWakeUp}
                onClick={() =>
                    setWakeUpSlide(
                        wakeUpSlide === 0
                            ? wakeUpSlide - 170
                            : wakeUpSlide + 170
                    )
                }
            >
                <Icon />
            </IconContainer>
        </FormContainer>
    );
};

export default IconTab;
