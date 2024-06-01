import { createContext } from "react";
import { useState, useEffect } from "react";

export const AuthContext = createContext()

export default function AuthContextProvider({children}){

    const [showRefreshScreen, setShowRefreshScreen] = useState(false)

    const [userLoading, setUserLoading] = useState(true)
    const [user, setUser] = useState({name: null, email: null, picture: null})

    function logout(){

    }

    useEffect(() => {
        const getMyUserInfo = async () => {
          const res = await fetch('http://localhost:3001/auth/user/getinfo', {
            headers: {
              'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          })
          if (res.status == 200) {
            const userdata = await res.json()
            console.log(userdata)

            setUser(userdata)
          } else {
            console.log('error')
          }
          setUserLoading(false)
        }
        getMyUserInfo()
      }, [])


      return (
        <AuthContext.Provider value={{user, userLoading, setUserLoading, logout}}>
            {children}
        </AuthContext.Provider>
      )
}