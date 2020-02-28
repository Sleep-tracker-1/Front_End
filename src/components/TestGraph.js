import React from "react";
import { Line } from "react-chartjs-2";

function TestGraph() {
    const chartProps = {
        data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            datasets: [
                {
                    data: [7, 12, 6, 5, 8, 9, 9],
                    label: "Week 1",
                    value: "zillo",
                    borderColor: "#3e95cd",
                    fill: false,
                    lineTension: 0,
                    radius: 6,
                    hoverRadius: 12,
                },
                {
                    data: [1, 2, 3, 4, 5, 6, 7],
                    label: "Week 2",
                    borderColor: "#8e5ea2",
                    fill: false,
                },
                {
                    data: [1, 2, 3, 4, 5, 6, 7],
                    label: "Week 3",
                    borderColor: "#3cba9f",
                    fill: false,
                },
                {
                    data: [1, 2, 3, 4, 5, 6, 7],
                    label: "Week 4",
                    borderColor: "#e8c3b9",
                    fill: false,
                },
                {
                    data: [1, 2, 3, 4, 5, 6, 7],
                    label: "Week 5",
                    borderColor: "#c45850",
                    fill: false,
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: "Hours Slept",
            },
        },
    };
    const chartReference = React.createRef();
    return (
        <Line
            ref={chartReference}
            data={chartProps.data}
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
        />
    );
}

export default TestGraph;
