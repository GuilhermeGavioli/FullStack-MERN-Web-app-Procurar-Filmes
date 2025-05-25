import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Fab, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { theme } from '../theme';
import StarIcon from '@mui/icons-material/Star';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { blue, grey } from '@mui/material/colors';
import { MovieContext } from './Contexts/MovieContext';
import { RatingsContext } from './Screen/MovieScreen';
import { AuthContext } from './Contexts/AuthContext';
import { ThemeContext } from './Contexts/ThemeContext';





const TextareaAutosize = styled(BaseTextareaAutosize)(
  () => `
  box-sizing: border-box;
  width: 100%;
  resize: unset;
  height: 100px;
  max-height: 100px;
  min-height: 100px;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${(props) => props.currentTheme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${(props) => props.currentTheme.palette.lighter};
  border: 1px solid ${(props) => props.currentTheme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: none;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${(props) => props.currentTheme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export default function CreateRatingDialog() {
  const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)
  const [open, setOpen] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState('');
  const {movie} = React.useContext(MovieContext)
  const { setRatings, handleCloseRatings, isCSnackBarOpen, isCSnackBarVisible,  handleShowingCFeedback
   } = React.useContext(RatingsContext)
  const { user } = React.useContext(AuthContext)

  const [starvalue, setstarvalue] = React.useState(3)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
    };
    
    const createComment = async () => {
      const r = {
        _id: Math.random().toString(),
        comment: commentValue,
        stars: starvalue,
        movie_id: movie?._id,
        user: {
          _id: user?._id,
          name: user?.name,
          picture: user?.picture,
        }
      }
      setRatings((p) => {return [r, ...p]})
      handleClose()
      handleShowingCFeedback()
      try{
        if (starvalue == 0) setstarvalue(1)
        console.log(commentValue)
        const res = await fetch(`http://procurarfilmes.xyz/ratings/create/for_movie/${movie?._id}`, {
            method: 'POST',
            body: JSON.stringify({comment: commentValue, stars: starvalue}),
        
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        if (res.status == 200) {
          console.log('ok')
        } else {
          console.log('not ok')
        }

      } catch(err){
        console.log(err)
      }
    }
  return (
    <React.Fragment>
           <Fab onClick={handleClickOpen} size="large" aria-label="add" sx={{position: 'absolute', bottom: 15, right: 15,
background: `linear-gradient(${currentTheme.palette.pink},${currentTheme.palette.pink})`,
color: 'white'
        }}>
  <AddIcon style={{fontSize: '2em'}} />
</Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   component: 'form',
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <div   style={{borderRadius: '0px', background: currentTheme.palette.darker, width: '100%', height: '100%'}}>

        <DialogTitle sx={{color: 'white', fontSize: '1.4em'}}>Comentário</DialogTitle>

<div style={{padding: '0 20px 0 20px'}}>

              <Rating
              sx={{color: currentTheme.palette.pink}}
        emptyIcon={<StarIcon style={{ opacity: 0.85 }} fontSize="inherit" />}
        value={starvalue}
        defaultValue={starvalue}
        onChange={(event, newValue) => {
          setstarvalue(newValue);
        }}
        />
        </div>

        <DialogContent>

<TextareaAutosize currentTheme={currentTheme} style={{border: 'none'}}  aria-label="empty textarea" 
placeholder="Escreva seu comentário..."  autoFocus value={commentValue} onChange={(e) => setCommentValue(e.target.value)}/>


        </DialogContent>
        <DialogActions>
          <Button  style={{color: currentTheme.palette.lighter}} onClick={handleClose}>Cancelar</Button>
          <Button style={{color: currentTheme.palette.pink}} onClick={createComment}>Comentar</Button>
        </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}