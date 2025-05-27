import * as React from 'react';
import { useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { FilterContext } from './Pages/SearchPage';
import { ThemeContext } from './Contexts/ThemeContext';

const PinkSwitchMUI = styled(Switch)(({currentTheme, theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: currentTheme.palette.sec,
      '&:hover': {
        backgroundColor: currentTheme.palette.lighter,
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: currentTheme.palette.sec
    },
  }));

  

export default function PinkSwitch({state, setter}) {
  const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)
  return (
    <div >

    <PinkSwitchMUI currentTheme={currentTheme}  checked={state} onChange={() => {setter(!state)}} />
    </div>
  )
}