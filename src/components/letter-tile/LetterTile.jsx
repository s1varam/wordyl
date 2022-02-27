import React from 'react';
import './styles.css';
import { motion } from "framer-motion";
import 'animate.css';

function LetterTile({ letter, colorstate }) {

    // console.log("colorstate..................")
    // console.log(colorstate);

    let colorClass = "";

    colorstate === 'y' ? colorClass = 'bg-keyPresent border-keyPresent text-white' : (colorstate === 'b' ? colorClass = 'bg-keyAbsent border-keyAbsent text-white' : colorClass = 'bg-keyCorrect border-keyCorrect text-white');

    if (colorstate === undefined) {
        colorClass = 'bg-black-500';
    }

    return (
        <div className={`tile-box w-12 h-12 xl:w-14 flex justify-center items-center flex-wrap xl:h-14 error ${colorClass} animate__pulse animate__animated animate__delay-2s`} transition-colors duration-500>
            <div  className={` keytile text-4xl font-bold dark:text-white ${colorClass}`}>{letter && letter.toUpperCase()}</div>
        </div>

    )
}

export default LetterTile;