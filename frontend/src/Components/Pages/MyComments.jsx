import { Stack, Typography } from "@mui/material"
import Comment from "../Comment"
import { grey } from "@mui/material/colors"
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, Fragment } from "react";

function AlertDialog({openDialog, handleClickOpenDialog, handleCloseDialog}) {
  return (
    <Fragment>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default function MyComments(){
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

    return(

        <div style={{minHeight: '100%',height: 'fit-content', width: '100%', backgroundColor: grey[900],
backgroundColor: '#161616', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none', paddingBottom: '60px', paddingTop: '60px',
}}>

<AlertDialog openDialog={openDialog} handleClickOpenDialog={handleClickOpenDialog} handleCloseDialog={handleCloseDialog}></AlertDialog>

        
        <Stack spacing={1} sx={{padding: '0 10px 0 10px'}}>

        <div style={{width: '100%', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <InsertCommentIcon sx={{fontSize: '1.8em', color: grey[500]}}></InsertCommentIcon>
        <Typography sx={{ p: 1, color: grey[500], fontWeight: 600, fontSize: '0.9em' }}>No Comments Yet...</Typography>
        </div>
        
      <Comment handleClickOpenDialog={handleClickOpenDialog}></Comment>
      <Comment handleClickOpenDialog={handleClickOpenDialog}></Comment>
      </Stack>

      </div>
    )

}
