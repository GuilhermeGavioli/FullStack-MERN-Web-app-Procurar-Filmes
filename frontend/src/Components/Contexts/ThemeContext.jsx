import { createContext, useEffect, useState } from 'react';
import { theme, theme2, theme3 } from '../../theme';

export const ThemeContext = createContext();

function ThemeContextProvider ({ children }) {
    const [currentTheme, setCurrentTheme] = useState(theme3) // 1, 2 ou 3
    const [currentThemeN, setCurrentThemeN] = useState(3) // 1, 2 ou 3

        const [isDarkMode, setIsDarkMode] = useState(true)
        function changeDarkMode(mode){
            if (mode == 'l'){
                currentTheme.palette.contra = 'rgb(15,15,15)'
                currentTheme.palette.darker = 'rgb(75, 75, 75)'
                currentTheme.palette.dark = 'rgb(255,255,255)'
                currentTheme.palette.mid = 'rgb(215, 215, 215)'
                currentTheme.palette.light = 'rgb(232, 232, 232)'
                currentTheme.palette.lighter = 'rgb(38, 18, 18)'
                localStorage.setItem('thememode', 'light')
                setIsDarkMode(false)
            } else if (mode == 'd'){
                currentTheme.palette.contra = 'rgb(255,255,255)'
                currentTheme.palette.darker = 'rgb(20,20, 20)'
                currentTheme.palette.dark = 'rgb(23,22,28)'
                currentTheme.palette.mid = 'rgb(35,35,35)'
                currentTheme.palette.light = 'rgb(40,45,45)'
                currentTheme.palette.lighter = 'rgb(55,50,55)' 
                localStorage.setItem('thememode', 'dark')
                setIsDarkMode(true)
            }
        }

    useEffect(()=>{
        const themeMode = localStorage.getItem('thememode')
        if (themeMode && themeMode == 'light'){
            changeDarkMode('l')
        }

        const ls_theme = localStorage.getItem('theme')
        if (ls_theme == 1){
            currentTheme.palette.sec = 'rgb(255,47,47)'
            // setCurrentTheme(theme)
            setCurrentThemeN(1)
            localStorage.setItem('theme', 1)
        } else if (ls_theme == 2){
            // setCurrentTheme(theme2)
            currentTheme.palette.sec = 'rgb(255, 251, 27)'
            setCurrentThemeN(2)
            localStorage.setItem('theme', 2)
        } else if (ls_theme == 4){
            // setCurrentTheme(theme2)
            currentTheme.palette.sec = 'rgb(141, 1, 255)'
            setCurrentThemeN(4)
            localStorage.setItem('theme', 4)
        } else if (ls_theme == 5){
            // setCurrentTheme(theme2)
            currentTheme.palette.sec = 'rgb(252, 116, 5)'
            setCurrentThemeN(5)
            localStorage.setItem('theme', 5)
        } else {
            localStorage.setItem('theme', 3)
            currentTheme.palette.sec = 'rgb(47, 255, 227)'
            // setCurrentTheme(theme3)
            setCurrentThemeN(3)
        }
    }, [theme])

    function changeTheme(n){
        localStorage.setItem('theme', n)
        setCurrentThemeN(n)
        if (n == 1) {
            currentTheme.palette.sec = 'rgb(255,47,47)'
            // setCurrentTheme(theme)
        } else if (n == 2){
                currentTheme.palette.sec = 'rgb(255, 251, 27)'
            // setCurrentTheme(theme2)
        } else if (n == 4){
                currentTheme.palette.sec = 'rgb(141, 1, 255)'
            // setCurrentTheme(theme2)
        } else if (n == 5){
                currentTheme.palette.sec = 'rgb(252, 116, 5)'
            // setCurrentTheme(theme2)
        } else {
                  currentTheme.palette.sec = 'rgb(47, 255, 227)'
            // setCurrentTheme(theme3)
        }
    }

    return(
       <ThemeContext.Provider value={{currentTheme, changeTheme, currentThemeN, changeDarkMode, isDarkMode}}>
            {children}
          </ThemeContext.Provider>
    )
}

export default ThemeContextProvider