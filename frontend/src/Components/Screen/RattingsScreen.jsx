import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { RatingsContext } from './MovieScreen';
import Comment from '../Comment';
import { Stack, styled as MUIStyled, Box, Fab } from '@mui/material';
import { theme } from '../../theme';
import AddIcon from '@mui/icons-material/Add';
import CreateRatingDialog from '../CreateRatingDialog';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ColorButton = MUIStyled(Button)(() => ({
  color: 'white',
  width: '100%',
  background: `linear-gradient(${theme.palette.purple_button_dark},${theme.palette.purple_button_light})`,
  '&:hover': {
    backgroundColor: theme.palette.lighter,
  },
}));

export default function RattingsScreen() {

  const {
    getMoreRatings, 
    isRatingsEnd,
     isRatingsContainerOpen, 
     setIsRatingsContainerOpen,
      ratings,
       handleOpenAndGetRatings,
        handleCloseRatings
       } = React.useContext(RatingsContext)

  const handleClickOpen = () => {
    handleOpenAndGetRatings()
  };

  const handleClose = () => {
    handleCloseRatings()
  };



  return (
    <React.Fragment>


 
    <div style={{padding: '0 10px 0 10px'}}>   

    <div onClick={handleClickOpen} style={{height: '40px', width: '40px', background: 'rgba(51,46,89,0.7)', position: 'absolute', top: '15px', right: '10px', zIndex: 3, 
  display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}}>
      <ModeCommentIcon sx={{color: 'white', fontSize: '1em'}}></ModeCommentIcon>
  </div>
    </div>


      <Dialog
        fullScreen
        open={isRatingsContainerOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >


<AppBar position="static" sx={{background: theme.palette.mid}}>
        <Toolbar variant="regular" sx={{justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
           
    
        <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
             
        </Toolbar>
      </AppBar>

      
        <Box sx={{width: '100%', height: '100%', background: theme.palette.dark, overflowY: 'scroll', paddingTop: '20px' }}>


        

         
        {
        isRatingsEnd && (ratings?.length == 0) ? <p>sem ratings</p> : <></>
        }  


        <Stack spacing={2} sx={{width: '100%', margin: "auto", }}>
          {ratings.map(rating => {
            return (
              <Comment key={rating._id} comment={rating.comment}></Comment>
            )
          })}
             {
          !isRatingsEnd ? <button onClick={() => getMoreRatings()}>load more</button> : <></>
        }
        </Stack>
        
        <CreateRatingDialog/>

        </Box>
      </Dialog>
    </React.Fragment>
  );
}