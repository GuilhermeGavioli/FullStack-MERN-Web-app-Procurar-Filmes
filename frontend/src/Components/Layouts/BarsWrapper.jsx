import TopBar from './TopBar';
import BottomBar from './BottomBar';
import { Outlet } from "react-router-dom";
import { theme } from '../../theme';

export default function BarsWrapper () {
  return (
    <>
      <TopBar />

      <div style={{minHeight: '100%',height: 'fit-content', backgroundColor: theme.palette.dark, width: '100%',
 
paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px'
}}>
  
      <Outlet />
</div>
      <BottomBar />
    </>
  )
};