import * as React from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';


import { useEffect, useState, useContext } from "react"




import { grey } from "@mui/material/colors";
import {  Typography } from "@mui/material";

import styled from "styled-components";





import ActorCard from "./ActorCard";
import Box from "@mui/material/Box";

import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BottomBarCtx } from './Pages/MainPage';




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

export default function BottomSwipeable({id, state, setState}) {
  const { movie } = useContext(BottomBarCtx)
 
 


  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(open);
  };

  return(

    <React.Fragment>
  <SwipeableDrawer
    anchor={'bottom'}
    open={state}
    onClose={toggleDrawer(false)}
    onOpen={toggleDrawer(true)}
    >
     <Box
    role="presentation"

    onKeyDown={toggleDrawer(false)}
    sx={{ width:'auto', height: '90vh', overflowY: 'scroll', background: 'green' }}>



<img style={{borderRadius: '0 0 25px 25px', width: '100%'}} src="https://lumiere-a.akamaihd.net/v1/images/encanto_ka_bpo_pay1_ee2c2e0c.jpeg?region=0,225,1080,1046&width=960" alt="" />
  
  <div style={{padding: '0 10px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
     <Typography variant="h5" gutterBottom sx={{margin: 0, padding: 0, fontWeight: 700, color: 'white'}}>
        {movie?.title}
      </Typography>
     </div>
  <Wrapper>
            <CardsWrapper>
              {movie?.genres?.map(genre => {
                return (
                  <Item key={genre}>
                  <p>{genre}</p>
              </Item> 
                )
              })}
        </CardsWrapper>
        </Wrapper> 
        <Box sx={{ width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography sx={{color: grey[300], fontWeight: '600', fontSize: '.9em'}} variant="h4" gutterBottom>
Runtime: <span style={{fontWeight: '500', color: grey[400], marginLeft: '5px'}}>1h 36m</span>
</Typography>
<Typography sx={{color: 'blue', fontWeight: '600', fontSize: '.9em'}} variant="subtitle1" gutterBottom>
Coming Soon
</Typography>
</Box>
<div style={{padding: '0 10px 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'flex-start'}}>
        <Typography variant="body2" gutterBottom sx={{margin: 0, padding: 0, color: grey[600], fontWeight: '500', textAlign: 'justify'}}>
        {movie?.description}
      </Typography>
     </div>
     <Box sx={{ width: '100%', maxWidth: 500, padding: '0 10px 0 10px' }}>
<Typography sx={{ fontWeight: '600', fontSize: '.9em', color: grey[300]}} variant="h4" gutterBottom>
Released November 25, 2021
</Typography>
</Box>
{/* <Fab  onClick={() => goToMain()}  aria-label="add" style={{background: 'none',
 position: 'absolute', top: 10, left: 10, width: '40px', height: '30px', backdropFilter: 'blur(7px)',
 WebkitBackdropFilter: 'blur(7px)', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px'
 }}>
      <ArrowBackIcon sx={{color: 'white', fontWeight: '700', fontSize: '1.4em'}}/>
      </Fab> */}
{/* <SwipeableEdgeDrawer></SwipeableEdgeDrawer> */}
    <div style={{width: 'fit-content', display: 'flex', gap: '15px', 
       width: '100vw', overflowX: 'scroll', overflowY: 'hidden',
       height: '250px',
       msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  padding: '0 10px 0 10px'
    }}>
      <div style={{width: 'fit-content', height: 'fit-content', display: 'flex', gap: '10px'}}>
        {movie?.actors?.map((actor, i) => {
          return (
            <ActorCard key={i} 
            name={actor.name}
             picture={actor.picture} 
             role={actor.role} 
             ></ActorCard>
          )
        }) }
        </div>
      </div>




    </Box>
  </SwipeableDrawer>
</React.Fragment>



)}