import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import styled from "styled-components";
import { getAverages } from "../utils/getAverages";

import { getDataFromDateRange } from "../actions/bwActions";
import { formatDateForInput } from "../utils/formatDateForInput";

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

const TestGraph = ({
    // user,
    graphDatesArray,
    getDataFromDateRange, // need to destructure for useEffect dependency array
}) => {
    const [dateLabels, setDateLabels] = useState([]);
    const [amountOfSleepArray, setAmountOfSleepArray] = useState([]);
    const [moodAndRestObj, setMoodAndRestObj] = useState({
        sleepHours: amountOfSleepArray,
        mood: [],
        restfulness: [],
    });

    // const [today, setToday] = useState(new Date());
    const [startingDate, setStartingDate] = useState(() => {
        const today = new Date();
        let sevenDaysAgo = new Date(today.setDate(today.getDate() - 6));

        // convert to YYYY-MM-DD string
        sevenDaysAgo = sevenDaysAgo.toLocaleDateString().replace(/\//g, "-");

        // to handle different options for single digit months and days
        if (sevenDaysAgo[1] === "-" && sevenDaysAgo[3] === "-") {
            // if 7 days from current day is formatted like 3-1-2020 (M-D-YYYY)
            // want to add a 0 before the day num @ sevenDaysAgo[2] and shift everything from index 2 over 1
            sevenDaysAgo = `${sevenDaysAgo.slice(0, 2)}0${sevenDaysAgo.slice(
                2,
                sevenDaysAgo.length
            )}`;
        } else if (sevenDaysAgo[2] === "-" && sevenDaysAgo[4] === "-") {
            // if 7 days from current day is formatted like 12-1-2020 (MM-D-YYYY)
            // want to add a 0 before the day num @ sevenDaysAgo[3] and shift everything from index 3 over 1
            sevenDaysAgo = `${sevenDaysAgo.slice(0, 3)}0${sevenDaysAgo.slice(
                3,
                sevenDaysAgo.length
            )}`;
        }

        // if month is only a single digit, add a zero in front
        if (sevenDaysAgo[1] === "-") {
            sevenDaysAgo = `0${sevenDaysAgo}`;
        }

        // convert to YYYY-MM-DD format
        sevenDaysAgo = `${sevenDaysAgo.slice(
            6,
            sevenDaysAgo.length
        )}-${sevenDaysAgo.slice(0, 5)}`;

        // want graph to start with data a week ago from today
        return sevenDaysAgo;
    });

    const chartProps = {
        data: {
            labels: [...dateLabels],
            datasets: [
                {
                    data: amountOfSleepArray,
                    label: "This Week",
                    moodAndRest: moodAndRestObj,
                    borderColor: "#3e95cd",
                    fill: false,
                    lineTension: 0,
                    radius: 10,
                    hoverRadius: 15,
                    pointHoverBackgroundColor: "yellow",
                    datalabels: {
                        textStrokeColor: "black",
                        textStrokeWidth: 1,
                        color: "black",
                        font: {
                            size: 16,
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
                            suggestedMax: 12,
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
                        return `line1\nline2\n${value}`;
                        // eq. return ['line1', 'line2', value]
                    },
                    label: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];

                        const WeekLabel = `Hours slept: ${
                            thisDataset.data[Number(tooltipItem.index)]
                        }`;

                        return WeekLabel;
                    },
                    afterLabel: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];
                        const rest =
                            thisDataset.moodAndRest.restfulness[
                                Number(tooltipItem.index)
                            ];
                        const mood =
                            thisDataset.moodAndRest.mood[
                                Number(tooltipItem.index)
                            ];

                        const stringo = `Tiredness: ${rest} | Mood: ${mood}`;

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

    useEffect(() => {
        const getDates = startDate => {
            getDataFromDateRange(startDate);
        };

        console.log("startingDate in useEffect: ", startingDate);
        console.log(
            "formatDateForInput(startingDate) in Graph: ",
            formatDateForInput(startingDate)
        );

        getDates(formatDateForInput(startingDate));
    }, [startingDate]);

    useEffect(() => {
        const sleepArray = graphDatesArray.map(day => day.totalTimeInBed);
        // const avgRestArray = graphDatesArray.map(day => {
        //     let morning = day.wakeUp.tiredness;
        //     let midday = day.wakeUp.tiredness;
        //     let bedtime = day.wakeUp.tiredness;

        //     return (morning + midday + bedtime) / 3;
        // });
        // const avgMoodArray = graphDatesArray.map(day => {
        //     let morning = day.wakeUp.mood;
        //     let midday = day.wakeUp.mood;
        //     let bedtime = day.wakeUp.mood;

        //     return (morning + midday + bedtime) / 3;
        // });

        setAmountOfSleepArray(sleepArray);

        const graphDateLabels = graphDatesArray.map(day => day.date);

        setDateLabels(graphDateLabels);
    }, [graphDatesArray]);

    useEffect(() => {
        const moodAndRest = {
            sleepHours: amountOfSleepArray,
            mood: [],
            restfulness: [],
        };

        moodAndRest.mood = getAverages(graphDatesArray).averageMood;

        moodAndRest.restfulness = getAverages(graphDatesArray).averageTiredness;

        setMoodAndRestObj(moodAndRest);
    }, [graphDatesArray, amountOfSleepArray]);

    return (
        <>
            <ChartContainer className="chartCanvas">
                <DateInputContainer>
                    <DateLabel htmlFor="graphDate">Starting date:</DateLabel>
                    <DateInput
                        id="graphDate"
                        type="date"
                        name="startingDate"
                        value={formatDateForInput(startingDate)}
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
