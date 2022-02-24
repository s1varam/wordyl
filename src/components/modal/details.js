import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Details(props) {

    return (
        <>
            {<div className="bg-slate-200 dark:bg-black dark:text-white bg-opacity-40 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 text-sm select-none">
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-md text-center w-10/12 xl:w-96 flex flex-col justify-center items-center">
                    
                    <div>Made with <FontAwesomeIcon icon={faHeart} className="inline ml-1 mr-1 w-3 h-3 text-red-500" /> using React and TailwindCSS.</div>
                    <FontAwesomeIcon icon={faGithub} className="mt-4 p-2 w-8 h-8 text-black dark:text-white" onClick={() => props.showGithub()}/>
                    <button class="px-3 py-1 rounded-md text-xs border-keyAbsent border-solid border mt-4 self-center" onClick={() => props.close()}>CLOSE</button>
                </div>
            </div>}
        </>
    )
}