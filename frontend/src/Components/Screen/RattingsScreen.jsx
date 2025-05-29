import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { RatingsContext } from './MovieScreen';
import Comment from '../Comment';
import { Stack, styled as MUIStyled, Box, Fab, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { theme } from '../../theme';
import AddIcon from '@mui/icons-material/Add';
import CreateRatingDialog from '../CreateRatingDialog';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import CommentWithMovieLink from '../CommentWithMovieLink';
import { useState } from 'react';
import { Fragment } from 'react';
import SnackBar from '../SnackBar';
import { ThemeContext } from '../Contexts/ThemeContext';
import { ProfileContext } from '../Contexts/ProfileContext';
import ProfileContextProvider from '../Contexts/ProfileContext';
import ProfileScreen from './ProfileScreen';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function AlertDialog({state, close, mainAction, currentTheme}) {
  return (
    <Fragment>
      <Dialog
        open={state}
        onClose={close}

        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: `${currentTheme.palette.bg}`
        }}>
        <DialogTitle sx={{color: `${currentTheme.palette.darker_font_color}`}} id="alert-dialog-title">
          {"Deletar Comentário?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: `${currentTheme.palette.font_color}`}} id="alert-dialog-description">
            Confirmar remoção do seu comentário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  sx={{color: currentTheme.palette.font_color}} onClick={close} autoFocus>
            Cancelar
          </Button>
          <Button onClick={mainAction}
          sx={{color: currentTheme.palette.sec}}
          
            variant="text" >
        Remover</Button>
        </DialogActions>
        </div>
      </Dialog>
    </Fragment>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function RattingsScreen() {
 const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)
    // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    // const [currentCommentId, setCurrentCommentId] = useState('')

    // const openDialog = (c_id) => {
    //   setCurrentCommentId(c_id)
    //   setIsDeleteDialogOpen(true)
    // }
  
    // const closeDialog = () => {
    //   setIsDeleteDialogOpen(false)
    // }

    
  


  const listRef = React.useRef(null);
  const {
    loadingMoreRatings,
    getMoreRatings, 
    isRatingsEnd,
     isRatingsContainerOpen, 
     setIsRatingsContainerOpen,
      ratings,
       handleOpenAndGetRatings,
        handleCloseRatings,
        deleteComment,
        openDialog, 
        closeDialog,
        isDeleteDialogOpen,
        isRSnackBarOpen,
        setIsRSnackBarOpen,
        isCSnackBarOpen,
        setIsCSnackBarOpen,
        isRSnackBarVisible,
        setIsRSnackBarVisible,
        isCSnackBarVisible
       } = React.useContext(RatingsContext)

  const handleClickOpen = () => {
    handleOpenAndGetRatings()
  };

  const handleClose = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    handleCloseRatings()
  };

  const handleFetchingMoreOnScroll = async (e) => {
    const { scrollHeight, clientHeight, scrollTop } = listRef.current;
    const isNearEnd = scrollTop + clientHeight >= scrollHeight - 350; // Adjust threshold
    if (isNearEnd && !loadingMoreRatings) {
      await getMoreRatings()
    }
  }



  return (
    <React.Fragment>
            <ProfileContextProvider>
               <ProfileScreen/>
               
      
      
               
    

{/* <div 
      ref={listRef}
      onScroll={handleFetchingMoreOnScroll}
      style={{width: '100%', height: '100%', padding: '5px', overflowY:'scroll',}}>

      <div 

      style={{display: 'flex', flexDirection: 'column',
      height: 'fit-content',minHeight: '100%', 
      width: '100%',
      padding: '10px', 
      gap: '20px',
      paddingBottom: '40px',
      }}> */}
 
    <div style={{padding: '0 10px 0 10px'}}>   

    <div onClick={handleClickOpen} style={{height: '45px', width: '45px', opacity: '100%', background: currentTheme.palette.sec, position: 'absolute', top: '15px', right: '10px', zIndex: 3, 
  display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}}>
    <IconButton 
    aria-label="settings"  aria-haspopup="true"  

    >
    
                  <MoreVertIcon sx={{fontSize: '1.4em',color: 'white'}} />
    
                </IconButton>
      {/* <ModeCommentIcon sx={{color: 'white', fontSize: '1.3em'}}></ModeCommentIcon> */}
  </div>
    </div>


      <Dialog


        fullScreen
        open={isRatingsContainerOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >

             <AlertDialog currentTheme={currentTheme} mainAction={deleteComment} state={isDeleteDialogOpen} close={closeDialog}/>

<SnackBar text={'Remoção Agendada!'} state={{open: isRSnackBarOpen, visible: isRSnackBarVisible}} setter={setIsRSnackBarOpen}/>
<SnackBar text={'Criado com Sucesso!'} state={{open: isCSnackBarOpen, visible: isCSnackBarVisible}} setter={setIsCSnackBarOpen}/>


<AppBar position="static" sx={{background: currentTheme.palette.bars}}>
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

      
        <Box 
         ref={listRef}
         onScroll={handleFetchingMoreOnScroll}
        sx={{width: '100%', height: '100%', background: currentTheme.palette.bg, overflowY: 'scroll', padding: '10px 10px 20px 10px'}}>


        

         
        {
        isRatingsEnd && (ratings?.length == 0) &&
          <div style={{height: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', margin: 'auto', inset: '0 0 30px 0'}}>
     <Typography sx={{fontSize: '1.1em', color: currentTheme.palette.lighter, opacity: '50%'}}>Nenhum Comentário encontrado.</Typography>
     <Typography sx={{fontSize: '1em', color: currentTheme.palette.lighter, opacity: '50%'}}>Seja o Primeiro a Comentar.</Typography>
          </div>
        }
        


        <Stack spacing={'10px'} sx={{width: '100%', margin: "auto", }}>
          {ratings.map(rating => {
            return (
              <Comment openDialog={() => openDialog(rating._id)} c_id={rating._id} key={rating._id} comment={rating.comment} stars={rating.stars} userid={rating.user?._id} username={rating?.user?.name} pic={rating?.user?.picture}></Comment>
            )
          })}
         
        </Stack>
        
        <CreateRatingDialog/>

        </Box>
      </Dialog>

        </ProfileContextProvider>
    </React.Fragment>
  );
}