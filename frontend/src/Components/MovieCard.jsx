import { Skeleton } from '@mui/material';
import Fab from '@mui/material/Fab';

import { grey } from '@mui/material/colors';

import styled from 'styled-components'

import { useContext } from 'react';
import { MovieContext } from './Contexts/MovieContext';
import { theme } from '../theme';


const Movie = styled.img`
  user-select: unset;
  border-radius: 15px;
  &: hover: {
    filter: brightness(1.1);
    cursor: pointer;
  }

  ${theme.breakpoints.down('md')} {
      width: 135px;
      height: 160px;
      max-width: 150px;
  }

  ${theme.breakpoints.up('md')} {
      width: 135px;
      height: 155px;
  }

  ${theme.breakpoints.up('lg')} {
    width: 160px;
    height: 185px;
}
`
  // 115
  // 135

export default function MovieCard({movie}) {
  const { handleOpenAndGetMovie } = useContext(MovieContext)

  function replaceImage(el) {
    console.log(el)
    el.src = "https://www.shutterstock.com/image-vector/no-photo-blank-image-icon-260nw-1955339317.jpg";
  }

  function viewMovie(){
    handleOpenAndGetMovie(movie?._id)
  }

return (


    
    <Movie draggable='false' src={movie?.cover} onError={(e) => replaceImage(e.target)} onClick={viewMovie}/>
     
  
      
    


     
  )
}

