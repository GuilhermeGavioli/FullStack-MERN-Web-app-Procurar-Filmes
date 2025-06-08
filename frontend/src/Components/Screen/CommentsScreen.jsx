import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { CommentsContext } from '../Contexts/CommentsContext';

import { Stack, styled as MUIStyled, Box, Fab, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { theme } from '../../theme';
import AddIcon from '@mui/icons-material/Add';
import CreateRatingDialog from '../CreateRatingDialog';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

import { useState } from 'react';
import SnackBar from '../SnackBar';
import { ThemeContext } from '../Contexts/ThemeContext';
import { ProfileContext } from '../Contexts/ProfileContext';
import ProfileContextProvider from '../Contexts/ProfileContext';
import ProfileScreen from './ProfileScreen';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fragment, forwardRef, useContext } from 'react';
import SnackBarContextProvider, { SnackBarContext } from '../Contexts/SnackBarContext';
import UnifiedComment from '../Comment';

export default function CommentsScreen() {
 const {currentTheme} = React.useContext(ThemeContext)
 const {handleDisplaySnackBar} = React.useContext(SnackBarContext)


  const listRef = React.useRef(null);
  const {
    loadingMoreRatings,
    getMoreRatings, 
    isRatingsEnd,
     isRatingsContainerOpen, 
      ratings,
       handleOpenAndGetRatings,
        handleCloseRatings,
        openDialog, 
        closeDialog,
        isDeleteDialogOpen,
        setRatings,
        currentCommentId
       } = useContext(CommentsContext)

           async function deleteComment(){
               console.log('deleting')
               closeDialog()
             setRatings(prev => {
               return prev.filter((c) => { return c._id !== currentCommentId})
             })
             handleDisplaySnackBar('delete', 'A Remoção foi Agendada com Sucesso!')
               const url = `https://procurarfilmes.xyz:442/ratings/delete/${currentCommentId}`
               const res = await fetch(url, {
                 method: 'DELETE',
                 headers: {
                   'authorization': `Bearer ${localStorage.getItem('access_token')}`,
                   'Content-Type': 'application/json'
                 }
               })
               if (res.status == 200) {
                 console.log('deleted')    
               } else {
                 console.log('not deleted')    
               }
           }

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
    <Fragment>





            <ProfileContextProvider>
               <ProfileScreen/>
               
      
      
           
 
    <div style={{padding: '0 10px 0 10px'}}>   

    <div onClick={handleOpenAndGetRatings} style={{height: '45px', width: '45px', opacity: '100%', background: currentTheme.palette.sec, position: 'absolute', top: '15px', right: '10px', zIndex: 3, 
  display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}}>
    <IconButton 
    aria-label="settings"  aria-haspopup="true"  

    >
                  <MoreHorizIcon sx={{fontSize: '1.4em',color: 'white'}} />
                </IconButton>

  </div>
    </div>


      <Dialog


        fullScreen
        open={isRatingsContainerOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >

             <AlertDialog currentTheme={currentTheme} mainAction={deleteComment} state={isDeleteDialogOpen} close={closeDialog}/>



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
              <UnifiedComment containMovieView={false} openDialog={() => openDialog(rating._id)} c_id={rating._id} key={rating._id} comment={rating.comment} stars={rating.stars} userid={rating.user?._id} movie_id={rating.movie_id} username={rating?.user?.name} pic={rating?.user?.picture}></UnifiedComment>
            )
          })}
         
        </Stack>
        
        <CreateRatingDialog/>

        </Box>
      </Dialog>

        
        </ProfileContextProvider>

    </Fragment>
  );
}





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
        <DialogTitle sx={{color: `${currentTheme.palette.bottom_bar_icon}`}} id="alert-dialog-title">
          {"Deletar Comentário?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: `${currentTheme.palette.bottom_bar_icon}`}} id="alert-dialog-description">
            Confirmar remoção do seu comentário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  sx={{color: currentTheme.palette.bottom_bar_icon}} onClick={close} autoFocus>
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


