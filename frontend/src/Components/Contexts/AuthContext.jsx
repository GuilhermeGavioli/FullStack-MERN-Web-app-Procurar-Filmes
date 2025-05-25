import { createContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorSnackBar from '../ErrorSnackBar'

export const AuthContext = createContext()

export default function AuthContextProvider({children}){
     const navigator = useNavigate()
     
    const [showRefreshScreen, setShowRefreshScreen] = useState(false)

    const [userLoading, setUserLoading] = useState(true)
    const [loggingOutLoading, setLoggingOutLoading] = useState(false)
    const [user, setUser] = useState({name: null, email: null, picture: null})
    const [auth, setAuth] = useState(false)
    const [authErrorMessage, setAuthErrorMessage] = useState({display: false, opacity: false})

    function showErrorMessage(){
      setAuthErrorMessage({opacity: false, display: true})
      setTimeout(() => {
        setAuthErrorMessage({display: true, opacity: true})
      }, 200);

      setTimeout(() => {
        hideErrorMessage()
      }, 18198000);
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


    // Navigation
    const location = useLocation();

  
    const [iconInitialState, setIconInitialState] = useState('');
    const [page, setPage] = useState('');
  
    useEffect(() => {
      const pathname = location.pathname;
      if (pathname == '/'){
        setIconInitialState(0)
      } else if (pathname == '/mycomments'){
        setIconInitialState(1)
      } else if (pathname == '/results'){
        setIconInitialState(2)
      } else if (pathname == '/settings'){
        setIconInitialState(3)
      }
  
    }, [page])
  

    function goTo(p){
      setPage(p)
      navigator(p)
    }
    
      const getMyUserInfo = async () => {
        const res = await fetch('http://procurarfilmes.xyz/auth/user/getinfo', {
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
        } else {
          console.log(res.status)
          showErrorMessage()
          setUserLoading(false)
          setAuth(false)
        }
       }

    useEffect(() => {
        
        console.log('RUNNING AUTH')
       
        const token = localStorage.getItem('access_token')
        console.log(token)
        if (!token) {
             setUserLoading(false)
          // navigator('/login')
          return
        } else{
        try{
          getMyUserInfo()
        } catch(err){
          console.log(err)
          showErrorMessage()
                  setUserLoading(false)
                            setAuth(false)
                  }
        }


      
      }, [])


      return (
        <AuthContext.Provider value={{auth, authErrorMessage, user, userLoading, setUserLoading, logout, loggingOutLoading, iconInitialState, hideErrorMessage, goTo}}>
          {/* <div style={{position: 'fixed', top: 0, right: 0, zIndex: 15}}>aaa</div> */}
          <ErrorSnackBar text='Faça Login para acessar o counteúdo.'/>
            {children}
        </AuthContext.Provider>
      )
}