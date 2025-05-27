import React from 'react'
import GoogleButonComp  from '../GoogleButton';
import Stack from '@mui/material/Stack';
import  { AuthContext } from '../Contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@mui/material';


export default function LoginPage() {
    
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
      const {authErrorMessage,hideErrorMessageImediatly, loginWithEmail,loginButtonActive } = useContext(AuthContext)

      const [email, setEmail] = useState("test@test")
      const [password, setPassword] = useState("test123")


    useEffect(()=>{
      hideErrorMessageImediatly()
    }, [])

  return (


        <div style={{background: currentTheme.palette.dark, width: '100vw', height: '100vh' , 
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',
       
    justifyContent: 'center'}}>

<div style={{display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'column'}}>
 <h1 style={{fontSize: '2.2em', fontWeight: 400, color: currentTheme.palette.contra, marginBottom: '15px'}}>Login</h1>
 {/* <img style={{width: '30px', height: '30px'}} src="/Logo.png" alt="" /> */}
  <input placeholder='Email' style={{border: 'none', outline: 'none', height: '30px', padding: '12px', fontSize: '1.1em'}} 
  value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
  <input placeholder='Senha' style={{border: 'none', outline: 'none', height: '30px', padding: '12px', fontSize: '1.1em'}}
   value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
  {/* <button >login</button> */}
  <Button disabled={!loginButtonActive} onClick={() => loginWithEmail(email, password)} 
  sx={{background: currentTheme.palette.sec,marginTop: '15px', width: '100%',
    '&.Mui-disabled': {
      backgroundColor: currentTheme.palette.lighter, 
      color: currentTheme.palette.darker
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




