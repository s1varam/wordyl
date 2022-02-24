import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.render(
    <ThemeProvider><App /></ThemeProvider>,
    document.getElementById('root'))
