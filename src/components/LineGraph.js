import React, {useEffect, useState} from 'react';
import numeral from 'numeral';
import './LineGraph.css';
import {Chart, Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import {getChartData} from "../actions/chart";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: true,
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

const buildChartData = (data) => {
    const chartData = [];
    const deathData = [];

    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data['cases'][date] - lastDataPoint,
            };
            if (date !== 'undefined')
                chartData.push(newDataPoint);
        }
        lastDataPoint = data['cases'][date];
    }
    return chartData;
};

function LineGraph({casesType}) {
    const [data, setData] = useState({});

    useEffect(() => {

        (async () => {
            const response = await getChartData(30);
            setData(buildChartData(response));
        })();

    }, [casesType]);

    console.log(data);

    return (
        <div>
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
                                label: "Cases"
                            },

                        ],
                    }}
                />
            )}
        </div>
    );
}

export default LineGraph;