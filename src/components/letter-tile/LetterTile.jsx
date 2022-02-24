import React from 'react';
import './styles.css'
import { motion } from "framer-motion"

function LetterTile({ letter, colorstate }) {

    // console.log("colorstate..................")
    // console.log(colorstate);

    let colorClass = "";

    colorstate === 'y' ? colorClass = 'bg-keyPresent border-keyPresent text-white' : (colorstate === 'b' ? colorClass = 'bg-keyAbsent border-keyAbsent text-white' : colorClass = 'bg-keyCorrect border-keyCorrect text-white');

    if (colorstate === undefined) {
        colorClass = 'bg-black-500';
    }

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.2, duration: 1.5, type: 'tween'}} className={`tile-box error ${colorClass}`} transition-colors duration-500>
            <motion.div initial={{opacity:0, x: -25}} animate={{opacity:1, x: 0}} transition={{delay: 0.2, duration: 1.5, type: 'tween'}} className={`keytile text-4xl font-bold dark:text-white ${colorClass}`}>{letter && letter.toUpperCase()}</motion.div>
        </motion.div>

    )
}

export default LetterTile;