import * as React from 'react';


import Stack from '@mui/material/Stack';

import { grey, amber, deepPurple } from '@mui/material/colors';

import styled from 'styled-components'
import { useState } from 'react';

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
<MovieImage src={picture || 'https://i.pinimg.com/originals/83/72/e9/8372e957fc617e9e956f116afd3e599b.jpg'} alt="" />

  </Container>



  );
}

const Container = styled.div`
background-image: blue;
width: fit-content;
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


const MovieImage = styled.img`
width: 50px;
height: 50px;
`


