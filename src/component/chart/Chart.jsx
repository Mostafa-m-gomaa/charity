import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BudgetVsPurchasesGraph = ({ budget, purchases , firstName , secName ,obj}) => {
    const data = {
        labels: obj.map((item, index) => `${item.band}`),
        datasets: [
            {
                label: secName,
                data: purchases,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: firstName,
                data: Array(purchases.length).fill(budget),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    };

    return (
        <div>
        
            <Bar data={data} options={options} />
        </div>
    );
};

export default BudgetVsPurchasesGraph;
