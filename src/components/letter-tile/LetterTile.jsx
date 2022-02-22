import React from 'react';
import './styles.css'

function LetterTile({letter, colorstate}){

    // console.log("colorstate..................")
    // console.log(colorstate);

    let colorClass = "";

    colorstate === 'y' ? colorClass = 'bg-yellow-500 border-yellow-500' : (colorstate === 'b' ? colorClass = 'bg-slate-500 border-slate-500' : colorClass = 'bg-green-500 border-green-500');

    if(colorstate === undefined){
        colorClass ='bg-black-500'; 
    }

    return(
        <div className={`keytile text-5xl font-bold ${colorClass}`}>{letter && letter.toUpperCase()}</div>
    )
}

export default LetterTile;