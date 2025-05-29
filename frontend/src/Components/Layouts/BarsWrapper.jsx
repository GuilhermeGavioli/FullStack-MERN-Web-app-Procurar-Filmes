import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Outlet, useNavigate } from "react-router-dom";
import { theme } from '../../theme';
import AuthContextProvider from '../Contexts/AuthContext';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LocationContextProvider from '../Contexts/LocationContext';

export default function BarsWrapper () {
  const {currentTheme} = useContext(ThemeContext)
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
          <LocationContextProvider>
          {hide?
        <></> : 
          <TopBar />
        
        }
   

      <div style={{minHeight: '100%',height: '100%', backgroundColor: currentTheme.palette.bg, width: '100%',

paddingTop: hide ? 0 : '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px',
  overflowY: 'scroll'
}}>

  {/* <div style={{height: '100vh', position: 'fixed', width: '100px',left: 0,top: 0,  zIndex: 5, background: currentTheme.palette.cover_l}}>

  </div>
  <div style={{height: '100vh', position: 'fixed', right: 0, width: '100px',top:0,  zIndex: 5, background: currentTheme.palette.cover_r}}>

  </div> */}
  
      <Outlet />
</div>



      <BottomBar />
</LocationContextProvider>
</AuthContextProvider>
    </>
  )
};



