import * as React from 'react'
import { Fab, Skeleton, Stack, Typography } from "@mui/material"
import Comment from "../Comment"
import { grey } from "@mui/material/colors"
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, Fragment, useEffect, useRef, useContext } from "react";

import { AuthContext } from "../Contexts/AuthContext";
import CommentSkeleton from "../CommentSkeleton";
import SnackBar from '../SnackBar';
import CommentWithMovieLink from '../CommentWithMovieLink';
import { RatingsContext } from '../Screen/MovieScreen';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeContext } from '../Contexts/ThemeContext';
import ReplayIcon from '@mui/icons-material/Replay';

//todo
//alert dialog here and on ratingscreen is the same // reuse it //
//todo
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
          // background: `${currentTheme.palette.dark}`
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

export default function MyComments(){
  
  const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
  const {user, userLoading, auth } = useContext(AuthContext)

  const listRef = useRef(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState('')

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [end, setEnd] = useState(false)
  const [myComments, setMyComments] = useState([])
  
  const [scrollTop, setScrollTop] = useState(0);
  
  const [page, setPage] = useState(1)

  const [scrollpos, setScrollpos] = useState(0)

  
    function scrollToTop(){
      listRef.current.scrollTop = 0
      setScrollpos(0)
    }
 

    const getMyComments = async () => {
      const url = `https://procurarfilmes.xyz/myratings?page=${page}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        console.log(data)
        setPage((prev) => (prev + 1))
        if (data.length < 10){
          setEnd((p) => {return true})
          listRef.current.removeEventListener('scroll', handleFetchingMoreOnScroll)
        } else {
          setEnd((p) => {return false})
        }

        setMyComments((prev) => { return [...prev, ...data] })
    
      } else {
        alert('Erro ao Carregar. Tente Novamente.')
      }
      setLoading(false)
    }
  useEffect(() => {
      if ( !userLoading && !auth ) {
          setLoading(false)
  
      return
    } 
    getMyComments()
  }, [])


  const getMoreComments = async () => {
          if ( !userLoading && !auth ) {
          setLoading(false)
      return
          }
    if (end || loadingMore) {
      return    
    }
    console.log(page)
      setLoadingMore(true)
      const url = `https://procurarfilmes.xyz/myratings?page=${page}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        console.log(data)
        if (data.length < 10){
          setEnd((p) => {return true})
          listRef.current.removeEventListener('scroll', handleFetchingMoreOnScroll)
        } else {
          setEnd((p) => {return false})
        }
        
        setMyComments((prev) => { return [...prev, ...data] })
        setPage(prev => {return (prev + 1)})
      }
      setLoadingMore(false)
  };
   
  const openDialog = (c_id) => {
    setCurrentCommentId(c_id)
    setIsDeleteDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleFetchingMoreOnScroll = async (e) => {
    const { scrollHeight, clientHeight, scrollTop } = listRef.current
        // setScrollpos(scrollTop)
    const isNearEnd = scrollTop + clientHeight >= scrollHeight - 100; // Adjust threshold
 
    if (isNearEnd && !loadingMore) {
      await getMoreComments()
    }
  }

  async function reloading(){
              if ( !userLoading && !auth ) {
          setLoading(false)
      return
          }
    setLoading(true)
    await getMyComments()

  }

const [isEdSnackBarOpen, setIsEdSnackBarOpen] = useState(false)
  const [isEdSnackBarVisible, setIsEdSnackBarVisible] = useState(false)

  const [isRSnackBarOpen, setIsRSnackBarOpen] = useState(false)
  const [isRSnackBarVisible, setIsRSnackBarVisible] = useState(false)
  function handleShowingRFeedback(){
    setIsRSnackBarVisible(true)
    setTimeout(() => {
      setIsRSnackBarOpen(true)
    }, 300);
    setTimeout(()=>{
      setIsRSnackBarOpen(false)
    },3500)
    setTimeout(() => {
      setIsRSnackBarVisible(false)
    }, 4000);
  }

  function handleShowingEdFeedback(){
    setIsEdSnackBarVisible(true)
    setTimeout(() => {
      setIsEdSnackBarOpen(true)
    }, 300);
    setTimeout(()=>{
      setIsEdSnackBarOpen(false)
    },3500)
    setTimeout(() => {
      setIsEdSnackBarVisible(false)
    }, 4000);
  }

  async function deleteComment(){
    console.log('deleting')
    closeDialog()
    setMyComments(prev => {
      return myComments.filter((c) => { return c._id !== currentCommentId})
    })
    handleShowingRFeedback()
      const url = `https://procurarfilmes.xyz/ratings/delete/${currentCommentId}`
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
  
    return(

      <div 
      ref={listRef}
      onScroll={handleFetchingMoreOnScroll}
      style={{width: '100%', height: '100%', overflowY:'scroll', position: 'relative'}}>

<div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '4px 15px',
}}>

          <Typography sx={{
      
            color: currentTheme.palette.darker_font_color,
            fontWeight: 600,
            fontSize: '1.5em'
          }}>Meus Comentários</Typography>

{!loading ? 
          <ReplayIcon onClick={reloading}style={{color: currentTheme.palette.darker_font_color, fontSize: '1.6em'}}/>
: <></>}
          </div>

{myComments.length == 0 && !loadingMore && end &&
<div style={{height: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', margin: 'auto', inset: '0 0 30px 0'}}>
                  <Typography sx={{fontSize: '1.1em', color: currentTheme.palette.font_color, opacity: '50%'}}>Nenhum Comentário encontrado</Typography>
            </div>
            }

      <div 

      style={{display: 'flex', flexDirection: 'column',
      height: 'fit-content',minHeight: '100%', 
      width: '100%',
      padding: '10px', 
      gap: '10px',
      paddingBottom: '40px',
      }}>


         <AlertDialog currentTheme={currentTheme} mainAction={deleteComment} state={isDeleteDialogOpen} close={closeDialog}/>
   
{/* <SnackBar text={'Criado com Sucesso!'} state={isCSnackBarOpen} setter={setIsCSnackBarOpen}/>
<SnackBar text={'Remoção Agendada!'}  state={isRSnackBarOpen} setter={setIsRSnackBarOpen}/> */}

<SnackBar text={'Remoção Agendada!'} state={{open: isRSnackBarOpen, visible: isRSnackBarVisible}} setter={setIsRSnackBarOpen}/>
<SnackBar text={'Editado com Sucesso!'} state={{open: isEdSnackBarOpen, visible: isEdSnackBarVisible}} setter={setIsEdSnackBarOpen}/>
     
      {
        loading ? 
        <React.Fragment>
        <CommentSkeleton/>
        <CommentSkeleton/>
        <CommentSkeleton/>
        <CommentSkeleton/>
        </React.Fragment>
        :
        myComments?.map(c => {
          console.log(c)
            return (
              <CommentWithMovieLink handleShowingEdFeedback={handleShowingEdFeedback} key={c?._id} openDialog={openDialog}
                c_id={c?._id} comment={c?.comment} userid={c?.user_id} username={user?.name} stars={c?.stars} pic={user?.picture} movie_id={c?.movie_id}></CommentWithMovieLink>
            )
        })
      }

{
        loadingMore &&
        <React.Fragment>
        <CommentSkeleton/>
        <CommentSkeleton/>
        <CommentSkeleton/>
        </React.Fragment>
      }




{
      scrollpos > 200 &&
    <Fab onClick={scrollToTop} size="small" sx={{transition: '0.3s ease-in-out', background: currentTheme.palette.sec, position: 'fixed', bottom: '95px', right: '15px', zIndex: 2,
    }}>
              <KeyboardArrowUpIcon sx={{fontSize: '2em', color: currentTheme.palette.darker}}/>
          </Fab>
}


      </div>
       </div>

    )

}
