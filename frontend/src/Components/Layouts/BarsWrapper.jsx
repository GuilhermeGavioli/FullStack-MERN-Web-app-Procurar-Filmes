import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Outlet, useNavigate } from "react-router-dom";
import { theme } from '../../theme';
import AuthContextProvider from '../Contexts/AuthContext';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function BarsWrapper () {
  const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
const location = useLocation();
const [hide,sethide] = useState(false)

 useEffect(()=>{
  if ( location.pathname == '/results'){
    sethide(true)
  } else {  
    sethide(false)
  }
 })
  return (
    <>
        <AuthContextProvider>
          {hide?
        <></> : 
          <TopBar />
        }
   

      <div style={{minHeight: '100%',height: '100%', backgroundColor: currentTheme.palette.dark, width: '100%',

paddingTop: hide ? 0 : '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px',
  overflowY: 'scroll'
}}>
  
      <Outlet />
</div>


      <BottomBar />
</AuthContextProvider>
    </>
  )
};



