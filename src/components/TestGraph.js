import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";
import "./TestGraph.css";

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
    const ChartContainer = styled.div`
        height: 80%;
    `;
    const BelowGraph = styled.div`
        text-align: center;
        margin-top: 10px;
    `;
    const suggestedSleepHours = "9";
    useEffect(() => {}, []);
    return (
        <>
            <ChartContainer className="chartCanvas">
                <h1 className="title">Sleep Stats For This Week</h1>
                <div className="actualChart">
                    <Line
                        ref={chartReference}
                        data={chartProps.data}
                        options={chartProps.options}
                    />
                </div>
                <BelowGraph>
                    <h3>
                        Your Recommended Sleep Hours:{" "}
                        <h2>{suggestedSleepHours}hrs/night</h2>
                    </h3>
                </BelowGraph>
            </ChartContainer>
        </>
    );
}

export default TestGraph;
