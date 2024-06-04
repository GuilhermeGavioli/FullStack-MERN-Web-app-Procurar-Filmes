import * as React from 'react'
import { Skeleton, Stack, Typography } from "@mui/material"
import Comment from "../Comment"
import { grey } from "@mui/material/colors"
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, Fragment, useEffect, useContext, useRef } from "react";
import { theme } from "../../theme";
import { AuthContext } from "../Contexts/AuthContext";
import CommentSkeleton from "../CommentSkeleton";
import SnackBar from '../SnackBar';


function AlertDialog({state, close, mainAction}) {
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
          background: theme.palette.dark
        }}>
        <DialogTitle sx={{color: 'white'}} id="alert-dialog-title">
          {"Delete Comment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: 'white'}} id="alert-dialog-description">
            Confirm the deletion of the comment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  sx={{color: 'white'}} onClick={close} autoFocus>
            Cancel
          </Button>
          <Button onClick={mainAction} color="error" variant="text" >
        Delete</Button>
        </DialogActions>
        </div>
      </Dialog>
    </Fragment>
  );
}

export default function MyComments(){
  
  const {user, userLoading } = useContext(AuthContext)

  const listRef = useRef(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState('')

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [end, setEnd] = useState(false)
  const [myComments, setMyComments] = useState([])
  
  const [scrollTop, setScrollTop] = useState(0);
  
  const [page, setPage] = useState(1)
 

  useEffect(() => {
    console.log('RUNNING')
    const getMyComments = async () => {
      const url = `https://popfix.onrender.com/myratings?page=${page}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        console.log(data.length)
        setPage((prev) => (prev + 1))
        if (data.length < 10){
          setEnd((p) => {return true})
          listRef.current.removeEventListener('scroll', handleFetchingMoreOnScroll)
        } else {
          setEnd((p) => {return false})
        }

        setMyComments((prev) => { return [...prev, ...data] })
    
      }
      setLoading(false)
    }
    getMyComments()
  }, [])



  const getMoreComments = async () => {
    if (end || loadingMore) {
      return    
    }
    console.log(page)
      setLoadingMore(true)
      const url = `https://popfix.onrender.com/myratings?page=${page}`
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
    console.log(c_id)
    setCurrentCommentId(c_id)
    setIsDeleteDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleFetchingMoreOnScroll = async (e) => {
    const { scrollHeight, clientHeight, scrollTop } = listRef.current;
    const isNearEnd = scrollTop + clientHeight >= scrollHeight - 100; // Adjust threshold
    if (isNearEnd && !loadingMore) {
      await getMoreComments()
    }
  }

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)

  async function deleteComment(){
    console.log('deleting')
    closeDialog()
    setMyComments(prev => {
      return myComments.filter((c) => { return c._id !== currentCommentId})
    })
    setIsSnackBarOpen(true)
    setTimeout(()=>{
      setIsSnackBarOpen(false)
    },2500)
      const url = `https://popfix.onrender.com/ratings/delete/${currentCommentId}`
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

{myComments.length == 0 && !loadingMore && end &&
<div style={{height: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', margin: 'auto', inset: '0 0 30px 0'}}>
              <img src="/popcorn.png" style={{width: '150px'}} alt="" />
              <Typography sx={{fontSize: '1.2em', color: 'white', fontWeight: 700}}>No Comments Found...</Typography>
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


         <AlertDialog mainAction={deleteComment} state={isDeleteDialogOpen} close={closeDialog}/>
<SnackBar state={isSnackBarOpen} setter={setIsSnackBarOpen}/>
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
              <Comment key={c?._id} openDialog={openDialog}
                c_id={c?._id} comment={c?.comment} userid={c?.user_id} username={user?.name} pic={user?.picture}></Comment>
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



     
      </div>
       </div>

    )

}
