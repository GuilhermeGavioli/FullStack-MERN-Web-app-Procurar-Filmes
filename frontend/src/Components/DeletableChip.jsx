import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material';
import { theme } from '../theme';


const StyledDeletableChip = styled(Chip)(() => ({
  fontWeight: 600,
  padding: '0px',
  margin: '0px',
  fontSize: '0.7em',
  '& .MuiSvgIcon-root': {
    background: theme.palette.pink,
    borderRadius: '50%',
    fontSize: '1.4em',
  },
}))


export default function DeletableChip({name, action, click_action}) {

  function fireClickAction(){
    if (click_action) click_action()
  }  

  return (
    <StyledDeletableChip onClick={()=> fireClickAction()} sx={{background: theme.palette.pink_light, color: 'white'}} label={name} onDelete={action} />
  )
}