import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";

function TestGraph() {
    const moodAndRestObj = { mood: 8, restfulness: 10 };
    const [currentWeek, setCurrentWeek] = useState([6, 5, 9, 12, 8, 5, 10]);
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

                        const WeekLabel =
                            "Hours slept: " +
                            thisDataset.data[Number(tooltipItem.index)];

                        return WeekLabel;
                    },
                    afterLabel: function(tooltipItem, data) {
                        const thisDataset =
                            data.datasets[Number(tooltipItem.datasetIndex)];
                        console.log(thisDataset);
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
    const ChartContainer = styled.div``;
    const suggestedSleepHours = "9";
    return (
        <ChartContainer>
            <Line
                ref={chartReference}
                data={chartProps.data}
                options={chartProps.options}
            />
            <h3>
                Your Recommended Sleep Hours:{" "}
                <h2>{suggestedSleepHours}hrs/night</h2>
            </h3>
        </ChartContainer>
    );
}

export default TestGraph;
