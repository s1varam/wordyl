import React, { useState, useEffect } from 'react';
import LetterTile from '../letter-tile/LetterTile';
import { wordList } from '../../constants/wordlist'
import './styles.css'
import Keyboard from '../keyboard/Keyboard'
import { allWords } from '../../constants/wordlist'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

export default function GameBoard() {

    const solution_word = "other"

    const [gameState, setGameState] = useState({
        guessWords: [],
        guessColors: [],
        rowIndex: 0,
        gameStatus : ""
    })

    const [word, setWord] = useState("")

    function handleKeyPress(char) {
        // alert(char);
        debugger;
        if (char === "enter") {

            if(gameState.gameStatus === "WON"){
                return;
            }

            if (word.length === 5) {
                validate(word);
            } else {
                alert("not enough characters")
                return
            }
        } else if (char === "⌫") {
            setWord(function (prev) {
                return prev.slice(0, prev.length - 1)
            })
            return
        }

        if (word.length >= 5) {
            return;
        } else {
            setWord(function (prev) {
                debugger
                if (prev === "") {
                    return char
                } else {
                    return prev + char
                }

            })
            // console.log(word);
            // enterCurrentText(word)
            // setGameState(function(prev){
            //     return {
            //         guessWords : word
            //     }
            // })
        }
    }


    function validate(word) {





        if (word === solution_word) {

            let sol_word = solution_word;

            let colors = '';
            for (let i = 0; i < word.length; i++) {
                debugger
                if (word[i] === sol_word[i]) {
                    colors += 'g'
                } else if (sol_word.includes(word[i])) {
                    sol_word = sol_word.replace(word[i], '0')
                    colors += 'y'
                } else {
                    colors += 'b'
                }
            }

            setGameState(function (prev) {
                return {
                    ...prev,
                    guessColors: [...prev.guessColors, colors],
                    gameStatus: "WON"
                }
            })
            
            // alert("success");
        } else if (allWords.includes(word)) {

            let sol_word = solution_word;

            let colors = '';
            for (let i = 0; i < word.length; i++) {
                debugger
                if (word[i] === sol_word[i]) {
                    colors += 'g'
                } else if (sol_word.includes(word[i])) {

                    let sol_freq = 0;
                    let word_freq = 0;

                    for(let j=0; j< sol_word.length; j++){
                        if(sol_word[j] === word[i]){
                            sol_freq += 1;
                        }
                    }

                    for(let k=0;k<word.length;k++){
                        if(word[k] === word[i]){
                            word_freq += 1;
                        }
                    }   

                    if(sol_freq >= word_freq){
                        colors += 'y'
                    }else{
                        colors += 'b'
                    }

                    console.log(`-------${word[i]}----${sol_freq}---${word_freq}---`)

                    // sol_word = sol_word.replace(sol_word[i], '0')
                    // colors += 'y'
                } else {
                    colors += 'b'
                }
            }

            setGameState(function (prev) {
                return {
                    ...prev,
                    guessColors: [...prev.guessColors, colors]
                }
            })

            setGameState(function (prev) {
                let count = prev.rowIndex;
                return {
                    ...prev,
                    rowIndex: count + 1
                }
            })
            setWord("")
        } else {
            alert("not a valid word");
        }
    }


    function enterCurrentText(word) {
        debugger
        let guessWords = gameState.guessWords;
        let rowIndex = gameState.rowIndex;

        guessWords[rowIndex] = word;

        let newGameState = {
            ...gameState,
            "guessWords": guessWords,
        }

        setGameState(newGameState);
    }

    // useEffect(function(){
    //     enterCurrentText(word)
    // }, [word]);

    useEffect(() => {
        console.log(word);
        enterCurrentText(word);
    }, [word]);



    console.log("state......");
    console.log(gameState);

    return (

        <div className='flex flex-col justify-center'>

            <div className='flex-col'>
                {
                    [0, 1, 2, 3, 4, 5].map((row, item) => {
                        return <div className='flex'>{[0, 1, 2, 3, 4].map((column, i) => {
                            return <LetterTile letter={gameState && gameState.guessWords[row] && gameState.guessWords[row][column]} colorstate={gameState && gameState.guessColors[row] && gameState.guessColors[row][column]} />
                        })}
                        </div>
                    })
                }
            </div>
            <Keyboard handleKeyPress={handleKeyPress} />

        </div>


    )
}

