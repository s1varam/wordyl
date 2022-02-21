import React from 'react';

function LetterTile({letter, colorstate}){

    // console.log("colorstate..................")
    // console.log(colorstate);

    let colorClass = "";

    colorstate === 'y' ? colorClass = 'bg-yellow-500' : (colorstate === 'b' ? colorClass = 'bg-slate-500' : colorClass = 'bg-green-500');

    if(colorstate === undefined){
        colorClass ='bg-black-500'; 
    }

    return(
        <div className={`w-14 h-14 border m-1 ${colorClass}`}>{letter}</div>
    )
}

export default LetterTile;