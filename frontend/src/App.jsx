import { useState, useEffect } from 'react';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';

import { createContext } from 'react';
import Cookies from 'js-cookie';

import SearchPage from './Components/Pages/SearchPage';
import MoviePage from './Components/Pages/MoviePage';
import MyComments from './Components/Pages/MyComments';
import A from './Components/Pages/A';
import BarsWrapper from './Components/Layouts/BarsWrapper';


export const AuthContext = createContext();


function App() {
  
  const navigator = useNavigate()
 

  function logout(){
    Cookies.remove('token')
    setAuth({
      isAuth: false,
      token: null,
    })
    navigator('/login')
  }



  const [auth, setAuth] = useState({
    isAuth: false,
    token: null,
    user: {
      name: null
    }
  })

  useEffect(() => {
    console.log('running auth global effect')
    async function validateToken() {
      const access_token = localStorage.getItem('access_token')
      if (access_token){
        const res = await fetch('http://localhost:3001/access_token/validate', {
          headers: {
            Authorization: `${access_token}`
          }
        })
        const {token_info} = await res.json()


        setAuth({...auth, isAuth: true, token: token_info.access_token, user: {name: token_info.name}})

      }
    }
    validateToken();

    
  }, [])


  return (

    //logo
    // https://as1.ftcdn.net/v2/jpg/01/85/89/64/1000_F_185896439_wCIjG0spPZakuNiL34khgrTAEZGIJei5.jpg
  <AuthContext.Provider value={{auth, setAuth, logout}} >

              <Routes>
                <Route element={<BarsWrapper />}>
                  <Route path="/"       element={ <MainPage /> }></Route>
                  <Route path="/a"  element={ <A /> }></Route>
                  <Route path="/mycomments"       element={ <MyComments /> }></Route>
                </Route>
                <Route>
                  <Route path="/results"  element={ <SearchPage /> }></Route>
                  <Route path="/movie/:id"  element={ <MoviePage /> }></Route>
                  <Route path="/login"  element={ <LoginPage /> }></Route>
                </Route>
              </Routes>


      </AuthContext.Provider>
 ) 
}


//Snack bar for notification after creating / deleting comment
// dialog for conforming deletion of comment

export default App;
