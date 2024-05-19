import * as React from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';


import { useEffect, useState, useContext } from "react"




import { grey } from "@mui/material/colors";
import {  Divider, Skeleton, Typography } from "@mui/material";
import styled from "styled-components";
import RattingsScreen from './RattingsScreen';
import ActorCard from "./ActorCard";
import Box from "@mui/material/Box";
import { MovieContext } from './Pages/MainPage';




const Wrapper = styled.div`
    width: 100vw;
    height: 45px;
    position: relative;
    overflow: scroll;
`

const CardsWrapper = styled.div`
    background: yellow;
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

export default function MovieScreen() {
  const { movieLoading, isMovieContainerOpen, movie, handleCloseMovie } = useContext(MovieContext)
 

  const toggleDrawer = () => (event) => {
    handleCloseMovie();
  };

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

    sx={{ width:'auto', height: '100vh', overflowY: 'scroll', background: 'green' }}>


{
  movieLoading ?
  <Skeleton animation="wave" sx={{background: grey[900], borderRadius: '0 0 25px 25px'}} variant="rectangular" width={'100%'} height={'280px'} />
  :
<img style={{borderRadius: '0 0 25px 25px', width: '100%'}} src={"https://lumiere-a.akamaihd.net/v1/images/encanto_ka_bpo_pay1_ee2c2e0c.jpeg?region=0,225,1080,1046&width=960"} alt="" />

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
Runtime: <span style={{fontWeight: '500', color: grey[400], marginLeft: '5px'}}>1h 36m</span>
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
    Released November 25, 2021
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



      <RattingsScreen></RattingsScreen>
    </Box>
  </SwipeableDrawer>
</React.Fragment>



)}