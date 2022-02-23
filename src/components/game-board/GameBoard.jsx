import React, { useState, useEffect } from 'react';
import LetterTile from '../letter-tile/LetterTile';
import { wordList } from '../../constants/wordlist'
import './styles.css'
import Keyboard from '../keyboard/Keyboard'
import { allWords } from '../../constants/wordlist'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Confetti from 'react-confetti'
import assess from "compare-words";

export default function GameBoard() {

    const solution_word = "small"

    const { width, height } = useWindowDimensions();

    const [gameState, setGameState] = useState({
        guessWords: [],
        guessColors: [],
        rowIndex: 0,
        gameStatus: "",
        presentArray: [],
        correctArray: [],
        absentArray: [],
    })

    const [word, setWord] = useState("")

    function handleKeyPress(char) {
        // alert(char);
        debugger;
        if (char === "enter") {

            if (gameState.gameStatus === "WON") {
                return;
            }

            if (word.length === 5) {
                validate(word);
            } else {
                alert("not enough characters")
                return
            }
        } else if (char === "⌫") {
            if (gameState.gameStatus === "WON") {
                return;
            }
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
            // } else if (true) {

            let sol_word = solution_word;

            // let colors = '';
            // for (let i = 0; i < word.length; i++) {
            //     debugger
            //     if (word[i] === sol_word[i]) {
            //         colors += 'g'
            //     } else if (sol_word.includes(word[i])) {

            //         let sol_freq = 0;
            //         let word_freq = 0;

            //         for (let j = 0; j < sol_word.length; j++) {
            //             if (sol_word[j] === word[i]) {
            //                 sol_freq += 1;
            //             }
            //         }

            //         let pos_array = []
            //         for (let k = i; k < word.length; k++) {
            //             if (word[k] === word[i]) {
            //                 word_freq += 1;
            //                 pos_array.push(k)
            //             }
            //         }

            //         console.log("-----------posarray------------");
            //         console.log(pos_array);

            //         debugger

            //         // if (word_freq >= sol_freq) {
            //         //     let append = ''
            //         //     for (let x = i; x < sol_word.length; x++) {
            //         //         if (sol_word[x] === word[i]) {
            //         //             append = 'y';
            //         //             break;
            //         //         } else {
            //         //             append = 'b';
            //         //         }
            //         //     }

            //         //     colors += append;
            //         // } else {
            //         //     colors += 'b'
            //         // }

            //         if (word_freq > sol_freq) {
            //             let append = ''
            //             let itr = 0
            //             for (let x = i; x < pos_array.length + i; x++) {
            //                 if (word[pos_array[itr]] === sol_word[pos_array[itr]]) {
            //                     append = 'b'
            //                     break;
            //                 } else {
            //                     append = 'y'
            //                 }
            //                 itr+=1;
            //             }
            //             colors += append;
            //         } else if (word_freq === sol_freq) {

            //             let append = '';
            //             let proceed = true;

            //             for(let z=0;z<i;z++){
            //                 if(word[z] === word[i]){
            //                     append = 'b'
            //                     proceed = false;
            //                     break;
            //                 }
            //             }


            //             if (proceed && word[i] === sol_word[i]) {
            //                 append = 'g'
            //             } else if(proceed){
            //                 append = 'y'
            //             }
            //             colors += append;
            //         } else if (word_freq < sol_freq) {
            //             colors += 'y';
            //         }

            //         console.log(`i----${i}-----color${colors}`)


            //         // let append = ''
            //         // for(let x=i;x<sol_word.length;x++){
            //         //     if(sol_word[x] === word[i]){
            //         //         append = 'y';
            //         //         break;
            //         //     }else{
            //         //         append = 'b';
            //         //     }
            //         // }

            //         // colors +=append;

            //         // if(sol_freq >= word_freq){
            //         //     colors += 'y'
            //         // }else{
            //         //     colors += 'b'
            //         // }

            //         // debugger
            //         // let flag= 0 ;
            //         // for(let x=i; x<=word.length;x++){
            //         //     for(let y=i;y<sol_word.length;y++){
            //         //         if(word[x]===sol_word[y]){
            //         //             colors += 'y';
            //         //             flag = 1;
            //         //             break;
            //         //         }else{
            //         //             colors += 'b'
            //         //         }
            //         //     }

            //         //     if(flag===1){
            //         //         break;
            //         //     }
            //         // }

            //         console.log(`-------${word[i]}----${sol_freq}---${word_freq}---`)

            //         // sol_word = sol_word.replace(sol_word[i], '0')
            //         // colors += 'y'
            //     } else {
            //         colors += 'b'
            //     }

            let result = assess(sol_word, word);
            console.log(result);

            let colors = "";

            let corrArray = [], presArray = [], absArray = [];

            for (let i = 0; i < result.length; i++) {
                if (result[i][1] === "correct") {
                    colors += 'g';
                    corrArray.push(result[i][0]);
                } else if (result[i][1] === "present") {
                    colors += 'y';
                    presArray.push(result[i][0]);
                } else if (result[i][1] === "absent") {
                    colors += 'b';
                    absArray.push(result[i][0])
                }
            }



            setGameState(function (prev) {
                return {
                    ...prev,
                    guessColors: [...prev.guessColors, colors],
                    correctArray: [...prev.correctArray, ...corrArray],
                    presentArray: [...prev.presentArray, ...presArray],
                    absentArray: [...prev.absentArray, ...absArray],
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
        <>
            {gameState.gameStatus === "WON" && <Confetti
                width={width}
                height={height}
                numberOfPieces={1000}
                recycle={false}
            />}
            <div className='flex flex-col justify-around items-center h-game'>

                <div className='flex-col'>
                    {
                        [0, 1, 2, 3, 4, 5].map((row, item) => {
                            return <div className='flex gap-2 mt-2'>{[0, 1, 2, 3, 4].map((column, i) => {
                                return <div className='box-tile'>
                                    <LetterTile className="" letter={gameState && gameState.guessWords[row] && gameState.guessWords[row][column]} colorstate={gameState && gameState.guessColors[row] && gameState.guessColors[row][column]} />
                                </div>
                            })}
                            </div>
                        })
                    }
                </div>
                <Keyboard state={gameState} handleKeyPress={handleKeyPress} />

            </div>
        </>


    )
}

