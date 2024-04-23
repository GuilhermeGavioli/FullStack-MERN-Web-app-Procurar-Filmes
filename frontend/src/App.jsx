import './App.css';
import { useEffect, useState } from 'react';

import { lightTheme, darkTheme } from './theme'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import MenuAppBar from './Components/AppBar';

import { createContext } from 'react';
import Cookies from 'js-cookie';



export const ThemeContext = createContext();
export const AuthContext = createContext();

function App() {
  
  const navigator = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)

  function toggleThemeHandler(){
    setIsDarkMode(!isDarkMode)
    // Cookies.set('theme', isDarkMode, {expires: 1})
  }

  function logout(){

    Cookies.remove('token')
    setAuth({
      isAuth: false,
      token: null,
      user: {
        name: null,
        image: null
    }
    })
    navigator('/login')
  }

  const [auth, setAuth] = useState({
    isAuth: false,
    token: null,
    user: {
      name: null,
      image: null
    }
  })

  useEffect(()=>{
    const preftheme = Cookies.get('theme')
    console.log(preftheme)
    if (preftheme){
      setIsDarkMode(true)    
      } else {
      setIsDarkMode(false)
    }
  }, [])
  
  
  




  
  const theme = isDarkMode ? darkTheme : lightTheme


//   code: "4/0AeaYSHBcbFw0zFsJ08Q8n40NPWEjFIU1gyHOixPVymjOndZbEKp2pmmKJuip1OtsBkl1xA", scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email", authuser: "0", prompt: "consent" }
// authuser: "0"
// code: "4/0AeaYSHBcbFw0zFsJ08Q8n40NPWEjFIU1gyHOixPVymjOndZbEKp2pmmKJuip1OtsBkl1xA"
// prompt: "consent"
// scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"

  return (

  <AuthContext.Provider value={{auth, setAuth, logout}}>
        <ThemeContext.Provider value={{theme, toggleThemeHandler}}>
          <MenuAppBar></MenuAppBar>
  
              <Routes>
                <Route path="/"       element={ <MainPage /> }></Route>
                <Route path="/login"  element={ <LoginPage /> }></Route>
              </Routes>
   
          </ThemeContext.Provider>
      </AuthContext.Provider>

      
  );


}



export default App;
