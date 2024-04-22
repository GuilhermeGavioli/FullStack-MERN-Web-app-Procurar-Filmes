import './App.css';
import { useState } from 'react';

import { lightTheme, darkTheme } from './theme'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import MenuAppBar from './Components/AppBar';

import { createContext } from 'react';


export const ThemeContext = createContext();
export const AuthContext = createContext();

function App() {
  
  const [isDarkMode, setIsDarkMode] = useState(false)

  function toggleThemeHandler(){
    setIsDarkMode(!isDarkMode)
  }

  const [auth, setAuth] = useState({
    isAuth: false,
    token: null,
    user: {
      name: null,
      image: null
    }
  })


  
  
  




  
  const theme = isDarkMode ? darkTheme : lightTheme


//   code: "4/0AeaYSHBcbFw0zFsJ08Q8n40NPWEjFIU1gyHOixPVymjOndZbEKp2pmmKJuip1OtsBkl1xA", scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email", authuser: "0", prompt: "consent" }
// authuser: "0"
// code: "4/0AeaYSHBcbFw0zFsJ08Q8n40NPWEjFIU1gyHOixPVymjOndZbEKp2pmmKJuip1OtsBkl1xA"
// prompt: "consent"
// scope: "email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"

  return (

  <AuthContext.Provider value={{auth, setAuth}}>
        <ThemeContext.Provider value={{theme, toggleThemeHandler}}>
          <MenuAppBar></MenuAppBar>
          <BrowserRouter>
              <Routes>
                <Route path="/"       element={ <MainPage /> }></Route>
                <Route path="/login"  element={ <LoginPage /> }></Route>
              </Routes>
          </BrowserRouter>
          </ThemeContext.Provider>
      </AuthContext.Provider>

      
  );


}



export default App;
