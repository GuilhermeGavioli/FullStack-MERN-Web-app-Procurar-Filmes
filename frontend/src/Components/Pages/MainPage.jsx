
import { useEffect, useState, createContext } from "react"
import { useNavigate } from "react-router-dom"



import { grey,  } from "@mui/material/colors";
import {  Typography, Box } from "@mui/material";

import styled from "styled-components";

import MovieCarrocel from "../MovieCarrocel";
import GenreCarrocel from "../GenreCarrocel";
import MainCarrocel from "../MainCarrocel";

import MovieScreen from "../MovieScreen";


export const TopMoviesContext = createContext()
export const MoviesContext = createContext()


function MainPage() {
  
  const [movies, setMovies] = useState([{},{},{},{},{},{},{},{},{},{},])
  const [moviesLoading, setMoviesLoading] = useState(true)
  const [genre, setGenre] = useState('Animation')
  const [page, setPage] = useState(1)
  const [end, setEnd] = useState(false)

  // const [isMovieContainerOpen, setIsMovieContainerOpen] = useState(false);
  // const [movie, setMovie]= useState({})
  // const [movieLoading, setMovieLoading]= useState(false)

  const [TopMovies, setTopMovies] = useState([{},{},{},{},{},{}])
  const [topMoviesLoading, setTopMoviesLoading] = useState(true)

  function runGenreChange(g){
    setMovies([{},{},{},{},{},{},{},{},{},{},])
    setMoviesLoading(true)
    setEnd(false)
    setPage(prev_page => {return 1})
    setGenre(prev_g => {return g}) // Fires UseEffect
    localStorage.setItem('genre_from_main', g)
  }

  useEffect(()=> { //get (fake) top 10
    
    async function getTopTen(){
      const url = `http://localhost:3001/movies/sample/random`
    const res = await fetch(url, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    setTimeout(async() => {
      if (res.status == 200) {
      const data = await res.json()
      setTopMovies(data)
    }
    setTopMoviesLoading(false)
    }, 2500);
    }
    getTopTen()
  }, [])


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
        console.log(data[0]._id)
        if (data.length < 20){
          setEnd(true)
        }       
          setPage(prev_page => {return prev_page + 1})
          setMovies(data)
          setMoviesLoading(false)
       
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


    return (
      
      
      <TopMoviesContext.Provider value={{TopMovies, topMoviesLoading}}>
      <MoviesContext.Provider value={{getMoreMovies, movies}}>
  

       

<MainCarrocel></MainCarrocel>
<GenreCarrocel runGenreChange={runGenreChange} genre={genre} loading={moviesLoading}></GenreCarrocel>

  <MovieCarrocel finite={false} loading={moviesLoading} movies={movies}/>



<Box sx={{background: 'red', mt: 3, width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography sx={{p:0,m:0,color: grey[200], fontWeight: '500', fontSize: '1.5em'}} variant="h4" gutterBottom>
Trending Now
</Typography>
<Typography sx={{p:0,m:0,color: grey[300], fontWeight: '500', fontSize: '.9em', textDecoration: 'underline'}} variant="subtitle1" gutterBottom>
See all
</Typography>
</Box>

<MovieCarrocel finite={true} loading={topMoviesLoading} movies={TopMovies}/>


  <MovieScreen/>


  </MoviesContext.Provider>
  </TopMoviesContext.Provider>
 
    )
}

export default MainPage
