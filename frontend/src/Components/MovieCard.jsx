import { Skeleton } from '@mui/material';
import Fab from '@mui/material/Fab';

import { grey } from '@mui/material/colors';
import { useContext } from 'react';
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loadingtctx } from './Pages/MainPage';
import { BottomBarCtx } from './Pages/MainPage';

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
  const { openBottomBar } = useContext(BottomBarCtx)

  const navigator = useNavigate()


  function viewMovie(){
    openBottomBar(movie?._id)
    // navigator(`/movie/${movie?._id}`)
  }

return (


    
    
    <Movie src={movie?.cover} onClick={viewMovie}/>
     
  
      
    


     
  )
}

