
import { useEffect, useState, useContext, createContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../App";

import { grey,  } from "@mui/material/colors";
import {  Typography, Box, Skeleton } from "@mui/material";
// import { movies_mock } from "../../moviesmock";
import styled from "styled-components";

import MovieCarrocel from "../MovieCarrocel";
import GenreCarrocel from "../GenreCarrocel";
import MainCarrocel from "../MainCarrocel";
import { useSearchParams } from 'react-router-dom'; // Import hook
import BottomSwipeable from "../BottomSwipeable";


export const Loadingtctx = createContext();
export const BottomBarCtx = createContext()

export default function MainPage() {
 
  const [bottomState, setBottomState] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const {auth, setAuth} = useContext(AuthContext)
  const navigator = useNavigate()
  const [movies, setMovies] = useState([])
  const [loadingt, setloadingt] = useState(true)
  const [genre, setGenre] = useState(null)
  const [page, setPage] = useState(1)
  const [end, setEnd] = useState(false)
  const [movieCarrocelLeft, setMovieCarrocelLeft] = useState(1000)
  
  const [currentBottomMovie, setCurrentBottomMovie]= useState({}) 
  const [bottomMovieLoading, setBottomMovieLoading]= useState({}) 

  function runGenreChange(g){
    setMovies([])
    setloadingt(true)
    setEnd(false)
    setPage(prev_page => {return 1})
    setGenre(prev_g => {return g}) // Fires UseEffect
    localStorage.setItem('genre_from_main', g)
  }

  async function getBottomMovie(id){
    setBottomMovieLoading(true)
    setBottomState(true) // open bottom bar
    const url = `http://localhost:3001/movie/${id}`
      const res = await fetch(url, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        console.log(data)
        setCurrentBottomMovie(data)
      }

  }

  useEffect(()=>{
    // const value = searchParams.get('genre')  || 'Animation'
    const value = localStorage.getItem('genre_from_main') || 'Animation'
    setGenre(value);
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
        if (data.length < 20){
          setEnd(true)
        }
   
          
          console.log(data)
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
    
      console.log(data)
      setPage(prev_page => {return prev_page + 1})
      setMovies([...movies, ...data])
     
    }
  }


    return (
      
      <BottomBarCtx.Provider value={{movie: currentBottomMovie, openBottomBar: getBottomMovie}}>
      <Loadingtctx.Provider value={{loadingt, setloadingt}} >
<div style={{minHeight: '100%',height: 'fit-content', backgroundColor: '#161616', width: '100%',
 
paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px'
}}>


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

{/* <MovieCarrocel getMoreMovies={getMoreMovies} movies={movies} /> */}




<BottomSwipeable state={bottomState} setState={setBottomState}/>

      


 
</div>
</Loadingtctx.Provider>
</BottomBarCtx.Provider>
    )
  }

const Wrapper = styled.div`
  background: red;
  width: 100vw;
  height: 145px;
  position: relative;
  overflow: scroll;
`

const CardsWrapper = styled.div`
  background: yellow;
  position: absolute;
  left: 0;
  width: fit-content;
  height: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const MovieCard = styled.img`
    width: 115px;
    height: 135px;
    border-radius: 15px;
    &: hover {
      filter: brightness(1.1);
      cursor: pointer;
    }
`
