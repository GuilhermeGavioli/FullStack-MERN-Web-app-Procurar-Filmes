import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material';
import { theme } from '../theme';
import { ThemeContext } from './Contexts/ThemeContext';
import { useContext } from 'react';


const StyledDeletableChip = styled(Chip)((currentTheme) => ({
  fontWeight: 600,
  padding: '0px',
  margin: '0px',
  fontSize: '0.7em',
  '& .MuiSvgIcon-root': {
    background: `${(props) => props.currentTheme.palette.sec}`,
    borderRadius: '50%',
    fontSize: '1.4em',
  },
}))


export default function DeletableChip({name, action, click_action}) {

    const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)

  function fireClickAction(){
    if (click_action) click_action()
  }  

  return (
    <StyledDeletableChip currentTheme={currentTheme} onClick={()=> fireClickAction()} sx={{
      background: currentTheme.palette.sec, color: currentTheme.palette.contra,
      padding: '5px 3px', margin: 0,
      fontSize: '.8em',
      height: 'fit-content',
      color: 'white'
      
    }} label={name} onDelete={action} />
  )
}