import { grey } from '@mui/material/colors';
import { useParams, useSearchParams } from 'react-router-dom';


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MovieCard from '../MovieCard';
import { createContext, useState } from 'react';
import MovieScreen from '../MovieScreen';

export const MovieContext = createContext()
export const RatingsContext = createContext()



export default function SearchPage() {
    const [searchParams] = useSearchParams();
     const search_query = searchParams.get('search_query');

     const [ratingsPage, setRatingsPage] = useState(1)
     const [isRatingsEnd, setIsRatingsEnd] = useState(false)
     const [isRatingsContainerOpen, setIsRatingsContainerOpen] = useState(false);
     const [ratings, setRatings] = useState([])
     const [ratingsLoading, setRatingsLoading] = useState(false)

  const [movie, setMovie] = useState({
    _id: '664be0d2b343aace853dde85',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s',
  })
  const [movieLoading, setMovieLoading] = useState(true)
  const [isMovieContainerOpen, setIsMovieContainerOpen] = useState(true)



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


  async function handleOpenAndGetRatings(){
    setRatingsLoading(true)
    setIsRatingsContainerOpen(true)
    const url = `http://localhost:3001/ratings/${movie?._id}?page=${ratingsPage}`
      const res = await fetch(url, {
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

  function handleCloseMovie(){
    setMovieLoading(false)
    setIsMovieContainerOpen(false)
    setMovie({})
  }

    return (
 

    <React.Fragment>

      <MovieCard movie={movie} alt="" />
      <MovieScreen/>

          {/* <MovieContext.Provider value={{movieLoading, isMovieContainerOpen, movie, handleOpenAndGetMovie, handleCloseMovie}}>
        <RatingsContext.Provider value={{getMoreRatings, isRatingsEnd, isRatingsContainerOpen, setIsRatingsContainerOpen, ratings, handleOpenAndGetRatings, handleCloseRatings }} >

    

        <Box sx={{ width: '100%', flexGrow: 1 }}>

      <Grid   container rowSpacing={{xs: '5px'}}  columnSpacing={{ xs: '5px', sm: 2, md: 3 }}
      sx={{background: 'red', padding: "10px", width: 'fit-content', placeContent: 'center'}}>
        
    
        
      

      </Grid>


    </Box>
        
    </RatingsContext.Provider>
    </MovieContext.Provider> */}


    </React.Fragment>
    )
}

