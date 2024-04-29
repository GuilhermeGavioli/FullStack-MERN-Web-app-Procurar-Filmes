import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating } from '@mui/material';
import Fab from '@mui/material/Fab';

import { grey, amber, deepPurple } from '@mui/material/colors';
import CustomizedButton from './CustomizedButton';
import styled from 'styled-components'
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { StyledEngineProvider } from '@mui/material';

export default function MovieCard({title, description, rating}) {
  const [isHovered, setIsHovered] = useState(false)

  return (

  <Container
    onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
    >

      {/* rate */}
      <TopRate>
        <p style={{fontWeight: 700, fontSize: '1.1em', color: 'white'}}>8.9</p>
      </TopRate>



      <MaskAround>

      <BottomMask>

     
          <div style={{color: 'white', height: '100%', flexGrow: '1', overflow: 'hidden',display: 'flex', flexDirection: 'column', padding: '0 10px 0 10px' }}>
            <p style={{textOverflow: 'ellipsis', whiteSpace: 'noWrap', overflow: 'hidden', fontFamily: 'roboto', fontWeight: '700'}}>Django Unchained</p>
            <p style={{textOverflow: 'ellipsis', whiteSpace: 'noWrap', overflow: 'hidden', fontFamily: 'roboto', fontWeight: '700'}}>action</p>
            
          </div>
          {/* <div style={{padding: '0 5px 0 5px', height: '100%', width: 'fit-content', display: 'flex', alignItems: 'center'}}>
          <Fab sx={{height: '20px', width: '40px', background: amber[700], color:"white"}}>
          <FavoriteIcon size="small" color="white" sx={{height: '20px', width: '20px'}}/>

        </Fab>

          </div> */}
       
   
     
       

      </BottomMask>

      </MaskAround>
<MovieImage ishovered={`${isHovered}`}
src="" alt="" />
{/* src="https://static.hd-trailers.net/images/-142844-poster-xlarge-resized.jpg" alt="" /> */}
  </Container>



  );
}

const Container = styled.div`
background-image: blue;
width: 160px;
height: 230px;
position: relative;
overflow: hidden;
`

const TopRate = styled.div`
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
const MaskAround = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: ease-in-out 0.4s;
  background: radial-gradient(circle, rgba(0,0,0,0.17689073920583853) 0%, rgba(0,0,0,0.5326330361246061) 53%, rgba(0,0,0,0.8939775739397321) 100%); 
)}
`

const BottomMask = styled.div`
display: flex;
position: absolute;
justify-content: space-between;
bottom: 0;
width: 100%;
height: 50px;
z-index: 2;

background: linear-gradient(360deg, rgba(0,0,0,0.9079831761806285) 0%, rgba(0,0,0,0.4722128680573792) 53%, rgba(0,0,0,0) 100%); 
`

const ButtonContainer = styled(Fab)`
  width: 50px;
  height: 100%;
`

const MovieImage = styled.img`
position: absolute;
width: ${({ ishovered }) => (ishovered == "false" ? '160px' : '165px')};
height: ${({ ishovered }) => (ishovered == "false" ? '230px' : '237px')};
top: 50%;
left: 50%;
transform: ${({ ishovered }) => (ishovered == "false" ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) scale(1.05)')};

transition: ease-in-out 0.3s;

filter: ${({ ishovered }) => (ishovered == "false" ? 'brightness(0.5)' : 'brightness(1)')};
`


      {/* <Typography sx={{color: 'white', fontWeight: '700'}} variant="subtitle1" gutterBottom noWrap={true}>
        Spider Man And The Spider Verse
        </Typography>
      <Typography sx={{color: 'white', fontWeight: '700'}} variant="subtitle2" gutterBottom noWrap={true}>
        Suspense / Action
      </Typography> */}