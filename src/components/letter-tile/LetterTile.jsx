import React from 'react';
import './styles.css'

function LetterTile({ letter, colorstate }) {

    // console.log("colorstate..................")
    // console.log(colorstate);

    let colorClass = "";

    colorstate === 'y' ? colorClass = 'bg-keyPresent border-keyPresent text-white' : (colorstate === 'b' ? colorClass = 'bg-keyAbsent border-keyAbsent text-white' : colorClass = 'bg-keyCorrect border-keyCorrect text-white');

    if (colorstate === undefined) {
        colorClass = 'bg-black-500';
    }

    return (
        <div className={`tile-box ${colorClass}`}>
            <div className={`keytile text-4xl font-bold ${colorClass}`}>{letter && letter.toUpperCase()}</div>
        </div>

    )
}

export default LetterTile;