import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faChartLine, faGear, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default function Header(props) {

    return (
        <>
        <header className="flex items-center justify-between">
            <div>
                <FontAwesomeIcon icon={faCircleInfo} className="flex-none ml-2 p-2 w-5 h-5 text-black" onClick={()=>props.showInfo()}/>
                <FontAwesomeIcon icon={faCircleQuestion} className="flex-none ml-2 p-2 w-5 h-5 text-black" />
            </div>
            <div className="text-xl font-bold">Test</div>
            <div>
                <FontAwesomeIcon icon={faChartLine} className="flex-none ml-2 p-2 w-5 h-5 text-black" />
                <FontAwesomeIcon icon={faGear} className="flex-none ml-2 p-2 w-5 h-5 text-black" />
            </div>
        </header>
        <div className="border-t"/>
        </>
    )
}