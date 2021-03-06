import React, { useState, useEffect } from 'react';
import LetterTile from '../letter-tile/LetterTile';
import { wordList } from '../../constants/wordlist'
import './styles.css'
import Keyboard from '../keyboard/Keyboard'
import { fiveLetterWords, sixLetterWords, answerList, getRandomWord } from '../../constants/wordlist'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Confetti from 'react-confetti'
import assess from "compare-words";
import Header from '../header/Header'
import Modal from '../modal/Info'
import Details from '../modal/details'
import cogoToast from 'cogo-toast';
import { motion } from "framer-motion"
import ProgressGraph from '../modal/progressgraph'


export default function GameBoard() {

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
                    
                }],
                solution_word : getRandomWord(0, answerList.length-1),
                gamesPlayed: 0,
                wins: 0,
            }
            setGameState(newGameState);
            localStorage.setItem('game-progress', JSON.stringify(newGameState));
        }
    }, [])

    const [showInfo, setShowInfo] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showProgressGraph, setShowProgressGraph] = useState(false);

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

    function openGraph() {
        setShowProgressGraph(true);
    }

    function closeGraph() {
        setShowProgressGraph(false);
    }

    function openGithub(){
        window.open('https://github.com/s1varam/wordl');
    }

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
        } else if (char === "???") {
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
            debugger
            if (gameState.word === "") {
                wordTest = char;
            } else {
                wordTest = gameState.word + char
            }

            // console.log(word);
            enterCurrentText(wordTest)
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

        if (gameState.word === gameState.solution_word) {

            let sol_word = gameState.solution_word;
            let count = gameState.rowIndex + 1;
            let gamesPlayedCount = gameState.gamesPlayed + 1;
            let winCount = gameState.wins + 1;

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

            let gameStateVal = 0

            if(gameState.guessesChart[gameState.rowIndex+1]){
                gameStateVal = gameState.guessesChart[gameState.rowIndex+1]
            }else{
                gameStateVal = 0
            }
            
            let newGameState = {
                ...gameState,
                guessColors: [...gameState.guessColors, colors],
                gameStatus: "WON",
                gamesPlayed : gamesPlayedCount,
                wins: winCount,
                guessesChart: {
                    ...gameState.guessesChart,
                    [gameState.rowIndex+1] : gameStateVal+1
                }
            }


            debugger
            setGameState(newGameState);
            localStorage.setItem("game-progress", JSON.stringify(newGameState));

            setTimeout(function () {
                setShowProgressGraph(true);
            }, 3500)

            // alert("success");
        } else if (fiveLetterWords.includes(gameState.word)) {
            // } else if (true) {

            let sol_word = gameState.solution_word;
            let result = assess(sol_word, gameState.word);
            // console.log(result);

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
            let gamesPlayedCount = gameState.gamesPlayed;

            let newGameState = {
                ...gameState,
                guessColors: [...gameState.guessColors, colors],
                correctArray: [...gameState.correctArray, ...corrArray],
                presentArray: [...gameState.presentArray, ...presArray],
                absentArray: [...gameState.absentArray, ...absArray],
                rowIndex: count + 1,
                word: "",
                gamesPlayed: (count+1 === 6) ? gamesPlayedCount+1: gamesPlayedCount
            }

            setGameState(newGameState);
            localStorage.setItem("game-progress", JSON.stringify(newGameState));

            if (newGameState.rowIndex === 6) {

                cogoToast.info(` ${sol_word.toUpperCase()}`, {
                    position: 'top-center'
                });
                setTimeout(function () {
                    cogoToast.info(`better luck next time :/`, {
                        position: 'top-center'
                    });
                }, 4500)

                
            }

            debugger
        } else {
            cogoToast.info('not a valid word', {
                position: 'top-center'
            });
            // alert("not a valid word");
        }
    }


    function resetGame(){
        let newGameState = {
            ...gameState,
            guessWords: [],
            guessColors: [],
            rowIndex: 0,
            gameStatus: "",
            presentArray: [],
            correctArray: [],
            absentArray: [],
            word: "",
            solution_word : getRandomWord(0, answerList.length-1)
        }
        setGameState(newGameState);
        localStorage.setItem('game-progress', JSON.stringify(newGameState));
    }

    return (
        <motion.div className="select-none dark:bg-black h-full transition-colors duration-500" >
            {showInfo && <Modal close={closeInfo} />}
            {showDetails && <Details close={closeDetails} showGithub={openGithub}/>}
            {showProgressGraph && <ProgressGraph close={closeGraph} showGraph={openGraph} data={gameState.guessesChart} gamesPlayed={gameState.gamesPlayed} wins={gameState.wins}/>}
            <Header className="header" showInfo={openInfo} showDetails={openDetails} reset={resetGame} showGraph={openGraph}/>
            {gameState && (gameState.gameStatus) && (gameState.gameStatus === "WON") && <Confetti
                width={width}
                height={height}
                numberOfPieces={250}
                recycle={false}
            />}
            <div className='flex flex-col justify-around items-center flex-container xl:mt-4'>

                <div className='flex-col xl:mb-4 xl:mt-6'>
                    {
                        [0, 1, 2, 3, 4, 5].map((row, item) => {
                            return <div className='flex gap-2 mt-2' key={item}>{[0, 1, 2, 3, 4].map((column, i) => {
                                return <motion.div className='border border-solid ' key={i}>
                                    <LetterTile className=""  letter={gameState && gameState.guessWords[row] && gameState.guessWords[row][column]} colorstate={gameState && gameState.guessColors[row] && gameState.guessColors[row][column]} />
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


