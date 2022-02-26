import React from 'react';

export default function Modal(props) {

    return (
        <>
            {<div className="bg-slate-200 dark:bg-black dark:text-white bg-opacity-90 dark:bg-opacity-90 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 text-sm select-none z-50">
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-md text-center w-10/12 xl:w-96 flex flex-col justify-center items-start">
                    <h1 className="text-lg mb-4 font-bold text-slate-500 dark:text-white self-center">HOW TO PLAY?</h1>
                    <div className="text-justify">Guess the <span className="font-bold">WORDYL</span> in six tries. Each guess must be a valid five-letter word. Hit the enter button to submit. After each guess, the color of the tiles will change to show how close your guess was to the word.</div>
                    {/* <div>Each guess must be a valid five-letter word. Hit the enter button to submit.</div>
                    <div>After each guess, the color of the tiles will change to show how close your guess was to the word.</div> */}
                    <div className="border-t" />
                    <p className="font-bold mt-2">Examples</p>
                    <div className="flex justify-center items-center gap-2 mt-4 font-bold text-lg">
                        <div className="flex justify-center items-center w-10 h-10 border-keyCorrect bg-keyCorrect border-2 text-white">
                            <div>W</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10  border-keyboardBg border-2">
                            <div>E</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>A</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>R</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>Y</div>
                        </div>
                    </div>
                    <p className="text-justify mt-2">The letter <span className="font-bold">W</span> is in the word and in the correct spot.</p>
                    <div className="flex justify-center items-center gap-2 mt-4 font-bold text-lg">
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2 ">
                            <div>P</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10  border-keyPresent bg-keyPresent border-2 text-white">
                            <div>I</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>L</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>L</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>S</div>
                        </div>
                    </div>
                    <p className="text-justify mt-2">The letter <span className="font-bold">I</span> is in the word but in the wrong spot.</p>
                    <div className="flex justify-center items-center gap-2 mt-4 font-bold text-lg">
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>V</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10  border-keyboardBg border-2">
                            <div>A</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>G</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg bg-keyAbsent border-2 text-white">
                            <div>U</div>
                        </div>
                        <div className="flex justify-center items-center w-10 h-10 border-keyboardBg border-2">
                            <div>E</div>
                        </div>
                    </div>  
                    <p className="text-justify mt-2">The letter <span className="font-bold">U</span> is not in the word in any spot.</p>
                    <div className="border-t" />
                    <p className="mt-6 font-bold">You can play WORDYL unlimited times in a day by hitting the reset button!</p>
                    <button class="px-4 py-2 rounded-md text-md border-keyAbsent text-keyAbsent border-solid border mt-4 self-center" onClick={() => props.close()}>CLOSE</button>
                </div>
            </div>}
        </>
    )
}