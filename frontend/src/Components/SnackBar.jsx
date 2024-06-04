import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SnackBar({state, setter}) {
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
    <div style={{background: 'whitesmoke', width: '270px', height: 'fit-content', transition: '0.3s ease-in-out',
    position: 'fixed', top: '25px', margin: 'auto', left: 0, right: 0, zIndex: 10, padding: '10px',
    alignItems: 'center', justifyContent: 'space-between', borderRadius: '5px', fontWeight: 400, fontSize: '0.9em', color: 'rgb(50,50,50)',
    display: state ? 'flex' : 'none', 
    }}>
<p>Deletion Scheduled</p>
<IconButton
        size="small"
        onClick={handleClose}>
        <CloseIcon fontSize="small"     
          sx={{
            color: 'rgb(50,50,50)'
      }} />
      </IconButton>

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