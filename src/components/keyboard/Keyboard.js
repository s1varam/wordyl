import React from 'react';
import './styles.css';
import { keyboardTiles } from '../../constants/keyboardtiles';

export default function Keyboard({ state, handleKeyPress }) {

    return (
        // <div className="keyboard-rows">
        //     {keyboardTiles.map((keyboardRows, i) => {
        //         return <div className="row" key={i}>
        //             {
        //                 keyboardRows.map((key, keyIndex) => {
        //                     return <button
        //                         key={keyIndex}
        //                         className={`${gameState && gameState.correctCharArray.includes(key) ? "key-correct" :
        //                             (gameState && gameState.presentCharArray.includes(key) ? "key-present" :
        //                                 gameState && gameState.absentCharArray.includes(key) ? "key-absent" : "")
        //                             }`}
        //                         onClick={() => { handleKeyPress(key) }}

        //                     >{key}</button>
        //                 })
        //             }
        //         </div>
        //     })}
        // </div>

        <div>
            {keyboardTiles.map((row, item) => {
                return <div className="flex justify-center" key={item}>
                {row.map((char, i) => {
                    return <button 
                                className={`key-tile font-bold rounded ${state && state.correctArray && state.correctArray.includes(char) ? "bg-keyCorrect p-2 m-1 text-lg" : (state && state.presentArray && state.presentArray.includes(char) ? "bg-keyPresent p-2 m-1 text-lg" : (state && state.absentArray && state.absentArray.includes(char) ? "bg-keyAbsent p-2 m-1 text-lg" : "bg-keyboardBg p-2 m-1 text-lg"))}`} 
                                onClick={() => handleKeyPress(char)}
                                key={char}
                            >
                        {char.toUpperCase()}
                    </button>
                })}
                </div>
            })}
        </div>

    )
}