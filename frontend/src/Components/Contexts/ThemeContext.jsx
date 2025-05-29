import { createContext, useEffect, useState } from 'react';
import { theme } from '../../theme';

export const ThemeContext = createContext();

function ThemeContextProvider ({ children }) {
    const [currentTheme, setCurrentTheme] = useState(theme) // 1, 2 ou 3
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
                currentTheme.palette.bars = 'rgb(240, 240, 240)' //mid
                currentTheme.palette.bg = 'rgb(255, 255, 255)' //dark
                currentTheme.palette.font_color = 'rgb(180, 180, 180)'
                currentTheme.palette.darker_font_color = 'rgb(100, 100, 100)'
                currentTheme.palette.genre_bg = 'rgb(245, 245, 245)' //mid
                currentTheme.palette.genre_color = 'rgb(170, 170, 170)' //mid
                currentTheme.palette.bottom_bar_icon = 'rgb(147, 147, 147)' //dark
                currentTheme.palette.movie2_bg = 'rgb(255, 255, 255)' //dark
                currentTheme.palette.loading_1 = 'rgb(240, 240, 240)' //dark
                currentTheme.palette.cover_l = 'linear-gradient(90deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 72%, rgba(0,0,0,0) 100%)' //dark
                currentTheme.palette.cover_r = 'linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.04) 72%, rgba(0,0,0,0.08) 100%)' //dark
                currentTheme.palette.editnomebtn = 'rgb(215, 215, 215)' //dark
                currentTheme.palette.movie2_loading_bg = 'rgb(245,245,245)' //mid
                currentTheme.palette.movie2_loading_band = 'rgb(240,240,240)' //light
                currentTheme.palette.slider_bg = 'rgb(245,245,245)' //light
                localStorage.setItem('thememode', 'light')
                setIsDarkMode(false)
            } else if (mode == 'd'){
                currentTheme.palette.contra = 'rgb(255,255,255)'
                currentTheme.palette.darker = 'rgb(20,20, 20)'
                currentTheme.palette.dark = 'rgb(23,22,28)'
                currentTheme.palette.mid = 'rgb(35,35,35)'
                currentTheme.palette.light = 'rgb(40,45,45)'
                currentTheme.palette.lighter = 'rgb(55,50,55)'
                currentTheme.palette.bars = 'rgb(35,35,35)' //mid
                currentTheme.palette.bg = 'rgb(23,22,28)' //dark
                currentTheme.palette.font_color = 'rgb(255,255,255)'
                currentTheme.palette.darker_font_color = 'rgb(255,255,255)'
                currentTheme.palette.genre_bg = 'rgb(35,35,35)' //mid
                currentTheme.palette.genre_color = 'rgb(255,255,255)' //contra
                currentTheme.palette.bottom_bar_icon = 'rgb(23,22,28)' //dark
                currentTheme.palette.movie2_bg = 'rgb(35,35,35)' //dark
                currentTheme.palette.loading_1 = 'rgb(40,45,45)' //dark
                currentTheme.palette.cover_l = 'linear-gradient(90deg, rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.08) 72%, rgba(0,0,0,0) 100%)' //dark
                currentTheme.palette.cover_r = 'linear-gradient(90deg, rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.08) 72%, rgba(0,0,0,0) 100%)' //dark
                currentTheme.palette.editnomebtn = 'rgb(55,50,55)' //dark
                currentTheme.palette.movie2_loading_bg = 'rgb(35,35,35)' //mid
                currentTheme.palette.movie2_loading_band = 'rgb(40,45,45)' //light
                currentTheme.palette.slider_bg = 'rgb(20,20,20)' //light
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
     
            currentTheme.palette.sec = 'rgb(255, 251, 27)'
            setCurrentThemeN(2)
            localStorage.setItem('theme', 2)
        } else if (ls_theme == 4){
      
            currentTheme.palette.sec = 'rgb(141, 1, 255)'
            setCurrentThemeN(4)
            localStorage.setItem('theme', 4)
        } else if (ls_theme == 5){
           
            currentTheme.palette.sec = 'rgb(252, 116, 5)'
            setCurrentThemeN(5)
            localStorage.setItem('theme', 5)
        } else {
            localStorage.setItem('theme', 3)
            currentTheme.palette.sec = 'rgb(47, 255, 227)'
        
            setCurrentThemeN(3)
        }
    }, [theme])

    function changeTheme(n){
        localStorage.setItem('theme', n)
        setCurrentThemeN(n)
        if (n == 1) {
            currentTheme.palette.sec = 'rgb(255,47,47)'

        } else if (n == 2){
                currentTheme.palette.sec = 'rgb(255, 251, 27)'
       
        } else if (n == 4){
                currentTheme.palette.sec = 'rgb(141, 1, 255)'
       
        } else if (n == 5){
                currentTheme.palette.sec = 'rgb(252, 116, 5)'
         
        } else {
                  currentTheme.palette.sec = 'rgb(47, 255, 227)'
   
        }
    }

    return(
       <ThemeContext.Provider value={{currentTheme, changeTheme, currentThemeN, changeDarkMode, isDarkMode}}>
            {children}
          </ThemeContext.Provider>
    )
}

export default ThemeContextProvider