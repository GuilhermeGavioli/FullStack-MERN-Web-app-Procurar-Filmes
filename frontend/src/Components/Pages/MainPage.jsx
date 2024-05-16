
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

export const Loadingtctx = createContext();


export default function MainPage() {
 


  const {auth, setAuth} = useContext(AuthContext)
  const navigator = useNavigate()
  const [movies, setMovies] = useState([])
  const [loadingt, setloadingt] = useState(true)
  const [genre, setGenre] = useState('Animation')

  useEffect(()=>{



    const getMovies = async () => {
      const res = await fetch('http://localhost:3001/movies/1/genres?genre=Animation', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()
        setMovies(data)
        setloadingt(false)
      }
    }

   
    getMovies()

  }, [])


    return (
      
      <Loadingtctx.Provider value={{loadingt, setloadingt}} >
<div style={{minHeight: '100%',height: 'fit-content', backgroundColor: '#161616', width: '100%',
 
paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px'
}}>


<MainCarrocel></MainCarrocel>
<GenreCarrocel setGenre={setGenre} genre={genre}></GenreCarrocel>
  <MovieCarrocel movies={movies} />






<Box sx={{background: 'red', mt: 3, width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography sx={{p:0,m:0,color: grey[200], fontWeight: '500', fontSize: '1.5em'}} variant="h4" gutterBottom>
Trending Now
</Typography>
<Typography sx={{p:0,m:0,color: grey[300], fontWeight: '500', fontSize: '.9em', textDecoration: 'underline'}} variant="subtitle1" gutterBottom>
See all
</Typography>
</Box>

<MovieCarrocel movies={movies} />






      


 
</div>
</Loadingtctx.Provider>
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
