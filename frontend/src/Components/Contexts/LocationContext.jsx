import { createContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LocationContext = createContext()

export default function LocationContextProvider({children}){
    const navigator = useNavigate()
    const location = useLocation()
    const [iconInitialState, setIconInitialState] = useState(null);
    const [page, setPage] = useState(null);
  
    useEffect(() => {
      const pathname = location.pathname;
      console.log(pathname)
      if (pathname == '/'){
        setIconInitialState(() => {return 0})
      } else if (pathname == '/mycomments'){
        setIconInitialState(() => {return 1})
      } else if (pathname == '/results'){
        setIconInitialState(() => {return 2})
      } else if (pathname == '/settings'){
        setIconInitialState(() => {return 3})
      }
    }, [page])
  
    function goTo(p){
      setPage(p)
      navigator(p)
    }

      return (
        <LocationContext.Provider value={{iconInitialState, goTo, setIconInitialState}}>
            {children}
        </LocationContext.Provider>
      )
}