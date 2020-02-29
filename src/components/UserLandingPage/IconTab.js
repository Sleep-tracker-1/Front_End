import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik } from "formik";

import RatingComponent from "./RatingComponent";

const TimeForm = ({ timeId, time, handleChange }) => {
    return (
        <>
            <label htmlFor={timeId}>Wake up time</label>
            <input
                id={timeId}
                name={timeId}
                value={time}
                onChange={handleChange}
            />
        </>
    );
};

const IconTab = ({
    initialValue,
    timeId,
    moodId,
    tirednessId,
    // handleChange,
}) => {
    const [inputValue, setInputValue] = useState(initialValue);

    // const handleChange = e => {
    //     setInputValue(e.target.value);
    // };

    return (
        <Formik
            initialValues={{
                time: "",
                mood: 0, // will be 1, 2, or 3
                tiredness: 0, // will be 1, 2, or 3
            }}
        >
            {({ values, handleChange, setFieldValue }) => (
                <>
                    {/* don't need time input for midday ratings */}
                    {initialValue && (
                        <TimeForm
                            timeId={timeId}
                            time={values.time}
                            handleChange={handleChange}
                        />
                    )}

                    {/* Mood rating input */}
                    <RatingComponent
                        isMoodForm={true}
                        name="mood"
                        id="mood"
                        value={values.mood}
                        handleChange={newValue => {
                            console.log("here");
                            console.log("newValue: ", newValue);
                            setFieldValue("mood", newValue);
                        }}
                        ratingId={moodId}
                    />

                    {/* Tiredness rating input */}
                    <RatingComponent
                        isMoodForm={false}
                        name="tiredness"
                        id="tiredness"
                        value={values.tiredness}
                        handleChange={newValue =>
                            setFieldValue("tiredness", newValue)
                        }
                        ratingId={tirednessId}
                    />
                </>
            )}
        </Formik>
    );
};

export default IconTab;
