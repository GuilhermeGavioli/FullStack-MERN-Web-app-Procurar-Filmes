import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material';


const StyledDeletableChip = styled(Chip)(() => ({
  '& .MuiSvgIcon-root': {
    backgroundColor: grey[50],
    borderRadius: '50%'
  },
}))


export default function DeletableChip({name, action, click_action}) {

  function fireClickAction(){
    if (click_action) click_action()
  }  

  return (
    <StyledDeletableChip onClick={()=> fireClickAction()} sx={{background: grey[800], color: 'white'}} label={name} onDelete={action} />
  )
}