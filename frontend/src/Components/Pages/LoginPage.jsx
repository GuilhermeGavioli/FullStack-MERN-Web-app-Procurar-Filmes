import React from 'react'
import GoogleButonComp  from '../GoogleButton';
import Stack from '@mui/material/Stack';
import  { AuthContext } from '../Contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useState } from 'react';
import { Button } from '@mui/material';
import PinkSwitch from '../PinkSwitch';
import GeneralErrorSnackBar from '../GeneralErrorSnackBar';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

       const navigator = useNavigate()
    
    const {currentTheme, setCurrentTheme, changeDarkMode, isDarkMode} = useContext(ThemeContext)
      const {authErrorMessage,hideErrorMessageImediatly } = useContext(AuthContext)

      const [email, setEmail] = useState("test@test")
      const [password, setPassword] = useState("test123")



          const [loginButtonActive, setLoginButtonActive] = useState(true)

     const [EditErrorErrorMessage, setEditErrorErrorMessage] = React.useState({display: false, opacity: false})
          const [EditErrorErrorMessageText, setEditErrorErrorMessageText] = React.useState(null)

       async function loginWithEmail(){
    setLoginButtonActive(false)
  const res = await fetch('http://localhost:80/auth/email', {
    method: 'POST',
    body: JSON.stringify({email, password}),
     headers: {
            'Content-Type': 'application/json',
        }
    
  }
      )
      setLoginButtonActive(true)
        if (res.status == 200){
    const { access_token } = await res.json()
    localStorage.setItem('access_token', access_token)
    navigator('/')
  } else {
    setEditErrorErrorMessageText('Credenciais Inválidas.')
    showErrorMessage()
  }
     
      }

       

          function showErrorMessage(){
            setEditErrorErrorMessage({opacity: false, display: true})
            setTimeout(() => {
              setEditErrorErrorMessage({display: true, opacity: true})
            }, 200);
            setTimeout(() => {
              hideErrorMessage()
            }, 2200);
          }
          function hideErrorMessage(){
              setEditErrorErrorMessage({opacity: false, display: true})
                setTimeout(() => {
                  setEditErrorErrorMessage({display: false, opacity: false})
                }, 1300);
            }



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

       <p style={{color: currentTheme.palette.darker_font_color, fontSize: '0.7em', 
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
  <Button disabled={!loginButtonActive} onClick={() => loginWithEmail()} 
  sx={{background: currentTheme.palette.sec, width: '100%',
    borderRadius: '10px',
        maxWidth: '300px',
        height: '45px',
        marginTop: '10px',
        fontSize: '1.2em',
    '&:hover': {
           background: currentTheme.palette.sec, 
    },
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


     

<GeneralErrorSnackBar errorMessage={EditErrorErrorMessage} text={EditErrorErrorMessageText}/>

        </div>

    

  )
}




