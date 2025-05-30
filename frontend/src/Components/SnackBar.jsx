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

export default function SnackBar({state, setter, text}) {
   const {currentTheme } = React.useContext(ThemeContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setter(false);
  };

  const action = (
        <div sx={{width: '100%', height: '100%', background: 'none'}}>
    <React.Fragment>


    </React.Fragment>
          </div>
  );

  return (
    <div style={{background: currentTheme.palette.sec , width: '90%', maxWidth: '300px', height: 'fit-content', transition: '0.3s ease-in-out',
    position: 'fixed',  margin: 'auto', left: 0, right: 0, zIndex: 150, 
    alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', fontWeight: 400, fontSize: '1em', color: 'rgb(50,50,50)',
    transition: '0.3s ease-in-out', alignContent: 'center',
    display: state?.visible ? 'flex' : 'none' , 
    top: state?.open ? '25px' : '-50px',
    }}>
      <div style={{position:'relative', width: '100%', gap: '5px', height: '100%', padding: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>

  <CheckCircleOutlineIcon sx={{color: 'white'}}></CheckCircleOutlineIcon>
<p style={{color: 'white', fontWeight: 600 }}>
  {text}</p>
   
<IconButton
sx={{
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto',
  right: '5px'
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