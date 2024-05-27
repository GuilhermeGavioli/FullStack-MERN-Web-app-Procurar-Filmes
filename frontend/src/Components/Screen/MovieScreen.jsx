import * as React from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';


import { useEffect, useState, useContext } from "react"




import { grey } from "@mui/material/colors";
import {  Divider, Skeleton, Typography } from "@mui/material";
import styled from "styled-components";
import RattingsScreen from './RattingsScreen';
import ActorCard from "../ActorCard";
import Box from "@mui/material/Box";

import { createContext } from 'react';

import { MovieContext } from '../Contexts/MovieContext';

const Wrapper = styled.div`
    width: 100vw;
    height: 45px;
    position: relative;
    overflow: scroll;
`

const CardsWrapper = styled.div`
    position: absolute;
    left: 0;
    width: fit-content;
    height: 100%;
    padding: 5px 10px 5px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
`

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: blue;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 15px 0 15px;
    border-radius: 13px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;
`

export const RatingsContext = createContext()
export default function MovieScreen() {
  const { movieLoading, isMovieContainerOpen, movie, handleCloseMovie, months } = useContext(MovieContext)

  const [ratingsPage, setRatingsPage] = useState(1)
  const [isRatingsEnd, setIsRatingsEnd] = useState(false)
  const [isRatingsContainerOpen, setIsRatingsContainerOpen] = useState(false);
  const [ratings, setRatings] = useState([])
  const [ratingsLoading, setRatingsLoading] = useState(false)

  async function handleOpenAndGetRatings(){
    setRatingsLoading(true)
    console.log(movie?._id)
    console.log(ratingsPage)
    setIsRatingsContainerOpen(true)
    const url = `http://localhost:3001/ratings/${movie?._id}?page=${ratingsPage}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        console.log(data)
        if (data.length < 10){
          setIsRatingsEnd(true)
        }
        setRatingsPage(prev_page => {return prev_page + 1})
        setRatings(data)
      }
  }
  
  function handleCloseRatings(){
    setIsRatingsEnd(false)
    setRatingsLoading(false)
    setIsRatingsContainerOpen(false)
    setRatings([])
    setRatingsPage(1)
  }

  const toggleDrawer = () => (event) => {
    handleCloseMovie();
  };

  
  const getMoreRatings = async () => {
    if (isRatingsEnd) return
    console.log('geting more')
    const res = await fetch(`http://localhost:3001/ratings/${movie?._id}?page=${ratingsPage}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (res.status == 200) {
      const data = await res.json()
      if (data.length < 10){
        setIsRatingsEnd(true)
      }
      setRatingsPage(prev_page => {return prev_page + 1})
      setRatings([...ratings, ...data])
      
    }
  }

  

  return(

    <React.Fragment>
  <SwipeableDrawer
    anchor={'bottom'}
    open={isMovieContainerOpen}
    onClose={toggleDrawer(false)}
    onOpen={toggleDrawer(true)}
    >
     <Box
    role="presentation"

    sx={{ width:'auto', height: '100vh', overflowY: 'scroll', background: '#161616' }}>


      {/* <img style={{borderRadius: '0 0 25px 25px', width: '100%'}} src={"https://lumiere-a.akamaihd.net/v1/images/encanto_ka_bpo_pay1_ee2c2e0c.jpeg?region=0,225,1080,1046&width=960"} alt="" /> */}
{
  movieLoading ?
  <Skeleton animation="wave" sx={{background: grey[900], borderRadius: '0 0 25px 25px'}} variant="rectangular" width={'100%'} height={'280px'} />
  :
<img style={{borderRadius: '0 0 25px 25px', width: '270px', margin: 'auto'}} src={`${movie?.cover}`} alt="" />

}
  
<div style={{padding: '0 10px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
  {
    movieLoading ?
    <Skeleton animation="wave" sx={{background: grey[400],margin: '10px 0 10px 0', borderRadius: '5px'}} variant="rectangular" width={'70%'} height={'30px'} />
    :
    <Typography variant="h5" gutterBottom sx={{margin: 0, padding: 0, fontWeight: 700, color: 'white'}}>
    {movieLoading ? <Skeleton /> : movie?.title}
     </Typography>
  }
    </div>
 
    <Divider sx={{margin: '10px 0 10px 0'}}/>
 

    <Wrapper>
    <CardsWrapper>
      {
        movieLoading ?
        <>
        <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'60px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'80px'} height={'100%'} />
        </>
        :
        movie?.genres?.map(genre => {
          return (
            <Item key={genre}>
            <p>{genre}</p>
        </Item> 
          )
        })

      }
</CardsWrapper>
</Wrapper> 
 


<Divider sx={{margin: '10px 0 10px 0'}}/>



<Box sx={{ width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  {
    movieLoading ?
    <React.Fragment>
    <Skeleton animation="wave" height={18} width={'100px'} />
    <Skeleton animation="wave" height={18} width={'50px'} />
    </React.Fragment>
    :
  
    <React.Fragment>
    <Typography sx={{color: grey[300], fontWeight: '600', fontSize: '.9em'}} variant="h4" gutterBottom>
Runtime: <span style={{fontWeight: '500', color: grey[400], marginLeft: '5px'}}>{movie?.runTime}</span>
</Typography>
<Typography sx={{color: 'blue', fontWeight: '600', fontSize: '.9em'}} variant="subtitle1" gutterBottom>
Coming Soon
</Typography>
    </React.Fragment>

  }
  </Box>







{movieLoading ? 
  <div style={{padding: '0 10px 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Skeleton animation="wave" height={14} width={'100%'} style={{ marginBottom: 3 }} />
            <Skeleton animation="wave" height={14} width={'70%'} style={{ marginBottom: 3 }}/>
            <Skeleton animation="wave" height={14} width={'60%'}  style={{ marginBottom: 3 }}/>
            <Skeleton animation="wave" height={14} width={'80%'}  style={{ marginBottom: 3 }}/>
            </div>
    
:
<div style={{padding: '0 10px 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'flex-start'}}>
        <Typography variant="body2" gutterBottom sx={{color: grey[600], fontWeight: '500', textAlign: 'justify'}}>
        {movie?.description}
      </Typography>
     </div>

}





     <Box sx={{ width: '100%', maxWidth: 500, padding: '0 10px 0 10px' }}>

      {movieLoading ? 
      <Skeleton animation="wave" height={18} width={'200px'} /> 
      :
    <Typography sx={{ fontWeight: '600', fontSize: '.9em', color: grey[300]}} variant="h4" gutterBottom>
    Released  {movie?.released?.substring(0,2)} {months[movie?.released?.substring(3,5) - 1]} {movie?.released?.slice(-4)}
    </Typography>

    }
</Box>

<Divider sx={{margin: '10px 0 10px 0'}}/>


    <div style={{width: 'fit-content', display: 'flex', gap: '15px',
       width: '100vw', overflowX: 'scroll', overflowY: 'hidden',
       height: '250px',
       msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  padding: '0 10px 0 10px'
    }}>
      <div style={{width: 'fit-content', height: 'fit-content', display: 'flex', gap: '10px'}}>
        {
        movieLoading ? 
        <>
        <Skeleton animation="wave" height={'200px'} width={'100px'} /> 
        <Skeleton animation="wave" height={'200px'} width={'100px'} /> 
        <Skeleton animation="wave" height={'200px'} width={'100px'} /> 
        </>
        :
        movie?.actors?.map((actor, i) => {
          return (
            <ActorCard key={i}
            name={actor.name}
             picture={actor.picture}
             role={actor.role} 
             ></ActorCard>
          )
        })}
        </div>
      </div>

      <RatingsContext.Provider value={{getMoreRatings, isRatingsEnd, isRatingsContainerOpen, setIsRatingsContainerOpen, ratings, handleOpenAndGetRatings, handleCloseRatings }} >
      <RattingsScreen></RattingsScreen>
</RatingsContext.Provider>


    </Box>
  </SwipeableDrawer>
</React.Fragment>



)}