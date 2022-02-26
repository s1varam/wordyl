import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faChartLine, faMoon, faSun, faCircleQuestion, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../context/ThemeContext'

export default function Header(props) {

    const { theme, setTheme } = React.useContext(ThemeContext);

    return (
        <>
            <header className="flex items-center justify-between dark:bg-black">
                <div>
                    <FontAwesomeIcon icon={faCircleQuestion} className="flex-none ml-2 p-2 w-5 h-5 text-black dark:text-white" onClick={() => props.showInfo()} />
                    <FontAwesomeIcon icon={faArrowRotateRight} className="flex-none ml-2 p-2 w-5 h-5 text-black dark:text-white" onClick={() => props.reset()} />
                    <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="invisible flex-none ml-2 p-2 w-5 h-5 text-black dark:text-white" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                    
                </div>
                <div className="text-xl font-bold dark:text-white">WORDYL</div>
                <div>
                    <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="flex-none ml-2 p-2 w-5 h-5 text-black dark:text-white" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                    <FontAwesomeIcon icon={faChartLine} className="flex-none ml-2 p-2 w-5 h-5 text-black dark:text-white" onClick={() => props.showGraph()} />
                    <FontAwesomeIcon icon={faCircleInfo} className="flex-none ml-2 p-2 w-5 h-5 text-black dark:text-white" onClick={() => props.showDetails()} />
                </div>
            </header>
            <div className="border-t" />
        </>
    )
}