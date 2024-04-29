import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import MainPage from './Components/Pages/MainPage';
import TopBar from './Components/TopBar';
import { createContext } from 'react';
import Cookies from 'js-cookie';
import BottomBar from './Components/BottomBar';
import Sidebar from './Components/Sidebar';
import SearchPage from './Components/Pages/SearchPage';

export const AuthContext = createContext();
export const SidebarContext = createContext();

function App() {
  
  const navigator = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    console.log('running auth effect')
  }, [auth])

  // setTimeout(() => {
  //   setIsSidebarOpen(true)
  // }, 4000);

  return (

  <AuthContext.Provider value={{auth, setAuth, logout}} >
  <SidebarContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>
          <Sidebar></Sidebar>
          <TopBar></TopBar>
          <BottomBar></BottomBar>

              <Routes>
                <Route path="/login"  element={ <LoginPage /> }></Route>
                <Route path="/"       element={ <MainPage /> }></Route>
                <Route path="/results"  element={ <SearchPage /> }></Route>
              </Routes>
         
          </SidebarContext.Provider>
      </AuthContext.Provider>
 ) 
}



export default App;
