import { createContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorSnackBar from '../ErrorSnackBar'
import { Button, CircularProgress,Typography } from "@mui/material";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

export const AuthContext = createContext()

export default function AuthContextProvider({children}){

    const {currentTheme} = useContext(ThemeContext)

     const navigator = useNavigate()

    const [userLoading, setUserLoading] = useState(true)
    const [loggingOutLoading, setLoggingOutLoading] = useState(false)
    const [user, setUser] = useState({name: null, email: null, picture: null})
    const [auth, setAuth] = useState(false)
    const [authRetry, setAuthRetry] = useState(false)
    const [authErrorMessage, setAuthErrorMessage] = useState({display: false, opacity: false})
    
    const location = useLocation()
    const [loginButtonActive, setLoginButtonActive] = useState(true)


    function showErrorMessage(){
      setAuthErrorMessage({opacity: false, display: true})
      setTimeout(() => {
        setAuthErrorMessage({display: true, opacity: true})
      }, 200);
      setTimeout(() => {
        hideErrorMessage()
      }, 2200);
    }

  async function loginWithEmail(email, password){
    setLoginButtonActive(false)
  const res = await fetch('https://procurarfilmes.xyz/auth/email', {
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
  }
     
      }

      function hideErrorMessageImediatly(){
         setAuthErrorMessage({opacity: false, display: false})
      }

    function hideErrorMessage(){
        setAuthErrorMessage({opacity: false, display: true})
          setTimeout(() => {
            setAuthErrorMessage({display: false, opacity: false})
          }, 1300);
      }

    function logout(){
      setLoggingOutLoading(true)
      localStorage.removeItem('access_token')
      setTimeout(() => {
        navigator('/login')
      }, 400);
    }

      const getMyUserInfo = async () => {
        const res = await fetch('https://procurarfilmes.xyz/auth/user/getinfo', {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        if (res.status == 200) {
          const userdata = await res.json()
          console.log(userdata)
          console.log('200')
          setUserLoading(false)
          setUser(userdata)
          setAuth(true)
          setAuthRetry(false)
        } else if (res.status == 403 && location.pathname != '/login' ){ // not auth
          showErrorMessage()
          setUserLoading(false)
          setAuth(false)
          setAuthRetry(false)
        } else { // provide retry option
          setAuthRetry(true)
          setUserLoading(false)
          setAuth(false)
          
        }
       }

    useEffect(() => {
        console.log('auth context use effect' +  location.pathname)

     
          
          const token = localStorage.getItem('access_token')
          console.log(token)
          if (!token && location.pathname != '/login') {
             setUserLoading(false)
                       showErrorMessage()
                       setAuth(false)
                       return
                      } else{
                        try{
                          if (location.pathname != '/login') {
                            getMyUserInfo()
                          } else {
                                      setUserLoading(false)
          setAuth(false)
          setAuthRetry(false)
                          }
        } catch(err){
          //retry
          if (location.pathname != '/login'){
            showErrorMessage()
          }

            console.log('CATCHINNG')
            setUserLoading(false)
            setAuth(false)
        }
                      }
      }, [])

      function retryAuth(){
        
        setUserLoading(true)
        setAuthRetry(false)
    
          const token = localStorage.getItem('access_token')
          if (!token) {
             setUserLoading(false)
                       showErrorMessage()
                       setAuth(false)
                       return
                      } else{
                        try{
                          getMyUserInfo()
                        } catch(err){
                          //retry
                          console.log(err)
                          showErrorMessage()
                          setUserLoading(false)
                          setAuth(false)
                        }
                      }
                 
    }

      return (
        <AuthContext.Provider value={{loginButtonActive, auth, authErrorMessage, user, userLoading, logout, loggingOutLoading, loginWithEmail, hideErrorMessageImediatly, hideErrorMessage}}>
          {/* <div style={{position: 'fixed', top: 0, right: 0, zIndex: 15}}>aaa</div> */}
          {
            userLoading &&
         <div style={{width: '100%', height: '100%', background: currentTheme.palette.dark, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                
                 <CircularProgress size={40} sx={{animationDuration: '0.3s', color: currentTheme.palette.sec}} />
  
         </div>        
          }

        {
          !userLoading && !authRetry &&
          <>
<ErrorSnackBar text='Faça Login para acessar o counteúdo.'/>
{children}
</>
        }


{  !userLoading && authRetry &&
  <div style={{width: '100%', height: '100%', background: currentTheme.palette.dark, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

              
                  <Typography sx={{
    color: currentTheme.palette.contra,
    fontWeight: 600,
    fontSize: '1.4em'
  }}>Erro</Typography>
                  <Typography sx={{
    color: currentTheme.palette.contra,
    fontWeight: 300,
    fontSize: '1.1em',
    textAlign: 'center',
        marginTop: '5px',
    marginBottom: '20px',
    maxWidth: '250px'
  }}>Ocorreu um erro durante a Autenticação ou verificação do seu Token. Aguarde e tente novamente.</Typography>
                <Button onClick={retryAuth} variant="text" sx={{color: currentTheme.palette.sec}}>Tentar Novamente</Button>
                </div>
                </div>}


        </AuthContext.Provider>
      )
}