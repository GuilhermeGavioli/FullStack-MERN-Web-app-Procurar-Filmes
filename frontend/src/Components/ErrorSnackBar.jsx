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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
    <div style={{background: currentTheme.palette.sec , width: 'fit-content', maxWidth: '250px', height: 'fit-content',
    position: 'fixed', top: '20px', right: 0, left:0, margin: 'auto', zIndex: 15, 
     borderRadius: '5px', fontWeight: 400, fontSize: '1em',
    display: authErrorMessage.display ? 'flex' : 'none' ,
    opacity: authErrorMessage.opacity ? '100%' : '0%',
    transition: '1.2s ease-in-out', justifyContent: 'center', alignItems: 'center',
    }}>
    
      <div style={{position:'relative', width: '100%', gap: '5px', height: '100%', padding: '20px 25px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>

 <WarningAmberIcon sx={{color: 'white',marginRight: '12px'}}/>
<p style={{ color: 'white',padding: 0, margin: 0,fontWeight: 400, }}>
  {text}</p>
      </div>
   
{/* <IconButton
sx={{
    position: 'absolute',
    top: 0,
    right: 0
}}
        size="small"
        onClick={handleClose}>
        <CloseIcon fontSize="small"     
          sx={{
       
            color: currentTheme.palette.contra
      }} />
      </IconButton> */}
    
      

      {/* <Snackbar

        action={action}
        sx={{
          marginTop: '35px',
            background: 'none',

          }}
      /> */}
    </div>
  );
}