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
import SettingsPage from './Components/Pages/SettingsPage';
import ThemeContextProvider from './Components/Contexts/ThemeContext';

function App() {
  


  return (



                <ThemeContextProvider>
              <Routes>
                <Route element={<BarsWrapper />}>

    
                  <Route path="/"       element={ <MovieContextProvider><MainPage/></MovieContextProvider> }></Route>
                  <Route path="/mycomments" element={ <MovieContextProvider><AuthContextProvider><MyComments /></AuthContextProvider></MovieContextProvider>}></Route>
                  <Route path="/results"  element={ <MovieContextProvider><SearchPage /></MovieContextProvider> }></Route>
                  <Route path="/profile/me"  element={ <AuthContextProvider><ProfilePage/></AuthContextProvider> }></Route>
                  <Route path="/settings"  element={ <SettingsPage/> }></Route>

                </Route>
                <Route>
                  <Route path="/login"  element={<AuthContextProvider><LoginPage/></AuthContextProvider>}></Route>
                </Route>
              </Routes>
                            </ThemeContextProvider>

 ) 
}


//Snack bar for notification after creating / deleting comment
// dialog for confirming deletion of comment
// https://popfix.onrender.com


export default App;
