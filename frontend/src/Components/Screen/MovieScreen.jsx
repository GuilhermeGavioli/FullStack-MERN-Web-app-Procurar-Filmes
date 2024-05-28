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
import { theme } from '../../theme';

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
    padding: 5px 0 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
`

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: linear-gradient(${theme.palette.cyan},${theme.palette.cyan_light});
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 15px 12px 15px;
    border-radius: 20px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;
`
const RuntimeItem = styled.div`
    width: fit-content;
    height: 100%;
    background: linear-gradient(${theme.palette.pink},${theme.palette.pink_light});
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 15px 12px 15px;
    border-radius: 20px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;
`
const YearItem = styled.div`
    width: fit-content;
    height: 100%;
    background: linear-gradient(${theme.palette.yellow},${theme.palette.yellow_light});
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 15px 12px 15px;
    border-radius: 20px;
    font-size: .9em;
    font-weight: 600;
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

    sx={{ width:'auto', height: '100vh', overflowY: 'scroll', background: theme.palette.dark }}>


      {/* <img style={{borderRadius: '0 0 25px 25px', width: '100%'}} src={"https://lumiere-a.akamaihd.net/v1/images/encanto_ka_bpo_pay1_ee2c2e0c.jpeg?region=0,225,1080,1046&width=960"} alt="" /> */}
{
  movieLoading ?
  <Skeleton animation="wave" sx={{background: grey[900], borderRadius: '0 0 25px 25px'}} variant="rectangular" width={'100%'} height={'280px'} />
  :

  <div style={{position: 'relative', width: '100%', maxWidth: '300px', height: '350px', margin: 'auto',}}>

    <div style={{position: 'absolute', inset: 'auto 0 20px 0', 
    width: '280px', maxWidth: '100%', minHeight: '50px', height: 'fit-content', background: 'rgba(240,240,240,0.3)', zIndex: '2', margin: 'auto',borderRadius: '15px',
    padding: '10px'}}>
      <Typography variant="h6" gutterBottom sx={{margin: 0, padding: 0, fontWeight: 700, color: 'white'}}>
    {movieLoading ? <Skeleton /> : movie?.title}
     </Typography>


     <Wrapper>
    <CardsWrapper>
      {
        movieLoading || !movie?.genres ?
        <>
        <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'60px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'80px'} height={'100%'} />
        </>
        :
        
        <React.Fragment>
          
        <Item>
        <p>{movie?.genres[0]}</p>
    </Item> 
        <RuntimeItem>
        <p>{movie?.runTime} Min</p>
    </RuntimeItem>
        <YearItem>
        <p>{movie?.released?.slice(-4)}</p>
    </YearItem>
        </React.Fragment>

      }
</CardsWrapper>
</Wrapper> 


    </div>

  <div style={{borderRadius: '0 0 0 0', width: '100%', height: '100%',
  maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 40%, transparent 100%)', position: 'absolute',
  inset: '0 0 0 0', margin: 'auto', zIndex: '1'
}}>
  <img src={`${movie?.cover}`} style={{width: '100%', height: '100%',}} alt="" />
  </div>
 

    </div>



}
  
 





{movieLoading ? 
  <div style={{padding: '0 10px 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Skeleton animation="wave" height={14} width={'100%'} style={{ marginBottom: 3 }} />
            <Skeleton animation="wave" height={14} width={'70%'} style={{ marginBottom: 3 }}/>
            <Skeleton animation="wave" height={14} width={'60%'}  style={{ marginBottom: 3 }}/>
            <Skeleton animation="wave" height={14} width={'80%'}  style={{ marginBottom: 3 }}/>
            </div>
    
:
<div style={{padding: '0 10px 0 10px', width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', alignItems: 'start', 
margin: 'auto',justifyContent: 'flex-start'}}>
        <Typography variant="body1" gutterBottom sx={{fontWeight: '700', color: theme.palette.purple_title}}>
          Plot
      </Typography>
        <Typography variant="body2" gutterBottom sx={{ fontWeight: '500', textAlign: 'justify', color: grey[100]}}>
        {movie?.description}
      </Typography>
     </div>

}



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