import React from 'react'

import { useEffect, useState, createContext } from "react"
import { useNavigate } from "react-router-dom"


import { deepPurple, grey, pink  } from "@mui/material/colors";
import {  Typography, Box } from "@mui/material";

import styled from "styled-components";

import MovieCarrocel from "../MovieCarrocel";
import GenreCarrocel from "../GenreCarrocel";


import MovieScreen from "../Screen/MovieScreen";
import { theme } from '../../theme';


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
      const url = `https://popfix.onrender.com/movies/sample/random`
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
      const url = `https://popfix.onrender.com/movies/${page}/genres?genre=${genre}`
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
    const res = await fetch(`https://popfix.onrender.com/movies/${page}/genres?genre=${genre}`, {
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
      
      
   
     
      <div 
      style={{ width: '100%', height: '100%', overflowY:'scroll',paddingBottom: '20px'}}>

       <div style={{position: 'relative', width: '100vw', height: 'fit-content',  
       display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
       background: 'radial-gradient(circle, rgba(66,55,106,1) 0%, rgba(44,37,74,1) 45%, rgba(39,32,66,1) 100%)'
       }}>


        <div style={{width: '100%', height: '220px', position: 'relative', overflow: 'hidden'}}>



      
      <div style={{width: '240px', borderRadius: '20px', height: '220px', background: 'blue', overflow: 'hidden', position: 'absolute',
        inset: '0 0 0 0', margin: 'auto',
        boxShadow: 'rgba(50, 50, 93, 0.4) 0px 50px 100px -20px, rgba(0, 0, 0, 0.5) 0px 30px 60px -30px',
       }}>
      <img
      style={{width: '100%', height: '100%'}}
      src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/F3A06E15EE141CF4BAC34B4FAB7FBE5F7E3757D0CE5EDF869800FA6A862D9368/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp" alt="" />
      </div>

      <div style={{width: '225px', borderRadius: '20px', height: '180px', background: 'blue', overflow: 'hidden', position: 'absolute',
        inset: '0 0 0 -160%', margin: 'auto'}}>
      <img
      style={{width: '100%', height: '100%'}}
      src="https://rukminim2.flixcart.com/image/850/1000/kzzw5u80/poster/o/r/b/medium-joker-the-dark-knight-movie-on-fine-art-paper-hd-quality-original-imagbvmycjvpv5ph.jpeg?q=90&crop=false" alt="" />
      </div>
      <div style={{width: '225px', borderRadius: '20px', height: '180px', background: 'blue', overflow: 'hidden', position: 'absolute',
        inset: '0 -160% 0 0%', margin: 'auto'}}>
      <img
      style={{width: '100%', height: '100%'}}
      src="https://support.musicgateway.com/wp-content/uploads/2021/05/cyberpunk-movies-thumbnail-large-2.png" alt="" />
      </div>

      </div>

      <div style={{width: '100%', height: '30px', display: 'flex', gap: '7px', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'white'}}></div>
        <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'white'}}></div>
        <div style={{width: '8px', height: '8px', borderRadius: '50%', background: theme.palette.purple_normal}}></div>
        <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'white'}}></div>
        <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'white'}}></div>
      </div>

       </div>



{/* <Box sx={{ mt: 1, width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography sx={{p:0,m:0,color: grey[200], fontWeight: '600', fontSize: '1.6em'}} variant="h4" gutterBottom>
Released This Year
</Typography>
<Typography sx={{p:0,m:0,color: grey[300], fontWeight: '500', fontSize: '.9em', textDecoration: 'underline'}} variant="subtitle1" gutterBottom>
See all
</Typography>
</Box> */}

<TopMoviesContext.Provider value={{TopMovies, topMoviesLoading}}>


<GenreCarrocel runGenreChange={runGenreChange} genre={genre} loading={moviesLoading}></GenreCarrocel>
  <MovieCarrocel finite={false} loading={moviesLoading} movies={movies} getMoreMovies={getMoreMovies}/>

  <Typography sx={{
    padding: '10px',
    color: 'white',
    fontWeight: 700,
    fontSize: '1.5em'
  }}>TOP 10</Typography>
<MovieCarrocel loading={topMoviesLoading} movies={TopMovies}/>

  <MovieScreen/>


  </TopMoviesContext.Provider>
  </div>
    )
}

export default MainPage
