import * as React from 'react';
import { useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { FilterContext } from './Pages/SearchPage';
import { ThemeContext } from './Contexts/ThemeContext';

const SwitchMUI = styled(Switch)(({currentTheme, theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: currentTheme.palette.sec,
      '&:hover': {

      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: currentTheme.palette.sec
    },
    '& ..MuiSwitch-track': {
      background: 'red',
      backgroundColor: 'red'
    }
  }));

  

export default function MySwitch({state, setter}) {
  const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)
  return (
    <div >

    <SwitchMUI currentTheme={currentTheme}  checked={state} onChange={() => {setter(!state)}} />
    </div>
  )
}