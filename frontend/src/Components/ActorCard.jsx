import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating } from '@mui/material';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';

import { grey, amber, deepPurple } from '@mui/material/colors';
import CustomizedButton from './CustomizedButton';
import styled from 'styled-components'
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { StyledEngineProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ActorCard({name, picture, role}) {
  const [isHovered, setIsHovered] = useState(false)
  const navigator = useNavigate()

  function viewMovie(){
    navigator(`/movie/`)
  }

  return (

  <Container
  onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
      {/* <MaskAround> */}
      


      {/* </MaskAround> */}
<MovieImage src={picture} alt="" />
<Stack spacing={.1} sx={{flexGrow: 1, padding: '10px' }}> 
  <p style={{fontSize: '.9em', fontWeight: 600, color: grey[400]}}>Diretor</p>
    <p style={{color: grey[200], fontSize: '.8em'}}>Paul Lyan</p>
</Stack>
  </Container>



  );
}

const Container = styled.div`
background-image: blue;
width: 100px;
height: fit-content;
display: flex;
flex-direction: column;
gap: 5px;
overflow: hidden;
background: ${grey[900]};
background: none;
cursor: pointer;
border-radius: 10px;
`

const RateCard = styled.div`
display: flex;
 justify-content: center; 
 align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  z-index: 3;
  border-radius: 0px;
  background: ${deepPurple[900]}; 
)}
`

const MovieImage = styled.img`
width: 100%;
height: 120px;
`


      {/* <Typography sx={{color: 'white', fontWeight: '700'}} variant="subtitle1" gutterBottom noWrap={true}>
        Spider Man And The Spider Verse
        </Typography>
      <Typography sx={{color: 'white', fontWeight: '700'}} variant="subtitle2" gutterBottom noWrap={true}>
        Suspense / Action
      </Typography> */}