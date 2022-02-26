import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'none',
        },


    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};

const labels = ['1', '2', '3', '4', '5', '6'];


export default function ProgressGraph(props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const x1 = props.data[1] ? props.data[1] : 0
    const x2 = props.data[2] ? props.data[2] : 0
    const x3 = props.data[3] ? props.data[3] : 0
    const x4 = props.data[4] ? props.data[4] : 0
    const x5 = props.data[5] ? props.data[5] : 0
    const x6 = props.data[6] ? props.data[6] : 0

    const data_array = [x1, x2, x3, x4, x5, x6];
    console.log("data...........");
    console.log(data_array);

    const data = {
        labels,
        datasets: [
            {
                label: 'Guess count',
                data: data_array,
                borderColor: '#212121',
                backgroundColor: '#424242',
            },
        ],
    };

    return (
        <>
            {<div className="bg-slate-200 dark:bg-black dark:text-white bg-opacity-90 dark:bg-opacity-90 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 text-sm select-none z-50">
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-md opacity-100 text-center w-10/12 xl:w-96 flex flex-col justify-center items-center">
                    <h4 className="font-bold">STATISTICS</h4>
                    <div className="flex gap-2 mt-2">
                        <div className="flex">
                            <p className="mr-1">Games Played : </p>
                            <p>{props.gamesPlayed}</p>
                        </div>
                        <div className="flex">
                            <p className="mr-1">Win Percentage : </p>
                            <p>{Math.round(props.wins/props.gamesPlayed*100)}</p>
                        </div>
                    </div>
                    <Bar options={options} data={data} className="bar-chart" />
                    <button class="px-3 py-1 rounded-md text-xs border-keyAbsent text-keyAbsent border-solid border mt-4 self-center" onClick={() => props.close()}>CLOSE</button>
                </div>
            </div>}
        </>
    )
}