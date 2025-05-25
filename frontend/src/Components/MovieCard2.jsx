import { Skeleton } from '@mui/material';
import Fab from '@mui/material/Fab';

import { grey } from '@mui/material/colors';

import styled from 'styled-components'

import { useContext } from 'react';
import { MovieContext } from './Contexts/MovieContext';
import { theme } from '../theme';
import { ThemeContext } from './Contexts/ThemeContext';

const Movie = styled.img`
    width: 150px;
    height: 220px;
    border-radius: 0px;
    &: hover {
      filter: brightness(1.1);
      cursor: pointer;
    }
`

export default function MovieCard2({movie}) {
   const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
  const { handleOpenAndGetMovie } = useContext(MovieContext)


  function viewMovie(){
    handleOpenAndGetMovie(movie?._id)
  }

return (


         
    <div  onClick={viewMovie} key={movie._id} style={{width: '100%', background: currentTheme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <img src={movie?.cover} style={{width: '80px', height: '100px', background: currentTheme.palette.light, borderRadius: '15px'}} />
    <div style={{padding: '10px'}}>
      <p style={{color: 'white', fontWeight: 500}}>{movie?.title}</p>
      <p style={{color: 'white', fontWeight: 500, fontSize: '0.9em', marginTop: '5px'}}>{movie?.genres ? movie?.genres[0] : ''}</p>
      <p style={{color: 'white', fontWeight: 500, fontSize: '0.8em', marginTop: '5px'}}>{movie?.released}</p>
      <p style={{color: 'white', fontWeight: 500, fontSize: '0.8em', marginTop: '5px'}}>{movie?.runTime} min</p>
      

    </div>
</div>
      
    


     
  )
}

