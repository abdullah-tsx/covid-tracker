import React from 'react';
import {Chart as ChartJS} from 'chart.js/auto';
import {Chart, Line} from 'react-chartjs-2';


const LineChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'my labels',
                data: [1, 2, 3, 4]
            }
        ],
    }
    return (<Line data={data}/>
    );
};

export default LineChart;