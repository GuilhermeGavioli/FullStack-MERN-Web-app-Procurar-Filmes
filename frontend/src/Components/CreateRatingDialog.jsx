import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Fab, Rating, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { MovieContext } from './Contexts/MovieContext';
import { CommentsContext } from './Contexts/CommentsContext';
import { AuthContext } from './Contexts/AuthContext';
import { ThemeContext } from './Contexts/ThemeContext';
import { SnackBarContext } from './Contexts/SnackBarContext';

export default function CreateRatingDialog() {
  const {currentTheme, IsDarkTheme} = React.useContext(ThemeContext)
  const [open, setOpen] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState('');
  const {movie} = React.useContext(MovieContext)
  const { setRatings } = React.useContext(CommentsContext)
  const { handleDisplaySnackBar } = React.useContext(SnackBarContext)
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
      handleDisplaySnackBar('create', 'O Comentário foi Agendado para Criação!')
      try{
        if (starvalue == 0) setstarvalue(1)
        console.log(commentValue)
        const res = await fetch(`https://procurarfilmes.xyz/ratings/create/for_movie/${movie?._id}`, {
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
    color: currentTheme.palette.darker_font_color,
    fontWeight: 600,
    fontSize: '1.2em',
                margin: 0
              }}>
          Deixe seu Comentário
        </Typography>
        <Typography id="alert-dialog-title" sx={{ 
    color: currentTheme.palette.font_color,
    fontWeight: 400,
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
        emptyIcon={<StarIcon style={{ opacity: 0.85, color: IsDarkTheme ?'' : currentTheme.palette.light}} fontSize="inherit" />}
        value={starvalue}
        defaultValue={starvalue}
        onChange={(event, newValue) => {
          setstarvalue(newValue);
        }}
        />
        </div>
         <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        <TextareaAutosize currentTheme={currentTheme}  aria-label="empty textarea" 
placeholder='Seu comentário'  autoFocus value={commentValue} onChange={(e) => setCommentValue(e.target.value)}/>
</div>
  </div>
</DialogContent>
        <DialogActions sx={{padding: 0}}>
          <div style={{width: '100%', background: currentTheme.palette.dark, padding: '15px', display: 'flex', justifyContent: 'flex-end'}}>
          <Button  style={{color: currentTheme.palette.editnomebtn, marginRight: '10px'}} onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' style={{backgroundColor: currentTheme.palette.sec, boxShadow: 'none'}} onClick={createComment}>Comentar</Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

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
    border-color: ${currentTheme.palette.sec};
  }

  &:focus {
    border-color: 3px solid ${currentTheme.palette.sec};
       outline: none;
  }

  &:focus-visible {
 
  }
`,
);