import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { theme } from '../theme';



import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { blue, grey } from '@mui/material/colors';
import { MovieContext } from './Contexts/MovieContext';





const TextareaAutosize = styled(BaseTextareaAutosize)(
  () => `
  box-sizing: border-box;
  width: 100%;
  resize: unset;
  height: 100px;
  max-height: 100px;
  min-height: 100px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mid};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default function CreateRatingDialog() {
  const [open, setOpen] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState('');
  const {movie} = React.useContext(MovieContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
    };
    
    const createComment = async () => {

      console.log(commentValue)
        const res = await fetch(`http://localhost:3001/ratings/create/for_movie/${movie?._id}`, {
            method: 'POST',
        body: JSON.stringify({comment: commentValue}),
        
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        if (res.status == 200) {
          alert('ok')
        } else {
            alert('not ok')
        }
        handleClose()
    }
  return (
    <React.Fragment>
           <Fab onClick={handleClickOpen} size="medium" aria-label="add" sx={{position: 'absolute', bottom: 15, right: 15,
background: `linear-gradient(${theme.palette.purple_light},${theme.palette.purple_mid})`,
color: 'white'
        }}>
  <AddIcon />
</Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <Box   sx={{background: theme.palette.dark, width: '100%', height: '100%'}}>

        <DialogTitle sx={{color: 'white'}}>Comment</DialogTitle>
        <DialogContent>

<TextareaAutosize  aria-label="empty textarea" 
placeholder="Your Comment..."  autoFocus value={commentValue} onChange={(e) => setCommentValue(e.target.value)}/>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createComment}>Subscribe</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}