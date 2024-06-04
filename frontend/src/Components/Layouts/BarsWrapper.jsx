import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Outlet } from "react-router-dom";
import { theme } from '../../theme';
import AuthContextProvider from '../Contexts/AuthContext';

export default function BarsWrapper () {
  return (
    <>
        <AuthContextProvider>
          <TopBar />
   

      <div style={{minHeight: '100%',height: '100%', backgroundColor: theme.palette.dark, width: '100%',
paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px',
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



