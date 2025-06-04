import { grey } from '@mui/material/colors';
import styled from 'styled-components'
import { useContext } from 'react';
import { ActorContext } from './Contexts/ActorContext';

export default function ActorCard({name, picture, age, nac}) {
  const {handleOpenAndGetActor} = useContext(ActorContext)

  return (
  <Container        onClick={()=> handleOpenAndGetActor(name, picture, age, nac)}>
<MovieImage     draggable='false' src={picture || 'https://i.pinimg.com/originals/83/72/e9/8372e957fc617e9e956f116afd3e599b.jpg'} alt="" />
  </Container>
  )
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


