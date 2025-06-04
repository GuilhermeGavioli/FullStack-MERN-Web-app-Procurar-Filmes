import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from './Contexts/AuthContext';
import { useContext } from 'react';

import { theme } from '../theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ThemeContext } from './Contexts/ThemeContext';

export default function SnackBar({type, state, setter, text}) {
   const {currentTheme } = React.useContext(ThemeContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setter(type, text);
  };

  const action = (
        <div sx={{width: '100%', height: '100%', background: 'none'}}>
    <React.Fragment>


    </React.Fragment>
          </div>
  );

  return (
    <div style={{background: currentTheme.palette.sec , width: 'fit-content', maxWidth: '300px', height: 'fit-content', transition: '0.3s ease-in-out',
    position: 'fixed',  margin: 'auto', left: 0, right: 0, zIndex: 25000, 
    alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', fontWeight: 400, fontSize: '1em', color: 'rgb(50,50,50)',
    transition: '0.3s ease-in-out', alignContent: 'center',
    display: state?.visible ? 'flex' : 'none' , 
    top: state?.open ? '25px' : '-100px',
    }}>
      <div style={{position:'relative', width: '100%', gap: '5px', height: '100%', padding: '20px 25px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>

  <CheckCircleOutlineIcon sx={{color: 'white'}}></CheckCircleOutlineIcon>
<p style={{color: 'white', fontWeight: 600 }}>
  {text}</p>
    
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