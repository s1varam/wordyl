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
                return <div>
                {row.map((char, i) => {
                    return <button 
                                className={`${state.correctArray.includes(char) ? "bg-green-500 p-4 m-1" : (state.presentArray.includes(char) ? "bg-yellow-500 p-4 m-1" : (state.absentArray.includes(char) ? "bg-slate-500 p-4 m-1" : "bg-slate-100 p-4 m-1"))}`} 
                                onClick={() => handleKeyPress(char)}
                            >
                        {char.toUpperCase()}
                    </button>
                })}
                </div>
            })}
        </div>

    )
}