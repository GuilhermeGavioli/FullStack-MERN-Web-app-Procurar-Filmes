import { useEffect } from 'react';
import {  Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';


import SearchPage from './Components/Pages/SearchPage';

import MyComments from './Components/Pages/MyComments';

import BarsWrapper from './Components/Layouts/BarsWrapper';

import MovieContextProvider from './Components/Contexts/MovieContext';
import ProfilePage from './Components/Pages/ProfilePage';
import AuthContextProvider from './Components/Contexts/AuthContext';

function App() {
  

  // useEffect(() => {
    // console.log('running auth global effect')
    // async function validateToken() {
    //   const access_token = localStorage.getItem('access_token')
    //   if (access_token){
    //     const res = await fetch('http://localhost:3001/access_token/validate', {
    //       headers: {
    //         Authorization: `${access_token}`
    //       }
    //     })
    //     const {token_info} = await res.json()


    //     setAuth({...auth, isAuth: true, token: token_info.access_token, user: {name: token_info.name}})

    //   }
    // }
    // validateToken();

    
  // }, [])


  return (

    //logo
    // https://as1.ftcdn.net/v2/jpg/01/85/89/64/1000_F_185896439_wCIjG0spPZakuNiL34khgrTAEZGIJei5.jpg


              <Routes>
                <Route element={<BarsWrapper />}>
                  <Route path="/"       element={ <MovieContextProvider><MainPage/></MovieContextProvider> }></Route>
                  <Route path="/mycomments"       element={ <MyComments /> }></Route>
                  <Route path="/results"  element={ <MovieContextProvider><SearchPage /></MovieContextProvider> }></Route>
                  <Route path="/profile/me"  element={ <AuthContextProvider><ProfilePage/></AuthContextProvider> }></Route>
                </Route>
                <Route>
                  <Route path="/login"  element={ <LoginPage /> }></Route>
                </Route>
              </Routes>

 ) 
}


//Snack bar for notification after creating / deleting comment
// dialog for confirming deletion of comment

export default App;
