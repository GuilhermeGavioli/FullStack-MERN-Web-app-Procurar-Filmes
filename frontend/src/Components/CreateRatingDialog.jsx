import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Fab, Rating, Typography } from '@mui/material';
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
  ({currentTheme}) => `
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
  color: ${currentTheme.palette.contra};
  background: ${currentTheme.palette.dark};
  box-shadow: none;
  border: none;
  border: 1px solid ${currentTheme.palette.light};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${(props) => props.currentTheme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:focus-visible {
    outline: none;
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
        const res = await fetch(`http://localhost:80/ratings/create/for_movie/${movie?._id}`, {
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
background: `linear-gradient(${currentTheme.palette.sec},${currentTheme.palette.sec})`,
color: currentTheme.palette.contra
        }}>
  <AddIcon style={{fontSize: '2em', color: 'white'}} />
</Fab>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
             <DialogContent style={{height: '700px', maxHeight: '90%', background: currentTheme.palette.dark, padding: 0}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '5px 20px', gap: '0px'}}>

            
              <Typography  sx={{width: '350px', maxWidth: '100%',
userSelect: 'none',
    paddingTop: '7px',
    color: currentTheme.palette.contra,
    fontWeight: 600,
    fontSize: '1.6em',
                margin: 0
              }}>
          Deixe seu Comentário
        </Typography>
        <Typography id="alert-dialog-title" sx={{ 
    color: currentTheme.palette.contra,
    fontWeight: 500,
    marign: 0,
    userSelect: 'none',
    fontSize: '1em'}}>
          Qual a sua opinião sobre esse Filme?
        </Typography>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        <img draggable='false' src={movie.cover} style={{height: '150px', width: '120px',
   }} alt="" />
    </div>

     <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
          <Rating
              sx={{color: currentTheme.palette.sec, fontSize: '2.5em'}}
        emptyIcon={<StarIcon style={{ opacity: 0.85, color: currentTheme.palette.lighter }} fontSize="inherit" />}
        value={starvalue}
        defaultValue={starvalue}
        onChange={(event, newValue) => {
          setstarvalue(newValue);
        }}
        />
        </div>

         <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>

        <TextareaAutosize currentTheme={currentTheme}  aria-label="empty textarea" 
placeholder="Escreva seu comentário..."  autoFocus value={commentValue} onChange={(e) => setCommentValue(e.target.value)}/>
</div>
  
  </div>
</DialogContent>



        <DialogActions sx={{padding: 0}}>
          <div style={{width: '100%', background: currentTheme.palette.dark, padding: '15px', display: 'flex', justifyContent: 'flex-end'}}>
          <Button  style={{color: currentTheme.palette.lighter, marginRight: '10px'}} onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' style={{backgroundColor: currentTheme.palette.sec, boxShadow: 'none'}} onClick={createComment}>Comentar</Button>
          </div>
        </DialogActions>
      </Dialog>

  

        {/* <div style={{background: 'blue',zIndex: '20',height: '100%', width:'100%'}}>
        <h1>Oi</h1>
        </div>
        <h1>Oi</h1> */}



        {/* <div   style={{borderRadius: '0px', background: currentTheme.palette.darker, width: '100vw', height: '100%', background: 'red'}}>

        <DialogTitle sx={{color: currentTheme.palette.contra, fontSize: '1.4em'}}>O que Acha do Filme?</DialogTitle>
   <img src={movie.cover} style={{height: '150px', width: '120px'}} alt="" />
<div style={{padding: '0 20px 0 20px'}}>

              <Rating
              sx={{color: currentTheme.palette.sec}}
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
          <Button style={{color: currentTheme.palette.sec}} onClick={createComment}>Comentar</Button>
        </DialogActions>

     
        </div> */}
    
    </React.Fragment>
  );
}



function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
              <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        <h1>cool</h1>
        </DialogTitle>
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
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}