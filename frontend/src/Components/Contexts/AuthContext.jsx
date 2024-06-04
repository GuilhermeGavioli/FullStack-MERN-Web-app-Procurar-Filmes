import { createContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export default function AuthContextProvider({children}){
     const navigator = useNavigate()
     
    const [showRefreshScreen, setShowRefreshScreen] = useState(false)

    const [userLoading, setUserLoading] = useState(true)
    const [loggingOutLoading, setLoggingOutLoading] = useState(false)
    const [user, setUser] = useState({name: null, email: null, picture: null})

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
      } else if (pathname == '/profile/me'){
        setIconInitialState(3)
      }
  
    }, [page])
  

    function goTo(p){
      setPage(p)
      navigator(p)
    }

    useEffect(() => {
        console.log('RUNNING AUTH')
        const getMyUserInfo = async () => {
          const res = await fetch('http://localhost:3001/auth/user/getinfo', {
            headers: {
              'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          })
          if (res.status == 200) {
            const userdata = await res.json()
            setUser(userdata)
          } else {
            console.log('error')
          }
          setUserLoading(false)
        }
        getMyUserInfo()
      }, [])


      return (
        <AuthContext.Provider value={{user, userLoading, setUserLoading, logout, loggingOutLoading, iconInitialState, goTo}}>
            {children}
        </AuthContext.Provider>
      )
}