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
import Header from '../header/Header'
import Modal from '../modal/Info'
import Details from '../modal/details'
import cogoToast from 'cogo-toast';
import { motion } from "framer-motion"


export default function GameBoard() {

    const solution_word = "small"

    const { width, height } = useWindowDimensions();

    const [gameState, setGameState] = useState(JSON.parse(localStorage.getItem('game-progress')));

    useEffect(function () {
        if (!gameState) {
            let newGameState = {
                guessWords: [],
                guessColors: [],
                rowIndex: 0,
                gameStatus: "",
                presentArray: [],
                correctArray: [],
                absentArray: [],
                word: "",
                guessesChart: [{
                    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
                }]
            }
            setGameState(newGameState);
            localStorage.setItem('game-progress', JSON.stringify(newGameState));
        }
    }, [])

    // const [gameState, setGameState] = useState({
    //     guessWords: [],
    //     guessColors: [],
    //     rowIndex: 0,
    //     gameStatus: "",
    //     presentArray: [],
    //     correctArray: [],
    //     absentArray: [],
    //     word: "",
    // })

    const [showInfo, setShowInfo] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    function openInfo() {
        setShowInfo(true);
    }

    function closeInfo() {
        setShowInfo(false);
    }

    function openDetails() {
        setShowDetails(true);
    }

    function closeDetails() {
        setShowDetails(false);
    }

    function openGithub(){
        window.open('https://github.com/s1varam/wordl');
    }


    // const [word, setWord] = useState("")

    function handleKeyPress(char) {
        // alert(char);
        debugger;
        if (char === "enter") {

            if (gameState.gameStatus === "WON") {
                return;
            }

            if (gameState.rowIndex === 6) {
                return;
            }

            if (gameState.word.length === 5) {
                validate(gameState.word);
            } else {
                cogoToast.info('not enough characters', {
                    position: 'top-center'
                });
                // alert("not enough characters")
                return
            }
        } else if (char === "⌫") {
            if (gameState.gameStatus === "WON") {
                return;
            }

            let newWord = gameState.word.slice(0, gameState.word.length - 1)
            enterCurrentText(newWord)
            return
        }

        if (gameState.word.length >= 5) {
            return;
        } else {
            let wordTest = ""
            // setGameState(function (prev) {
            debugger
            if (gameState.word === "") {
                wordTest = char;
            } else {
                wordTest = gameState.word + char
            }

            // console.log(word);
            enterCurrentText(wordTest)
            // setGameState(function(prev){
            //     return {
            //         guessWords : word
            //     }
            // })
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
            "word": word
        }

        setGameState(newGameState);
        // localStorage.setItem("game-progress", JSON.stringify(newGameState));
    }


    function validate(word) {

        if (gameState.word === solution_word) {

            let sol_word = solution_word;
            let count = gameState.rowIndex + 1;

            switch (count) {
                case 1: cogoToast.info('Mindblowing :o', {
                    position: 'top-center'
                });
                    break;
                case 2: cogoToast.info('Too good!', {
                    position: 'top-center'
                });
                    break;
                case 3: cogoToast.info('Impressive!', {
                    position: 'top-center'
                });
                    break;
                case 4: cogoToast.info('Splendid!', {
                    position: 'top-center'
                });
                    break;
                case 5: cogoToast.info('Good!', {
                    position: 'top-center'
                });
                    break;
                case 6: cogoToast.info('Phewww...', {
                    position: 'top-center'
                });
                    break;
                default: cogoToast.info('Good!', {
                    position: 'top-center'
                });
                    break;
            }

            let colors = '';
            for (let i = 0; i < gameState.word.length; i++) {
                debugger
                if (gameState.word[i] === sol_word[i]) {
                    colors += 'g'
                } else if (sol_word.includes(gameState.word[i])) {
                    sol_word = sol_word.replace(gameState.word[i], '0')
                    colors += 'y'
                } else {
                    colors += 'b'
                }
            }

            
            let newGameState = {
                ...gameState,
                guessColors: [...gameState.guessColors, colors],
                gameStatus: "WON",
                guessesChart: {
                    ...gameState.guessesChart,
                    [gameState.rowIndex] : gameState.guessesChart[0][gameState.rowIndex+1]+1
                }
            }


            debugger
            setGameState(newGameState);
            localStorage.setItem("game-progress", JSON.stringify(newGameState));

            // setGameState(function (prev) {
            //     return {
            //         ...prev,
            //         guessColors: [...prev.guessColors, colors],
            //         gameStatus: "WON"
            //     }
            // })

            // alert("success");
        } else if (allWords.includes(gameState.word)) {
            // } else if (true) {

            let sol_word = solution_word;

            // let colors = '';
            // for (let i = 0; i < gameState.word.length; i++) {
            //     debugger
            //     if (gameState.word[i] === sol_word[i]) {
            //         colors += 'g'
            //     } else if (sol_word.includes(gameState.word[i])) {

            //         let sol_freq = 0;
            //         let word_freq = 0;

            //         for (let j = 0; j < sol_word.length; j++) {
            //             if (sol_word[j] === gameState.word[i]) {
            //                 sol_freq += 1;
            //             }
            //         }

            //         let pos_array = []
            //         for (let k = i; k < gameState.word.length; k++) {
            //             if (gameState.word[k] === gameState.word[i]) {
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
            //         //         if (sol_word[x] === gameState.word[i]) {
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
            //                 if (gameState.word[pos_array[itr]] === sol_word[pos_array[itr]]) {
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
            //                 if(gameState.word[z] === gameState.word[i]){
            //                     append = 'b'
            //                     proceed = false;
            //                     break;
            //                 }
            //             }


            //             if (proceed && gameState.word[i] === sol_word[i]) {
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
            //         //     if(sol_word[x] === gameState.word[i]){
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
            //         // for(let x=i; x<=gameState.word.length;x++){
            //         //     for(let y=i;y<sol_word.length;y++){
            //         //         if(gameState.word[x]===sol_word[y]){
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

            //         console.log(`-------${gameState.word[i]}----${sol_freq}---${word_freq}---`)

            //         // sol_word = sol_word.replace(sol_word[i], '0')
            //         // colors += 'y'
            //     } else {
            //         colors += 'b'
            //     }

            let result = assess(sol_word, gameState.word);
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


            let count = gameState.rowIndex;
            let newGameState = {
                ...gameState,
                guessColors: [...gameState.guessColors, colors],
                correctArray: [...gameState.correctArray, ...corrArray],
                presentArray: [...gameState.presentArray, ...presArray],
                absentArray: [...gameState.absentArray, ...absArray],
                rowIndex: count + 1,
                word: ""
            }

            setGameState(newGameState);
            localStorage.setItem("game-progress", JSON.stringify(newGameState));

            if (newGameState.rowIndex === 6) {
                cogoToast.info('better luck next time :/', {
                    position: 'top-center'
                });
            }

            debugger
            // setGameState(function (prev) {

            //     return {
            //         ...prev,
            //         guessColors: [...prev.guessColors, colors],
            //         correctArray: [...prev.correctArray, ...corrArray],
            //         presentArray: [...prev.presentArray, ...presArray],
            //         absentArray: [...prev.absentArray, ...absArray],
            //         rowIndex: count + 1,
            //         word: ""
            //     }
            // })

            // setGameState(function (prev) {
            //     let count = prev.rowIndex;
            //     return {
            //         ...prev,
            //         rowIndex: count + 1
            //     }
            // })
            // setGameState(function (prev) {
            //     return {
            //         ...prev,
            //         word: ""
            //     }
            // })
            // localStorage.setItem("game-progress", JSON.stringify(gameState));
        } else {
            cogoToast.info('not a valid word', {
                position: 'top-center'
            });
            // alert("not a valid word");
        }
    }




    // useEffect(function(){
    //     enterCurrentText(word)
    // }, [word]);

    // useEffect(() => {
    //     console.log(gameState.word);
    //     enterCurrentText(gameState.word);
    // }, [gameState.word]);



    console.log("state......");
    console.log(gameState);

    return (
        <motion.div className="select-none dark:bg-black h-full transition-colors duration-500" >
            {showInfo && <Modal close={closeInfo} />}
            {showDetails && <Details close={closeDetails} showGithub={openGithub}/>}
            <Header className="header" showInfo={openInfo} showDetails={openDetails}/>
            {gameState && (gameState.gameStatus) && (gameState.gameStatus === "WON") && <Confetti
                width={width}
                height={height}
                numberOfPieces={1000}
                recycle={false}
            />}
            <div className='flex flex-col justify-around items-center flex-container xl:mt-4'>

                <div className='flex-col xl:mb-4 xl:mt-6'>
                    {
                        [0, 1, 2, 3, 4, 5].map((row, item) => {
                            return <div className='flex gap-2 mt-2'>{[0, 1, 2, 3, 4].map((column, i) => {
                                return <motion.div className='border border-solid border-black dark:border-white'>
                                    <LetterTile className="" letter={gameState && gameState.guessWords[row] && gameState.guessWords[row][column]} colorstate={gameState && gameState.guessColors[row] && gameState.guessColors[row][column]} />
                                </motion.div>
                            })}
                            </div>
                        })
                    }
                </div>
                <Keyboard state={gameState} handleKeyPress={handleKeyPress} />

            </div>
        </motion.div>


    )
}


