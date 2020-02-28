import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

function TestGraph() {
    const moodAndRestObj = { mood: 8, restfulness: 10 };
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
                    data: [6, 5, 9, 12, 8, 5, 10],
                    label: "Week 1",
                    moodAndRest: { moodAndRestObj },
                    borderColor: "#3e95cd",
                    fill: false,
                    lineTension: 0,
                    radius: 30,
                    hoverRadius: 70,
                    pointHoverBackgroundColor: "yellow",
                    datalabels: {
                        textStrokeColor: "black",
                        textStrokeWidth: 1,
                        color: "black",
                        font: {
                            size: 30,
                        },
                    },
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            suggestedMax: 18,
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
            legend: {
                padding: 30,
            },
            title: {
                display: true,
                text: "Sleep Quality Tracker",
                fontSize: 40,
            },
            tooltips: {
                titleFontSize: 14,
                bodyFontSize: 24,
                bodySpacing: 20,
                bodyAlign: "center",
                caretPadding: 40,
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
                        const rest =
                            thisDataset.moodAndRest.moodAndRestObj.restfulness;
                        const mood =
                            thisDataset.moodAndRest.moodAndRestObj.restfulness;

                        const stringo = `Rest: ${rest} - Mood: ${mood}`;

                        return stringo;
                    },
                },
                footerFontStyle: "normal",
            },
        },
    };
    const chartReference = React.createRef();
    return (
        <Line
            ref={chartReference}
            data={chartProps.data}
            options={chartProps.options}
        />
    );
}

export default TestGraph;
