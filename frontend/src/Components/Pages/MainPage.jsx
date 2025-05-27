import React from 'react'

import { useEffect, useState, createContext } from "react"
import { useNavigate } from "react-router-dom"


import {  grey, pink  } from "@mui/material/colors";
import {  Typography, Box } from "@mui/material";

import styled from "styled-components";

import MovieCarrocel from "../MovieCarrocel";
import GenreCarrocel from "../GenreCarrocel";


import MovieScreen from "../Screen/MovieScreen";


import { AuthContext } from '../Contexts/AuthContext';
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
export const TopMoviesContext = createContext()
export const MoviesContext = createContext()



function MainPage() {
  const {user, userLoading, auth} = useContext(AuthContext)
  const {currentTheme} = useContext(ThemeContext)
  const [movies, setMovies] = useState([{id:1},{id:2},{id:3},{id:4},])
  const [moviesLoading, setMoviesLoading] = useState(true)
  const [moviesRetry, setMoviesRetry] = useState(false)
  const [genre, setGenre] = useState('Animation')
  const [page, setPage] = useState(1)
  const [end, setEnd] = useState(false)


  // const [isMovieContainerOpen, setIsMovieContainerOpen] = useState(false);
  // const [movie, setMovie]= useState({})
  // const [movieLoading, setMovieLoading]= useState(false)

  const [randomMovies, setRandomMovies] = useState([{id:1},{id:2},{id:3},{id:4}])
  const [randomMoviesLoading, setRandomMoviesLoading] = useState(true)
  const [randomMoviesRetry, setRandomMoviesRetry] = useState(false)

  const [oldMovies, setOldMovies] = useState([{id:1},{id:2},{id:3},{id:4}])
  const [oldMoviesLoading, setOldMoviesLoading] = useState(true)
  const [oldMoviesRetry, setOldMoviesRetry] = useState(false)

  function runGenreChange(g){
    setMovies([{id:1},{id:2},{id:3},{id:4}])
    setMoviesLoading(true)
    setEnd(false)
    setPage(prev_page => {return 1})
    setGenre(prev_g => {return g}) // Fires UseEffect
    localStorage.setItem('genre_from_main', g)
  }

    const getFirstMovies = async () => {
    const url = `http://localhost:80/movies/${page}/genres?genre=${genre}`
    const res = await fetch(url, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  if (res.status == 200) {
    const data = await res.json()
    
    if (data?.length < 20){
      setEnd(true)
    }       
    if (page == 1) {
      console.log('setting to empty')
      setMovies(() => {return []})

    }
    setPage(prev_page => {return prev_page + 1})
    setMovies(() => {return data})
    setMoviesLoading(false)
    
  } else if (res.status == 403){
    console.log('AUTH ERR')
  } 
  else {
    setMovies([])
    setMoviesLoading(false)
    setMoviesRetry(true)
  }
  }
  useEffect(()=>{
        if ( !userLoading && !auth ) {
          setMovies([])
          setMoviesLoading(false)
      return
    } 
    console.log('main page use effect')
       setGenre(localStorage.getItem('genre_from_main') || 'Animation')
    try{
      getFirstMovies()
    } catch(err){
      console.log('catchinggg')
       setMovies([])
        setMoviesLoading(false)
        setMoviesRetry(true)
    }
  }, [genre])
  async function retry(){
    setMovies([{id:1},{id:2},{id:3},{id:4}])
    setMoviesRetry(false)
    setMoviesLoading(true)
    await getFirstMovies()
  }



  async function getRandomSample(){

    const url = `http://localhost:80/movies/sample/random`
  const res = await fetch(url, {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
    if (res.status == 200) {
    const data = await res.json()
    setRandomMovies(data)
    setRandomMoviesLoading(false)
  } else {
      setRandomMovies([])
      setRandomMoviesLoading(false)
      setRandomMoviesRetry(true)
  }
  }
  useEffect(()=> {
            if ( !userLoading && !auth ) {
          setRandomMovies([])
          setRandomMoviesLoading(false)
      return
    } 
    try{
      getRandomSample()
    } catch(e){
      setRandomMovies([])
      setRandomMoviesLoading(false)
      setRandomMoviesRetry(true)
    }
  }, [])
  async function retryRandomMovies(){
    setRandomMovies([{id:1},{id:2},{id:3},{id:4}])
    setRandomMoviesRetry(false)
    setRandomMoviesLoading(true)
    await getRandomSample()
  }


  async function getOldies(){

      const url = `http://localhost:80/movies/sample/olddies`
    const res = await fetch(url, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      if (res.status == 200) {
      const data = await res.json()
      setOldMovies(data)
      setOldMoviesLoading(false)
    } else {
       setOldMovies([])
      setOldMoviesLoading(false)
      setOldMoviesRetry(true)
    }
  }
  useEffect(()=> {
                if ( !userLoading && !auth ) {
          setOldMovies([])
          setOldMoviesLoading(false)
      return
    } 
    try{
      getOldies()
    } catch(err){
      setOldMovies([])
      setOldMoviesLoading(false)
      setOldMoviesRetry(true)
    }
  }, [])
  async function retryOldMovies(){
    setOldMovies([{id:1},{id:2},{id:3},{id:4}])
    setOldMoviesRetry(false)
    setOldMoviesLoading(true)
    await getOldies()
  }




  const getMoreMovies = async () => {
    if (end) return
    console.log('geting more')
    const res = await fetch(`http://localhost:80/movies/${page}/genres?genre=${genre}`, {
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
      setMovies([...movies.filter(movie => movie.title), ...data])
    }
  }


    return (
      
      
   
     
      <div 
      style={{ width: '100%', height: '100%',overflowX: 'hidden', overflowY:'scroll',paddingBottom: '50px'}}>

       <div style={{position: 'relative', width: '100vw', height: 'fit-content',  
       display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
       background: 'radial-gradient(circle, rgba(66,55,106,1) 0%, rgba(44,37,74,1) 45%, rgba(39,32,66,1) 100%)'
       }}>




       </div>



{/* <Box sx={{ mt: 1, width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography sx={{p:0,m:0,color: grey[200], fontWeight: '600', fontSize: '1.6em'}} variant="h4" gutterBottom>
Released This Year
</Typography>
<Typography sx={{p:0,m:0,color: grey[300], fontWeight: '500', fontSize: '.9em', textDecoration: 'underline'}} variant="subtitle1" gutterBottom>
See all
</Typography>
</Box> */}

<TopMoviesContext.Provider value={{TopMovies: randomMovies, topMoviesLoading: randomMoviesLoading}}>

  <Typography sx={{
    paddingLeft: '12px',
    paddingTop: '7px',
    color: currentTheme.palette.contra,
    fontWeight: 600,
    fontSize: '1.6em'
  }}>Categorias</Typography>
<GenreCarrocel moviesRetry={moviesRetry} runGenreChange={runGenreChange} genre={genre} loading={moviesLoading}></GenreCarrocel>
  <MovieCarrocel finite={false} loading={moviesLoading} moviesRetry={moviesRetry} retry={retry}
   movies={movies} getMoreMovies={getMoreMovies}/>

  <Typography sx={{
    paddingLeft: '12px',
    paddingTop: '7px',
    color: currentTheme.palette.contra,
    fontWeight: 600,
    fontSize: '1.5em'
  }}>Random Sample</Typography>
<MovieCarrocel loading={randomMoviesLoading} movies={randomMovies} moviesRetry={randomMoviesRetry} retry={retryRandomMovies}/>


<Typography sx={{
  paddingLeft: '10px',
  color: currentTheme.palette.contra,
  fontWeight: 600,
  paddingTop: '7px',
    fontSize: '1.5em'
  }}>Amostra de Antigos (1950)</Typography>
<MovieCarrocel moviesRetry={oldMoviesRetry} retry={retryOldMovies} loading={oldMoviesLoading} movies={oldMovies}/>



  <MovieScreen draggable='false'/>


  </TopMoviesContext.Provider>
  </div>
    )
}

export default MainPage
