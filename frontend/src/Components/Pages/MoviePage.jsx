
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { AuthContext } from "../../App";
import MovieCard from "../MovieCard";
import { grey, amber, deepPurple } from "@mui/material/colors";
import { Stack, TextField, Typography } from "@mui/material";
// import { movies_mock } from "../../moviesmock";
import styled from "styled-components";
import TopBarInput from "../TopBarInput";
import BreadCrumb from "../BreadCrumb";
import { useParams } from 'react-router-dom';

import Comment from '../Comment'
import ActorCard from "../ActorCard";
import Box from "@mui/material/Box";

import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import SwipeableEdgeDrawer from "../SwipeableEdgeDrawer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';





const Wrapper = styled.div`
    background: red;
    width: 100vw;
    height: 45px;
    position: relative;
    overflow: scroll;
`

const CardsWrapper = styled.div`
    background: yellow;
    position: absolute;
    left: 0;
    width: fit-content;
    height: 100%;
    padding: 5px 10px 5px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
`

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: blue;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 15px 0 15px;
    border-radius: 13px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;
`

export default function MoviePage() {

const { id } = useParams();
  const navigator = useNavigate()
  const [movie, setMovie] = useState({actors: []})


  const movie_mock = {
      id: "1",
      title: "The Princess Bride",
      description: "A classic comedy-fantasy about a farmhand who sets out to rescue his true love from a  dreaded pirate.A classic comedy-fantasy about a farmhand who sets out to rescue his true love from a  dreaded pirate.",
      cover: "https://s.yimg.com/ny/api/res/1.2/ZzAHlDHi8a2xdBRRbruaYQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkyOA--/https://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/d05a3f087fa57f6d41b865d53a42a5f5",
      genre: 'Drama',
      rate: 8.9,
      actors: [
        {
            name: 'Martin Scorcesse',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Martin_Scorsese_Berlinale_2010_%28cropped2%29.jpg',
            role: 'Director'
        },
        {
            name: 'Martin Scorcesse',
            picture: 'https://m.media-amazon.com/images/M/MV5BOTBhMTI1NDQtYmU4Mi00MjYyLTk5MjEtZjllMDkxOWY3ZGRhXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_.jpg',
            role: 'Actor'
        },
        {
            name: 'Martin Scorcesse',
            picture: 'data:image/jpeg;base64,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',
            role: 'Actor'
        },
        {
            name: 'Martin Scorcesse',
            picture: 'https://br.web.img2.acsta.net/pictures/18/11/28/00/08/5314979.jpg',
            role: 'Actor',
        },
      ]
    }

  useEffect(()=>{
    console.log('id')
    console.log(id)
    setMovie({...movie_mock})
  }, [])

  function goToMain(){
    navigator('/')
  }


    return (
  
<div style={{minHeight: '100%',height: 'fit-content', width: '100%', backgroundColor: grey[900],
backgroundColor: '#161616', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
}}>

  <img style={{borderRadius: '0 0 25px 25px'}} src="https://lumiere-a.akamaihd.net/v1/images/encanto_ka_bpo_pay1_ee2c2e0c.jpeg?region=0,225,1080,1046&width=960" alt="" />
  
  <div style={{padding: '0 10px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
     <Typography variant="h5" gutterBottom sx={{margin: 0, padding: 0, fontWeight: 700, color: 'white'}}>
        {movie.title}
      </Typography>
     </div>
   

  <Wrapper>
            <CardsWrapper>
        <Item>
            <p>Animation</p>
        </Item> 
        <Item>
         
            <p>Drama</p>
        </Item> 
        <Item>
         
            <p>Comedy</p>
        </Item> 
        <Item>
         
            <p>Comedy</p>
        </Item> 
        </CardsWrapper>
        </Wrapper> 

        <Box sx={{ width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

<Typography sx={{color: grey[300], fontWeight: '600', fontSize: '.9em'}} variant="h4" gutterBottom>
Runtime: <span style={{fontWeight: '500', color: grey[400], marginLeft: '5px'}}>1h 36m</span>
</Typography>

<Typography sx={{color: 'blue', fontWeight: '600', fontSize: '.9em'}} variant="subtitle1" gutterBottom>
Coming Soon
</Typography>
</Box>

<div style={{padding: '0 10px 0 10px', display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'flex-start'}}>
        <Typography variant="body2" gutterBottom sx={{margin: 0, padding: 0, color: grey[600], fontWeight: '500', textAlign: 'justify'}}>
        {movie.description}
      </Typography>
     </div>

     <Box sx={{ width: '100%', maxWidth: 500, padding: '0 10px 0 10px' }}>
<Typography sx={{ fontWeight: '600', fontSize: '.9em', color: grey[300]}} variant="h4" gutterBottom>
Released November 25, 2021
</Typography>
</Box>
          


<Fab  onClick={() => goToMain()}  aria-label="add" style={{background: 'none',
 position: 'absolute', top: 10, left: 10, width: '40px', height: '30px', backdropFilter: 'blur(7px)',
 WebkitBackdropFilter: 'blur(7px)', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px'
 }}>
      
      <ArrowBackIcon sx={{color: 'white', fontWeight: '700', fontSize: '1.4em'}}/>
      </Fab>

  {/* <Fab color="primary" aria-label="add" sx={{background: 'none', position: 'absolute', top: 0, left: 0}}>
      </Fab> */}

{/* <SearchInput placeholder="Search..." type="text" style={{marginTop: '80px', fontFamily: 'roboto', color: 'white', background: grey[800], }}/> */}


    
    
<SwipeableEdgeDrawer></SwipeableEdgeDrawer>
        
    


    
 
    <div style={{width: 'fit-content', display: 'flex', gap: '15px', 
       width: '100vw', overflowX: 'scroll', overflowY: 'hidden',
       height: '250px',
       msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  padding: '0 10px 0 10px'
    }}>
      <div style={{width: 'fit-content', height: 'fit-content', display: 'flex', gap: '10px'}}>
        {movie.actors.map((actor, i) => {
          return (
     
            <ActorCard key={i} 
            name={actor.name}
             picture={actor.picture} 
             role={actor.role} 
             ></ActorCard>
            
          )
        }) }
        </div>
      </div>






   
   

      </div>

  



    )
  }

