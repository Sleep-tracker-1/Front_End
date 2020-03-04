import React, { useState } from "react";
import styled from "styled-components";
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Container = styled.div`
    width: 100px;
    height: 100px;
`;

const CircleProgressbar = props => {
    return (
        <>
            {/* value is the % of "progress" that will be filled */}
            {/* want to get this progress value from amount of sleep of the queried date / average amount of sleep */}
            <CircularProgressbarWithChildren
                value={80}
                styles={buildStyles({
                    pathColor: `${props.progressColor}`,
                })}
            >
                {/* <p>{props.amountOfSleep}</p> */}
                <p>7 hours</p>
            </CircularProgressbarWithChildren>
        </>
    );
};

export default CircleProgressbar;
