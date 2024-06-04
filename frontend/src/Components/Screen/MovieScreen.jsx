import * as React from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';


import { useEffect, useState, useContext } from "react"




import { grey } from "@mui/material/colors";
import {  Button, Divider, Skeleton, Typography, styled as MUIStyled } from "@mui/material";
import styled from "styled-components";
import RattingsScreen from './RattingsScreen';
import ActorCard from "../ActorCard";
import Box from "@mui/material/Box";

import { createContext } from 'react';

import { MovieContext } from '../Contexts/MovieContext';
import { theme } from '../../theme';

import Slide from '@mui/material/Slide';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';






const Wrapper = styled.div`
    width: 100%;
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
    font-weight: 500;
    font-family: roboto;
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const RatingsContext = createContext()

export default function MovieScreen() {
  const { movieLoading, isMovieContainerOpen, movie, handleCloseMovie } = useContext(MovieContext)

  const [ratingsPage, setRatingsPage] = useState(1)
  const [isRatingsEnd, setIsRatingsEnd] = useState(false)
  const [isRatingsContainerOpen, setIsRatingsContainerOpen] = useState(false);
  const [ratings, setRatings] = useState([])
  const [ratingsLoading, setRatingsLoading] = useState(false)
  const [loadingMoreRatings, setLoadingMoreRatings] = useState(false)

  async function handleOpenAndGetRatings(){
    setRatingsLoading(true)
    setLoadingMoreRatings(true)
    console.log('movie?._id')
    console.log(movie?._id)
    console.log(ratingsPage)
    setIsRatingsContainerOpen(true)
    const url = `https://popfix.onrender.com/ratings/${movie?._id}?page=${ratingsPage}`
      const res = await fetch(url, {
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
  };

  
  const getMoreRatings = async () => {
    console.log('firing gettting more ratings')
    if (isRatingsEnd || loadingMoreRatings) return
    setLoadingMoreRatings(true)
    const res = await fetch(`https://popfix.onrender.com/ratings/${movie?._id}?page=${ratingsPage}`, {
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

<div style={{height: '40px', width: '40px', background: 'rgba(51,46,89,0.7)', position: 'absolute', top: '15px', left: '10px', zIndex: 3, 
display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}}>
{/* theme.palette.mid */}
    <ChevronLeftIcon onClick={toggleDrawer(false)}  sx={{color: 'white', fontSize: '2em'}}></ChevronLeftIcon>
</div>

 <RatingsContext.Provider value={{loadingMoreRatings,
   getMoreRatings, isRatingsEnd, isRatingsContainerOpen, setIsRatingsContainerOpen, 
   ratings, setRatings, handleOpenAndGetRatings, handleCloseRatings }} >
      <RattingsScreen></RattingsScreen>
</RatingsContext.Provider>






      {/* <img style={{borderRadius: '0 0 25px 25px', width: '100%'}} src={"https://lumiere-a.akamaihd.net/v1/images/encanto_ka_bpo_pay1_ee2c2e0c.jpeg?region=0,225,1080,1046&width=960"} alt="" /> */}
{
  movieLoading ?
  <Skeleton animation="wave" sx={{background: grey[900], borderRadius: '0 0 25px 25px'}} variant="rectangular" width={'100%'} height={'280px'} />
  :

  <div style={{position: 'relative', width: '100%', maxWidth: '300px', height: '350px', margin: 'auto',}}>

    <div style={{position: 'absolute', inset: 'auto 0 20px 0', 
    width: '280px', maxWidth: '100%', minHeight: '50px', height: 'fit-content', background: 'rgba(240,240,240,0.1)', zIndex: '2', margin: 'auto',borderRadius: '15px',
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
        <p>{movie?.released}</p>
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
<div style={{padding: '0 20px 0 20px', width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'start', 
margin: 'auto',justifyContent: 'flex-start', }}>
        <Typography variant="body1" gutterBottom sx={{fontWeight: '600', color: theme.palette.purple_title}}>
          Plot
      </Typography>
        <Typography variant="body2" gutterBottom sx={{ fontWeight: '500', textAlign: 'justify', 
          
          wordSpacing: '1px', textAlign: 'justify', fontWeight: 400, fontSize: '.8em', color: 'rgb(227,226,230)', lineHeight: '22px'
        }}>
        {movie?.description} 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam accusantium soluta placeat, debitis distinctio sed temporibus harum iusto iste quibusdam quidem minus, ullam repellendus nobis possimus impedit corrupti perferendis neque.
      </Typography>
     </div>

}



      <div style={{width: 'fit-content', display: 'flex', gap: '15px',
       width: '100vw', overflowX: 'scroll', overflowY: 'hidden',
       height: 'fit-content',
       msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  padding: '0 20px 0 20px',
  margin: '20px 0 0 0',
    }}>
      <div style={{width: 'fit-content', height: 'fit-content', display: 'flex', gap: '20px'}}>

        <div style={{display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
      <Typography variant="body1" gutterBottom sx={{fontWeight: '600', color: theme.palette.purple_title}}>
          Director
      </Typography>
      <p style={{whiteSpace: 'nowrap', fontWeight: 400, fontSize: '.8em', color: 'rgb(227,226,230)'}}>Andy Serkis</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'column',width: 'fit-content'}}>
      <Typography variant="body1" gutterBottom sx={{fontWeight: '600', color: theme.palette.purple_title}}>
          Mainrole
      </Typography>
      <p style={{whiteSpace: 'nowrap',fontWeight: 400, fontSize: '.8em', color: 'rgb(227,226,230)'}}>Kelly Marcel</p>

        </div>
        <div style={{display: 'flex', flexDirection: 'column',width: 'fit-content'}}>
      <Typography variant="body1" gutterBottom sx={{fontWeight: '600', color: theme.palette.purple_title}}>
          Production
      </Typography>
      
      <p style={{whiteSpace: 'nowrap',fontWeight: 400, fontSize: '.8em', color: 'rgb(227,226,230)'}}>Columbia Pictures</p>
        </div>
    


        </div>
      </div>


<div style={{padding: '0 20px 0 20px', width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'start', 
margin: 'auto',justifyContent: 'flex-start', marginTop: '20px' }}>

<Typography variant="body1" gutterBottom sx={{fontWeight: '600', color: theme.palette.purple_title}}>
          Cast
      </Typography>
</div>

    <div style={{width: 'fit-content', display: 'flex', gap: '15px',
       width: '100vw', overflowX: 'scroll', overflowY: 'hidden',
       height: 'fit-content',
       msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  padding: '0 20px 0 20px',
  margin: '5px 0 40px 0',
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
        // movie?.actors?.map((actor, i) => {
          // return (
            <React.Fragment>

            <ActorCard 
            
            picture={'https://m.media-amazon.com/images/M/MV5BYTdlMzNkODUtZTA2My00NzJhLTkwMjAtMzk4MWQ0MDQzMGNiXkEyXkFqcGdeQXVyNDY1Njg3OA@@._V1_FMjpg_UX1000_.jpg'}
           
             ></ActorCard>
            <ActorCard 
            
             picture={'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/05/200619093245-jamie-foxx-0222-e1690023305618.jpg?w=1200&h=1200&crop=1'}
            
             ></ActorCard>
            <ActorCard 
            
             picture={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROilTPHDFFMUm0eETL8ENzSJNdsTpGqGpPug&s'}
            
             ></ActorCard>
            <ActorCard 
            
             picture={'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1230039869.jpg?crop=1xw:1.0xh;center,top&resize=640:*'}
            
             ></ActorCard>
              <ActorCard 
            
            picture={'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/05/200619093245-jamie-foxx-0222-e1690023305618.jpg?w=1200&h=1200&crop=1'}
           
            ></ActorCard>

             </React.Fragment>
          // )
        // })}
        }
        
        </div>
      </div>

     

    </Box>
  </SwipeableDrawer>
</React.Fragment>



)}