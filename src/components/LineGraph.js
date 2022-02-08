import React, {useEffect, useState} from 'react';
import numeral from 'numeral';
import './LineGraph.css';
import {Chart, Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import {getChartData} from "../actions/chart";

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            gridLines: {
                display: false,
            },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                    return numeral(value).format("0a");
                },
            },
        },
        x: {
            title: "time",
            time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
            }
        }
    },
    elements: {
        point: {
            radius: 1,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
};

const buildChartData = (data, casesType) => {
    const chartData = [];

    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            if (date !== 'undefined')
                chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineGraph({casesType}) {
    const [data, setData] = useState({});

    useEffect(() => {

        (async () => {
            const response = await getChartData(30);
            setData(buildChartData(response, casesType));
        })();

    }, [casesType]);

    return (

        <div className="chart__container">
            {data?.length > 0 && (
                <Line
                    type='line'
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#FFBF00",
                                data: data,
                                label: "Cases",
                                fill: true,
                            },

                        ],
                    }}
                />
            )}
            {data.length <= 0 && <h2>Unavailable</h2>}
        </div>
    );
}

export default LineGraph;