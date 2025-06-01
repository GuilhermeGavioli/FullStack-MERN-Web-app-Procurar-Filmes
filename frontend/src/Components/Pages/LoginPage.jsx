import React from 'react'
import GoogleButonComp  from '../GoogleButton';
import Stack from '@mui/material/Stack';
import  { AuthContext } from '../Contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@mui/material';
import PinkSwitch from '../PinkSwitch';


export default function LoginPage() {
    
    const {currentTheme, setCurrentTheme, changeDarkMode, isDarkMode} = useContext(ThemeContext)
      const {authErrorMessage,hideErrorMessageImediatly, loginWithEmail,loginButtonActive } = useContext(AuthContext)

      const [email, setEmail] = useState("test@test")
      const [password, setPassword] = useState("test123")


    useEffect(()=>{
      hideErrorMessageImediatly()
      setTimeout(() => {
        hideErrorMessageImediatly()
      },200);
    }, [])

  return (


        <div style={{background: currentTheme.palette.dark, width: '100vw', height: '100vh' , 
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',
       
    justifyContent: 'center'}}>


<div style={{
  position: 'absolute', top: '15px', left: '15px',
}}>

       <PinkSwitch style={{
        }} state={isDarkMode} setter={() => changeDarkMode(isDarkMode ? 'l' : 'd')}></PinkSwitch>
        </div>

        <div style={{
  position: 'absolute', bottom: '15px', left: '15px',
}}>

       <p style={{color: currentTheme.palette.darker_font_color, fontSize: '0.8em', 
        opacity: isDarkMode ? '0.4' : '100%'
        }}>Demo App</p>
        </div>

<div style={{display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'column', width: '100%', padding: '15px'}}>

{/* <img src="/Logo.png" style={{width: '25px', height: '25px'}} alt="" /> */}
 {/* <h1 style={{fontSize: '2.2em', fontWeight: 400, color: currentTheme.palette.contra, marginBottom: '15px'}}>Login</h1> */}

 {/* <img style={{width: '30px', height: '30px'}} src="/Logo.png" alt="" /> */}
  <input placeholder='Email' style={{
    outline: 'none', height: '45px', padding: '18px 12px', fontSize: '1.1em',
      border: isDarkMode ? 'none' : '1px solid rgb(225,225,225)',
      background: currentTheme.palette.logininputbg,
      color: currentTheme.palette.logininputclr,
          borderRadius: '10px',
          width: '100%',
          maxWidth: '300px'
  }} 
  value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
  <input placeholder='Senha' style={{
 outline: 'none', height: '45px', padding: '18px 12px', fontSize: '1.1em',
  border: isDarkMode ? 'none' : '1px solid rgb(225,225,225)',
   background: currentTheme.palette.logininputbg,
      color: currentTheme.palette.logininputclr,
          borderRadius: '10px',
           width: '100%',
               maxWidth: '300px'
}}
   value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
  {/* <button >login</button> */}
  <Button disabled={!loginButtonActive} onClick={() => loginWithEmail(email, password)} 
  sx={{background: currentTheme.palette.sec, width: '100%',
    borderRadius: '10px',
        maxWidth: '300px',
        height: '45px',
        marginTop: '10px',
        fontSize: '1.2em',
    '&.Mui-disabled': {
      background: currentTheme.palette.movie2_loading_bg, 
      color: currentTheme.palette.movie2_loading_band
    },
  }} variant="contained">Login</Button>

<GoogleButonComp style={{marginTop: '100px',}}></GoogleButonComp>

</div>
      {/* <img src="https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg" alt="" 
      style={{
        width: '100%',
        height: '100%',
        filter: 'brightness(30%)',
        position: 'absolute'
      }}
       /> */}


     
        </div>

    

  )
}




