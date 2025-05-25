import { createContext, useEffect, useState } from 'react';
import { theme, theme2, theme3 } from '../../theme';

export const ThemeContext = createContext();

function ThemeContextProvider ({ children }) {
    const [currentTheme, setCurrentTheme] = useState(theme3) // 1, 2 ou 3
    const [currentThemeN, setCurrentThemeN] = useState(3) // 1, 2 ou 3

    useEffect(()=>{
        const ls_theme = localStorage.getItem('theme')
        if (ls_theme == 1){
            setCurrentTheme(theme)
            setCurrentThemeN(1)
        } else if (ls_theme == 2){
            setCurrentTheme(theme2)
            setCurrentThemeN(2)
        } else {
            localStorage.setItem('theme', 3)
            setCurrentTheme(theme3)
            setCurrentThemeN(3)
        }
    }, [theme])

    function changeTheme(n){
        localStorage.setItem('theme', n)
        setCurrentThemeN(n)
        if (n == 1) {
            setCurrentTheme(theme)
        } else if (n == 2){
            setCurrentTheme(theme2)
        } else {
            setCurrentTheme(theme3)
        }
    }

    return(
       <ThemeContext.Provider value={{currentTheme, changeTheme, currentThemeN}}>
            {children}
          </ThemeContext.Provider>
    )
}

export default ThemeContextProvider