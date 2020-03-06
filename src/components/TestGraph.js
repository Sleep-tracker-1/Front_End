import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";

import { getDataFromDateRange } from "../actions/bwActions";
import { formatDate } from "../utils/formatDate";

import "./TestGraph.css";

const ChartContainer = styled.div`
    height: 80%;
`;

const DateInputContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
`;

const DateLabel = styled.label`
    margin-bottom: 0;
`;

const DateInput = styled.input`
    border: solid 1px lightgray;
    border-radius: 8px;
`;

// const BelowGraph = styled.div`
//     text-align: center;
//     margin-top: 10px;
// `;
// const suggestedSleepHours = "9";

const TestGraph = ({ user, graphDatesArray, ...props }) => {
    const apiResponseArray = [6, 5, 9, 12, 8, 5, 10];
    const [amountOfSleepArray, setAmountOfSleepArray] = useState([]);
    const moodAndRestObj = {
        sleepHours: amountOfSleepArray,
        mood: 8,
        restfulness: 10,
    }; //We should probably use state here as well
    //We need to get our data from the server, but these are our stand-in values
    // const [currentWeek, setCurrentWeek] = useState(amountOfSleepArray);

    // const [today, setToday] = useState(new Date());
    const [startingDate, setStartingDate] = useState(() => {
        const today = new Date();
        let sevenDaysAgo = new Date(today.setDate(today.getDate() - 6));

        // convert to YYYY-MM-DD string
        sevenDaysAgo = sevenDaysAgo.toLocaleDateString().replace(/\//g, "-");

        // convert to MM-DD-YYYY format
        sevenDaysAgo = `${sevenDaysAgo.slice(
            5,
            sevenDaysAgo.length
        )}-${sevenDaysAgo.slice(0, 4)}`;

        // want graph to start with data a week ago from today
        return sevenDaysAgo;
    });

    const chartProps = {
        data: {
            labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            datasets: [
                {
                    data: amountOfSleepArray,
                    label: "This Week",
                    moodAndRest: moodAndRestObj,
                    borderColor: "#3e95cd",
                    fill: false,
                    lineTension: 0,
                    radius: 15,
                    hoverRadius: 30,
                    pointHoverBackgroundColor: "yellow",
                    datalabels: {
                        textStrokeColor: "black",
                        textStrokeWidth: 1,
                        color: "black",
                        font: {
                            size: 20,
                        },
                    },
                },
            ],
        },
        options: {
            animation: {
                duration: 0,
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                onClick: e => e.stopPropagation(),
                display: false,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            suggestedMax: 18,
                            beginAtZero: true,
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            min: 9,
                        },
                    },
                ],
            },
            plugins: {
                // Change options for ALL labels of THIS CHART
            },

            title: {
                display: false,
            },
            tooltips: {
                titleFontSize: 10,
                bodyFontSize: 16,
                bodySpacing: 10,
                bodyAlign: "center",
                caretPadding: 6,
                mode: "nearest",
                callbacks: {
                    // Use the footer callback to display the sum of the items showing in the tooltip
                    formatter: function(value) {
                        return "line1\nline2\n" + value;
                        // eq. return ['line1', 'line2', value]
                    },
                    label: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];

                        const WeekLabel =
                            "Hours slept: " +
                            thisDataset.data[Number(tooltipItem.index)];

                        return WeekLabel;
                    },
                    afterLabel: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];
                        const rest = thisDataset.moodAndRest.restfulness;
                        const mood = thisDataset.moodAndRest.restfulness;

                        const stringo = `Rest: ${rest} - Mood: ${mood}`;

                        return stringo;
                    },
                },
                footerFontStyle: "normal",
            },
        },
    };
    const chartReference = React.createRef();

    const handleDateChange = e => {
        setStartingDate(e.target.value);
    };

    const getDates = startDate => {
        props.getDataFromDateRange(startDate);
    };

    // useEffect(() => {
    //     console.log("today: ", today);
    //     // let todayDate = today.setDate(today.getDate());

    //     let todayDate = today.toLocaleDateString().replace(/\//g, "-");

    //     console.log("todayDate: ", todayDate);

    //     setStartingDate(todayDate);
    // }, [today]);

    useEffect(() => {
        getDates(startingDate);
    }, [startingDate]);

    // useEffect(() => {
    //     setCurrentWeek(user.dates);
    // }, [user]);

    useEffect(() => {
        const sleepArray = graphDatesArray.map(day => day.totalTimeInBed);

        setAmountOfSleepArray(sleepArray);
    }, [graphDatesArray]);

    return (
        <>
            <ChartContainer className="chartCanvas">
                {/* <h1 className="title">Sleep Stats For This Week</h1> */}
                <DateInputContainer>
                    <DateLabel htmlFor="graphDate">Starting date:</DateLabel>
                    <DateInput
                        id="graphDate"
                        type="date"
                        name="startingDate"
                        value={formatDate(startingDate)}
                        onChange={e => handleDateChange(e)}
                    />
                </DateInputContainer>

                <div className="actualChart">
                    <Line
                        ref={chartReference}
                        data={chartProps.data}
                        options={chartProps.options}
                    />
                </div>
                {/* <BelowGraph>
                    <h3>
                        Your Recommended Sleep Hours:{" "}
                        <h2>{suggestedSleepHours}hrs/night</h2>
                    </h3>
                </BelowGraph> */}
            </ChartContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        graphDatesArray: state.graphDatesArray,
    };
};

export default connect(mapStateToProps, { getDataFromDateRange })(TestGraph);
