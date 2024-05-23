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
import Comment from './Comment';
import { Stack } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


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


      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>


      <Dialog
        fullScreen
        open={isRatingsContainerOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {
          !isRatingsEnd ? <button onClick={() => getMoreRatings()}>load more</button> : <></>
        }
        {
        isRatingsEnd && (ratings?.length == 0) ? <p>sem ratings</p> : <></>
        } 
        <Stack spacing={2} sx={{width: '90%', margin: "auto", }}>
          {ratings.map(rating => {
            return (
              <Comment key={rating._id} comment={rating.comment}></Comment>
            )
          })}
        </Stack>
      </Dialog>
    </React.Fragment>
  );
}