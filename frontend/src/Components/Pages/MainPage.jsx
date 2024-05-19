
import { useEffect, useState, createContext } from "react"
import { useNavigate } from "react-router-dom"



import { grey,  } from "@mui/material/colors";
import {  Typography, Box, Skeleton } from "@mui/material";
// import { movies_mock } from "../../moviesmock";
import styled from "styled-components";

import MovieCarrocel from "../MovieCarrocel";
import GenreCarrocel from "../GenreCarrocel";
import MainCarrocel from "../MainCarrocel";
import { useSearchParams } from 'react-router-dom'; // Import hook
import MovieScreen from "../MovieScreen";

export const Loadingtctx = createContext();
export const MoviesContext = createContext()
export const MovieContext = createContext()
export const RatingsContext = createContext()

export default function MainPage() {
 
  
  const [movies, setMovies] = useState([{},{},{},{},{},{},{},{},{},{},])
  const [loadingt, setloadingt] = useState(true)
  const [genre, setGenre] = useState('Animation')
  const [page, setPage] = useState(1)
  const [end, setEnd] = useState(false)
  const [movieCarrocelLeft, setMovieCarrocelLeft] = useState(1000)
  
  const [isMovieContainerOpen, setIsMovieContainerOpen] = useState(false);
  const [movie, setMovie]= useState({})
  const [movieLoading, setMovieLoading]= useState(false)

  const [ratingsPage, setRatingsPage] = useState(1)
  const [isRatingsEnd, setIsRatingsEnd] = useState(false)
  const [isRatingsContainerOpen, setIsRatingsContainerOpen] = useState(false);
  const [ratings, setRatings] = useState([])
  const [ratingsLoading, setRatingsLoading] = useState(false)

  function runGenreChange(g){
    setMovies([{},{},{},{},{},{},{},{},{},{},])
    setloadingt(true)
    setEnd(false)
    setPage(prev_page => {return 1})
    setGenre(prev_g => {return g}) // Fires UseEffect
    localStorage.setItem('genre_from_main', g)
  }

  async function handleOpenAndGetMovie(id){
    setMovieLoading(true)
    setIsMovieContainerOpen(true)
    const url = `http://localhost:3001/movie/${id}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })

      setTimeout(async() => {
        if (res.status == 200) {
        const data = await res.json()
        setMovie(data)
      }
      setMovieLoading(false)
    }, 2500);
  }

  function handleCloseMovie(){
    console.log('closing movie')
    setMovieLoading(false)
    setIsMovieContainerOpen(false)
    setMovie({})
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


  useEffect(()=>{
    const getFirstMovies = async () => {
      const url = `http://localhost:3001/movies/${page}/genres?genre=${genre}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        if (data.length < 20){
          setEnd(true)
        }       
          setPage(prev_page => {return prev_page + 1})
          setMovies(data)
          setloadingt(false)
       
      }
    }
    getFirstMovies()
  }, [genre])

  const getMoreMovies = async () => {
    if (end) return
    console.log('geting more')
    const res = await fetch(`http://localhost:3001/movies/${page}/genres?genre=${genre}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (res.status == 200) {
      const data = await res.json()
      if (data.length < 20){
        setEnd(true)
      }
      setPage(prev_page => {return prev_page + 1})
      setMovies([...movies, ...data])
    }
  }

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


    return (
      
      <MoviesContext.Provider value={{getMoreMovies, movies}}>


      
      <MovieContext.Provider value={{movieLoading, isMovieContainerOpen, movie, handleOpenAndGetMovie, handleCloseMovie}}>
      <Loadingtctx.Provider value={{loadingt, setloadingt}} >


<MainCarrocel></MainCarrocel>
<GenreCarrocel runGenreChange={runGenreChange} genre={genre}></GenreCarrocel>

  <MovieCarrocel 
  movieCarrocelLeft={movieCarrocelLeft} 
  setMovieCarrocelLeft={setMovieCarrocelLeft} 
  getMoreMovies={getMoreMovies}
   movies={movies} />




<Box sx={{background: 'red', mt: 3, width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography sx={{p:0,m:0,color: grey[200], fontWeight: '500', fontSize: '1.5em'}} variant="h4" gutterBottom>
Trending Now
</Typography>
<Typography sx={{p:0,m:0,color: grey[300], fontWeight: '500', fontSize: '.9em', textDecoration: 'underline'}} variant="subtitle1" gutterBottom>
See all
</Typography>
</Box>

<RatingsContext.Provider value={{getMoreRatings, isRatingsEnd, isRatingsContainerOpen, setIsRatingsContainerOpen, ratings, handleOpenAndGetRatings, handleCloseRatings }} >
  <MovieScreen/>
</RatingsContext.Provider>

      
</Loadingtctx.Provider>
</MovieContext.Provider>
  </MoviesContext.Provider>
    )
}
