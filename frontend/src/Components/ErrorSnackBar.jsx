import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from './Contexts/AuthContext';
import { useContext } from 'react';
import { RatingsContext } from './Screen/MovieScreen';
import { theme } from '../theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ThemeContext } from './Contexts/ThemeContext';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorSnackBar({text}) {
   const {currentTheme } = React.useContext(ThemeContext)
   const {authErrorMessage,hideErrorMessage } = React.useContext(AuthContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideErrorMessage()
  }

  const action = (
        <div sx={{width: '100%', height: '100%', background: 'none'}}>
    <React.Fragment>


    </React.Fragment>
          </div>
  );

  return (
    <div style={{background: currentTheme.palette.pink , width: '90%', maxWidth: '230px', height: 'fit-content', transition: '0.3s ease-in-out',
    position: 'fixed', top: '25px', right: '10px', zIndex: 15, 
    alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', fontWeight: 400, fontSize: '1em', color: 'rgb(50,50,50)',
    display: authErrorMessage.display ? 'flex' : 'none' ,
    opacity: authErrorMessage.opacity ? '100%' : '0%',
    transition: '1.2s ease-in-out', alignContent: 'center'
    }}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position:'relative', width: '100%', height: '100%', padding: '8px 12px 8px 16px', gap: '7px'}}>

  <ErrorOutlineIcon sx={{color: 'white'}}></ErrorOutlineIcon>
<p style={{padding: 0, margin: 0, color: 'white', }}>
  {text}</p>
   
<IconButton
sx={{
    position: 'absolute',
    top: 0,
    right: 0
}}
        size="small"
        onClick={handleClose}>
        <CloseIcon fontSize="small"     
          sx={{
       
            color: 'white'
      }} />
      </IconButton>
    
      </div>

      <Snackbar

        action={action}
        sx={{
          marginTop: '35px',
            background: 'none',

          }}
      />
    </div>
  );
}