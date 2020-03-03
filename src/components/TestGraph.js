import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";
import Login from "./Login";

function TestGraph() {
    const apiResponseArray = [6, 5, 9, 12, 8, 5, 10];
    const moodAndRestObj = {
        sleepHours: apiResponseArray,
        mood: 8,
        restfulness: 10,
    }; //We should probably use state here as well
    //We need to get our data from the server, but these are our stand-in values
    const [currentWeek, setCurrentWeek] = useState(apiResponseArray);
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
                    data: currentWeek,
                    label: "This Week",
                    moodAndRest: moodAndRestObj,
                    borderColor: "#3e95cd",
                    fill: false,
                    lineTension: 0,
                    radius: 15,
                    hoverRadius: 30,
                    onClick: console.log("billz"),
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
            responsive: true,
            aspectRatio: 1,
            legend: {
                onClick: e => e.stopPropagation(),
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            suggestedMax: 18,
                            beginAtZero: true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Hours Slept",
                            fontSize: 30,
                        },
                    },
                ],
            },
            plugins: {
                // Change options for ALL labels of THIS CHART
            },

            title: {
                display: true,
                text: "Sleep Quality Tracker",
                fontSize: 40,
            },
            tooltips: {
                titleFontSize: 12,
                bodyFontSize: 20,
                bodySpacing: 14,
                bodyAlign: "center",
                caretPadding: 10,
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

//                         const WeekLabel =
//                             "Hours slept: " +
//                             thisDataset.data[Number(tooltipItem.index)];

                        return WeekLabel;
                    },
                    afterLabel: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];
                        const rest = thisDataset.moodAndRest.restfulness;
                        const mood = thisDataset.moodAndRest.restfulness;

//                         const stringo = `Rest: ${rest} - Mood: ${mood}`;

                        return stringo;
                    },
                },
                footerFontStyle: "normal",
            },
        },
    };
    const chartReference = React.createRef();
    const ChartContainer = styled.div``;
    const suggestedSleepHours = "9";
    useEffect(() => {}, []);
    return (
        <ChartContainer>
            <Line
                ref={chartReference}
                data={chartProps.data}
                options={chartProps.options}
            />
            <button
                onClick={e => {
                    setCurrentWeek([3, 3, 3, 3]);
                }}
            >
                PRESS HERE TO CHANGE THE DATES!
            </button>
            <h3>
                Your Recommended Sleep Hours:{" "}
                <h2>{suggestedSleepHours}hrs/night</h2>
            </h3>

            <form>
                <label htmlFor>
                    Hours Slept:
                    <input
                        type="number"
                        name="name"
                        id="nameInput"
                        min="1"
                        max="17"
                    />
                </label>
                <label>
                    Restfulness:
                    <input
                        type="number"
                        name="email"
                        id="passwordInput"
                        min="1"
                        max="3"
                    />
                </label>
                <label>
                    Mood:
                    <input type="number" name="email" id="passwordInput" />
                </label>

                <button onSubmit={e => {}}>Add Entry</button>
            </form>

            <Login />
        </ChartContainer>
    );
}

// export default TestGraph;
