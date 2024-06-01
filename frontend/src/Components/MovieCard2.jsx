import { Skeleton } from '@mui/material';
import Fab from '@mui/material/Fab';

import { grey } from '@mui/material/colors';

import styled from 'styled-components'

import { useContext } from 'react';
import { MovieContext } from './Contexts/MovieContext';
import { theme } from '../theme';

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
  const { handleOpenAndGetMovie } = useContext(MovieContext)


  function viewMovie(){
    handleOpenAndGetMovie(movie?._id)
  }

return (


         
    <div  onClick={viewMovie} key={movie._id} style={{width: '100%', background: theme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <img src={movie?.cover} style={{width: '80px', height: '100px', background: theme.palette.light, borderRadius: '15px'}} />
    <div style={{padding: '10px'}}>
      <p style={{color: 'white', fontWeight: 500}}>Titulo Legalzao</p>
      <p style={{color: 'white', fontWeight: 500, fontSize: '0.9em', marginTop: '5px'}}>{movie?.genres[0]}</p>
      <p style={{color: 'white', fontWeight: 500, fontSize: '0.8em', marginTop: '5px'}}>{movie?.released?.slice(-4)}</p>
      <p style={{color: 'white', fontWeight: 500, fontSize: '0.8em', marginTop: '5px'}}>{movie?.runTime} min</p>
      

    </div>
</div>
      
    


     
  )
}

