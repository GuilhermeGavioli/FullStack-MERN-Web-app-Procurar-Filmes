import * as React from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';


import { useEffect, useState, useContext } from "react"


import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { grey } from "@mui/material/colors";
import {  Button, Divider, Skeleton, Typography, styled as MUIStyled, Dialog } from "@mui/material";
import styled from "styled-components";
import RattingsScreen from './RattingsScreen';
import ActorCard from "../ActorCard";
import Box from "@mui/material/Box";

import { createContext } from 'react';

import { MovieContext } from '../Contexts/MovieContext';
import { theme } from '../../theme';

import Slide from '@mui/material/Slide';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ActorScreen from './ActorScreen';
import { ThemeContext } from '../Contexts/ThemeContext';

const Wrapper = styled.div`
    width: 100%;
    height: 45px;
    position: relative;
    overflow-x: scroll;

         ${(props) => props.currentTheme.breakpoints.up('lg')} {
       height: 60px;
      }
`

const CardsWrapper = styled.div`
    position: absolute;
    left: 0;
    width: fit-content;
    height: 100%;
    padding: 5px 0 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
`

const Item = styled.div`
    width: fit-content;
    height: 70%;
    background: linear-gradient(${(props) => props.currentTheme.palette.pink},${(props) => props.currentTheme.palette.pink});
    border: 2px solid ${(props) => props.currentTheme.palette.pink};
    background: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: roboto;
    
    ${(props) => props.currentTheme.breakpoints.down('md')} {
      padding: 12px 15px 12px 15px;
      border-radius: 20px;
      font-weight: 500;
      font-size: .9em;
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
           
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
       padding: 20px 35px 20px 35px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 1.2em;
      }

`
const RuntimeItem = styled.p`
    width: fit-content;
    height: 70%;
    background: linear-gradient(${(props) => props.currentTheme.palette.pink},${(props) => props.currentTheme.palette.pink});
      border: 2px solid ${(props) => props.currentTheme.palette.pink};
    background: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
        padding: 12px 15px 12px 15px;
    border-radius: 20px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;

          ${(props) => props.currentTheme.breakpoints.up('lg')} {
       padding: 20px 35px 20px 35px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 1.2em;
      }
`
const YearItem = styled.div`
    width: fit-content;
    height: 70%;
    background: linear-gradient(${(props) => props.currentTheme.palette.pink},${(props) => props.currentTheme.palette.pink});
      border: 2px solid ${(props) => props.currentTheme.palette.pink};
    background: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 15px 12px 15px;
    border-radius: 20px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;

          ${(props) => props.currentTheme.breakpoints.up('lg')} {
       padding: 20px 35px 20px 35px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 1.2em;
      }
`

const MovieTitle = MUIStyled(Typography)`
    margin: 0;
    padding: 0;
    font-weight: 700;
    ${(props) => props.currentTheme.breakpoints.down('md')} {
       color: white;
    }

    ${(props) => props.currentTheme.breakpoints.up('md')} {
         color: blue;
  }

  ${(props) => props.currentTheme.breakpoints.up('lg')} {
      color: red;
  }
`

const MovieDescription = MUIStyled(Typography)`
  font-weight: 400;
  text-align: justify;
  word-spacing: 1px; 

  color: rgb(227,226,230);
  ${(props) => props.currentTheme.breakpoints.down('md')} {
    line-height: 22px;
    font-size: .8em;
    }
    
    ${(props) => props.currentTheme.breakpoints.up('md')} {
      font-size: 1.1em;
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        line-height: none;
      font-size: 1.4em;
  }
`

const MovieTopicContainer = MUIStyled(Typography)`
  padding: 0 20px 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start; 
  margin: auto; 
  justify-content: flex-start;

       ${(props) => props.currentTheme.breakpoints.down('md')} {
           max-width: 350px;
    }

    ${(props) => props.currentTheme.breakpoints.up('md')} {
           max-width: 550px;
  }

  ${(props) => props.currentTheme.breakpoints.up('lg')} {
        max-width: 850px;
  }
`

const MovieTopicTitle = MUIStyled(Typography)`
font-weight: 600;
 color: ${(props) => props.currentTheme.palette.pink};

     ${(props) => props.currentTheme.breakpoints.down('md')} {
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
        
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        font-size: 1.5em;
      }
`

const MovieCoverContainer = styled.div`
  position: relative; 
  margin: auto;
  width: 100%;

   ${(props) => props.currentTheme.breakpoints.down('md')} {
        max-width: 300px;
        height: 350px;
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
               max-width: 300px;
        height: 350px;
        margin-top: 30px;
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        max-width: 300px;
        height: 390px;
        margin-top: 30px;
      }

`

const MovieCoverAttributesContainer = styled.div`
position: absolute;
 inset: auto 0 20px 0; 
    width: 280px;
     max-width: 100%; 
    min-height: 50px;
    height: fit-content;
    background: rgba(240,240,240,0.1);
    z-index: 2;
    margin: auto;
    border-radius: 15px;
    padding: 10px;

     ${(props) => props.currentTheme.breakpoints.down('md')} {
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
           
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        display: none;
      }
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide draggable='false' direction="up" ref={ref} {...props} />;
});

export const RatingsContext = createContext()
export const ActorContext = createContext()

export default function MovieScreen() {
   const {currentTheme, changeTheme} = useContext(ThemeContext)
  const { movieLoading, isMovieContainerOpen, movie, handleCloseMovie } = useContext(MovieContext)

  const [actorName, setActorName] = useState('')
  const [actorPic, setActorPic] = useState('')
  const [actorNac, setActorNac] = useState('')
  const [actorAge, setActorAge] = useState('')

  const [ratingsPage, setRatingsPage] = useState(1)
  const [isRatingsEnd, setIsRatingsEnd] = useState(false)
  const [isRatingsContainerOpen, setIsRatingsContainerOpen] = useState(false);
  const [ratings, setRatings] = useState([])
  const [ratingsLoading, setRatingsLoading] = useState(false)
  const [loadingMoreRatings, setLoadingMoreRatings] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState('')
  
  const [isCSnackBarOpen, setIsCSnackBarOpen] = useState(false)
  const [isCSnackBarVisible, setIsCSnackBarVisible] = useState(false)

  const [isRSnackBarOpen, setIsRSnackBarOpen] = useState(false)
  const [isRSnackBarVisible, setIsRSnackBarVisible] = useState(false)

  const [isActorLoading, setIsActorLoading] = useState(false)
  const [isActorContainerOpen, setIsActorContainerOpen] = useState(false)


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
  function handleShowingCFeedback(){
    setIsCSnackBarVisible(true)
    setTimeout(() => {
      setIsCSnackBarOpen(true)
    }, 300);
    setTimeout(()=>{
      setIsCSnackBarOpen(false)
    },3500)
    setTimeout(() => {
      setIsCSnackBarVisible(false)
    }, 4000);
  }
  async function handleOpenAndGetActor(name, pic, age, nac){
    setActorName(name)
    setActorPic(pic)
    setActorAge(age)
    setActorNac(nac)
    setIsActorContainerOpen(true)
  }
  async function handleCloseActor(){
    setIsActorLoading(false)
    setIsActorContainerOpen(false)
  }
  async function handleOpenAndGetRatings(){
    setRatingsLoading(true)
    setLoadingMoreRatings(true)
    setIsRatingsContainerOpen(true)
    const url = `http://procurarfilmes.xyz/ratings/${movie?._id}?page=${ratingsPage}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        if (data.length < 20){
          setIsRatingsEnd(true)
        }
        setRatingsPage(prev_page => {return prev_page + 1})
        setRatings(data)
      }
      setLoadingMoreRatings(false)
  }
  function handleCloseRatings(){
    setIsRatingsEnd(false)
    setRatingsLoading(false)
    setIsRatingsContainerOpen(false)
    setRatings([])
    setRatingsPage(prev_page => {return 1})
  }
  const toggleDrawer = () => (event) => {
    handleCloseMovie();
  }
  const getMoreRatings = async () => {
    console.log('firing gettting more ratings')
    if (isRatingsEnd || loadingMoreRatings) return
    setLoadingMoreRatings(true)
    const res = await fetch(`http://procurarfilmes.xyz/ratings/${movie?._id}?page=${ratingsPage}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (res.status == 200) {
      const data = await res.json()
      console.log(data)
      if (data.length < 20){
        setIsRatingsEnd(true)
      }
      setRatingsPage(prev_page => {return prev_page + 1})
      setRatings([...ratings, ...data])
      
    }
    setLoadingMoreRatings(false)
  }
    const openDialog = (c_id) => {
    setCurrentCommentId(c_id)
    setIsDeleteDialogOpen(true)
  }
  const closeDialog = () => {
    setIsDeleteDialogOpen(false)
  }
    async function deleteComment(){
    console.log('deleting')
    closeDialog()
    setRatings(prev => {
      return prev.filter((c) => { return c._id !== currentCommentId})
    })
    handleShowingRFeedback()
      const url = `http://procurarfilmes.xyz/ratings/delete/${currentCommentId}`
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
    <React.Fragment>

            <Dialog
      
      
              fullScreen
              open={isMovieContainerOpen}
               onOpen={toggleDrawer(true)}
              onClose={() => {toggleDrawer(false)}}
              TransitionComponent={Transition}
            >
  {/* <SwipeableDrawer 
    draggable='false'
    anchor={'bottom'}
    open={isMovieContainerOpen}
    onClose={toggleDrawer(false)}
    onOpen={toggleDrawer(true)}
    > */}
     <Box draggable='false'
    role="presentation"
    sx={{ width:'100vw', height: '100vh', overflowY: 'scroll', overflowX: 'hidden', background: currentTheme.palette.dark }}>

<div draggable='false' style={{height: '40px', width: '40px',opacity: '100%', background: currentTheme.palette.mid, position: 'absolute', top: '15px', left: '10px', zIndex: 3, 
display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}}>
    <ChevronLeftIcon onClick={toggleDrawer(false)}  sx={{color: 'white', fontSize: '2.3em'}}></ChevronLeftIcon>
</div>

 <RatingsContext.Provider value={{loadingMoreRatings,
   getMoreRatings, isRatingsEnd, isRatingsContainerOpen, setIsRatingsContainerOpen, isDeleteDialogOpen,isRSnackBarOpen,
        setIsRSnackBarOpen, isCSnackBarOpen,
        setIsCSnackBarOpen, 
  isRSnackBarVisible, setIsRSnackBarVisible,
  handleShowingCFeedback, isCSnackBarVisible, setIsCSnackBarVisible,
   ratings, setRatings, handleOpenAndGetRatings, handleCloseRatings, openDialog, closeDialog, deleteComment }} >
      <RattingsScreen></RattingsScreen>
</RatingsContext.Provider>





{
  movieLoading ?
  <Skeleton animation="wave" sx={{background: grey[900], borderRadius: '0 0 25px 25px'}} variant="rectangular" width={'100%'} height={'280px'} />
  :

  <MovieCoverContainer currentTheme={currentTheme}>


    {/* <MovieCoverAttributesContainer currentTheme={currentTheme}>

      <MovieTitle variant="h6" gutterBottom currentTheme={currentTheme}>
    {movieLoading ? <Skeleton /> : movie?.title}
     </MovieTitle>


     <Wrapper currentTheme={currentTheme}>
    <CardsWrapper currentTheme={currentTheme}>
      {
        movieLoading || !movie?.genres ?
        <>
        <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'60px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'80px'} height={'100%'} />
        </>
        :
        
        <React.Fragment>
          
        <Item currentTheme={currentTheme}>
        <p>{movie?.genres[0]}</p>
    </Item> 
        <RuntimeItem currentTheme={currentTheme}>
        <p>{movie?.runTime} Min</p>
    </RuntimeItem>
        <YearItem currentTheme={currentTheme}>
        <p>{movie?.released}</p>
    </YearItem>
        </React.Fragment>

      }
</CardsWrapper>
</Wrapper> 
    </MovieCoverAttributesContainer> */}


  <div style={{borderRadius: '0 0 0 0', width: '100%', height: '100%',
  maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 40%, transparent 100%)', position: 'absolute',
  inset: '0 0 0 0', margin: 'auto', zIndex: '1'
}}>
  <img draggable='false' src={`${movie?.cover}`} style={{width: '100%', height: '100%',}} alt="" />
  </div>
    </MovieCoverContainer>
}
  
    {/* <div style={{ display: 'flex', gap: '15px',
       width: '100%', overflowX: 'scroll', overflowY: 'scroll',
       height: 'fit-content',
  marginBottom: '30px',
    }}>
      <div     draggable='false' style={{width: 'fit-content', height: 'fit-content', display: 'flex', gap: '10px'}}>
      </div>
      </div> */}


     

<MovieTopicContainer currentTheme={currentTheme} style={{marginTop: '5px'}}>
        <MovieTopicTitle gutterBottom currentTheme={currentTheme} style={{color:"white", fontSize: '1.6em'}}>
          {movie?.title}
      </MovieTopicTitle>
     </MovieTopicContainer>


<MovieTopicContainer currentTheme={currentTheme}>
     <Wrapper currentTheme={currentTheme}>
    <CardsWrapper currentTheme={currentTheme}>
      {
        movieLoading || !movie?.genres ?
        <>
        <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'60px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'80px'} height={'100%'} />
        </>
        :
        
        <React.Fragment>
          
        <Item currentTheme={currentTheme}>
        <p>{movie?.genres[0]}</p>
    </Item> 
        <RuntimeItem currentTheme={currentTheme}>
        <p>{movie?.runTime} Min</p>
    </RuntimeItem>
        <YearItem currentTheme={currentTheme}>
        <p>{movie?.released}</p>
    </YearItem>
        </React.Fragment>

      }
</CardsWrapper>
</Wrapper> 
</MovieTopicContainer>


     


{movieLoading ? 
  <div style={{padding: '0 10px 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Skeleton animation="wave" height={14} width={'100%'} style={{ marginBottom: 3 }} />
            <Skeleton animation="wave" height={14} width={'70%'} style={{ marginBottom: 3 }}/>
            <Skeleton animation="wave" height={14} width={'60%'}  style={{ marginBottom: 3 }}/>
            <Skeleton animation="wave" height={14} width={'80%'}  style={{ marginBottom: 3 }}/>
            </div>
    
:
<MovieTopicContainer style={{marginTop: '5px'}} currentTheme={currentTheme}>
        <MovieTopicTitle gutterBottom currentTheme={currentTheme}>
          Sinopse
      </MovieTopicTitle>
        <MovieDescription currentTheme={currentTheme} gutterBottom sx={{ 
        }}>
        {movie?.description} 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam accusantium soluta placeat, debitis distinctio sed temporibus harum iusto iste quibusdam quidem minus, ullam repellendus nobis possimus impedit corrupti perferendis neque.
      </MovieDescription>
     </MovieTopicContainer>

}

{/* <MovieTopicContainer style={{marginTop: '5px'}} currentTheme={currentTheme}>
        <MovieTopicTitle style={{marginTop: '5px'}} gutterBottom currentTheme={currentTheme}>
          Cenas
      </MovieTopicTitle>
 <div  draggable='false' style={{padding: '0 15px 0 15px', width: '100%', overflowX: 'scroll', marginTop: '5px'}}>
  <div  draggable='false' style={{width: 'fit-content', display: 'flex', gap: '5px',}}>
  <img draggable='false'
  style={{width: '80px', height: '60px'}}
  src="https://ew.com/thmb/xiMgSzvxc-O9C5d11EF0zbWS2HA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chernabog-349f5355c81d4fb795f736952557eab7.jpg" alt="" />
  <img draggable='false'
  style={{width: '80px', height: '60px'}}
  src="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24396832/FantasiaMickey.jpg?quality=90&strip=all&crop=13.055555555556,0,73.888888888889,100" alt="" />
  <img draggable='false'
  style={{width: '80px', height: '60px'}}
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsd3zlzN8BCSeC11n9-7a3bc0N0D76u4nDWg&s" alt="" />
  <img draggable='false'
  style={{width: '80px', height: '60px'}}
  src="https://ew.com/thmb/xiMgSzvxc-O9C5d11EF0zbWS2HA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chernabog-349f5355c81d4fb795f736952557eab7.jpg" alt="" />
  </div>
 </div>
</MovieTopicContainer> */}




   


<MovieTopicContainer currentTheme={currentTheme} style={{padding: '0 20px 0 20px', width: '100%', flexDirection: 'column', alignItems: 'start', 
margin: 'auto',justifyContent: 'flex-start',   marginTop: '5px'}}>

<MovieTopicTitle currentTheme={currentTheme} variant="body1" gutterBottom>
          Atores
      </MovieTopicTitle>

 
      <ActorContext.Provider value={{ isActorContainerOpen, setIsActorContainerOpen, actorName, actorPic,actorAge, actorNac, handleOpenAndGetActor, handleCloseActor }} >
            <ActorScreen></ActorScreen>
         


         
      </ActorContext.Provider>
      </MovieTopicContainer>     


<div style={{padding: '0 20px 0 20px', width: '100%', flexDirection: 'column', alignItems: 'start', 
margin: 'auto',justifyContent: 'flex-start'}}>


</div>
    </Box>

  {/* </SwipeableDrawer> */}
  </Dialog>
</React.Fragment>



)}