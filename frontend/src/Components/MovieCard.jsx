import { Skeleton } from '@mui/material';
import Fab from '@mui/material/Fab';

import { grey } from '@mui/material/colors';

import styled from 'styled-components'

import { useContext } from 'react';
import { MovieContext } from './Contexts/MovieContext';

const Movie = styled.img`
    width: 115px;
    height: 135px;
    border-radius: 15px;
    &: hover {
      filter: brightness(1.1);
      cursor: pointer;
    }
`

export default function MovieCard({movie}) {
  const { handleOpenAndGetMovie } = useContext(MovieContext)


  function viewMovie(){
    handleOpenAndGetMovie(movie?._id)
  }

return (


    
    
    <Movie src={movie?.cover} onClick={viewMovie}/>
     
  
      
    


     
  )
}

