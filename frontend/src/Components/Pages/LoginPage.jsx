import React from 'react'
import GoogleButonComp  from '../GoogleButton';
import Stack from '@mui/material/Stack';
import  { AuthContext } from '../Contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';


export default function LoginPage() {
    
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
      const {authErrorMessage,hideErrorMessage } = useContext(AuthContext)

    useEffect(()=>{
      hideErrorMessage()
    }, [])

  return (


        <div style={{background: currentTheme.palette.darker, width: '100vw', height: '100vh' , 
    display: 'flex', 
    alignItems: 'center',
       
    justifyContent: 'center'}}>
      {/* <img src="https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg" alt="" 
      style={{
        width: '100%',
        height: '100%',
        filter: 'brightness(30%)',
        position: 'absolute'
      }}
       /> */}

          <GoogleButonComp></GoogleButonComp>

     
        </div>

    

  )
}




