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
    align-items: ${props => props.isWakeUp && "flex-start"};
    align-items: ${props => props.isBedtime && "flex-end"};
    padding-left: ${props => (props.isWakeUp ? "5px" : "0")};
    padding-right: ${props => (props.isBedtime ? "5px" : "0")};
    padding-bottom: 10px;
    background: gray;
    position: absolute;
    bottom: ${props => (props.isMidday ? "-153px" : "0")};
    left: ${props => (props.isWakeUp ? "-165px" : "calc((100vw / 2) - 100px)")};
    left: ${props => props.isBedtime && "unset"};
    right: ${props => (props.isBedtime ? "-165px" : null)};
    border-top-right-radius: ${props =>
        props.isWakeUp ? "50px 100px" : "unset"};
    border-top-right-radius: ${props => props.isMidday && "100px 45px"};
    border-bottom-right-radius: ${props =>
        props.isWakeUp ? "50px 100px" : "unset"};
    border-top-left-radius: ${props =>
        props.isBedtime ? "50px 100px" : "unset"};
    border-top-left-radius: ${props => props.isMidday && "100px 45px"};
    border-bottom-left-radius: ${props =>
        props.isBedtime ? "50px 100px" : "unset"};
`;

const Heading = styled.h2`
    margin: ${props => props.isMidday && "45px 0 10px"};
`;

const IconContainer = styled(motion.div)`
    box-sizing: border-box;
    height: 2.5rem;
    font-size: 2.5rem;
    z-index: 5;
    position: absolute;
    right: ${props => (props.isWakeUp ? "0" : "unset")};
    left: ${props => (props.isBedtime ? "0" : "unset")};
    top: ${props => (props.isMidday ? "5px" : "unset")};
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
    isMidday,
    isBedtime,
    icon: Icon,
    animateX,
    animateY,
    tapFunc,
}) => {
    const handleSubmit = values => {
        const timeAsDate = new Date(values.time); // convert `time` to Date object for POST request

        console.log("values in handleSubmit: ", values);
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
            isMidday={isMidday}
            animate={{
                x: animateX ? animateX : 0,
                y: animateY ? animateY : 0,
                zIndex: animateX || animateY ? 10 : 0,
            }}
        >
            <Heading isMidday={isMidday}>{heading}</Heading>
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
                isMidday={isMidday}
                isBedtime={isBedtime}
                onTap={tapFunc}
            >
                <Icon />
            </IconContainer>
        </FormContainer>
    );
};

export default IconTab;
