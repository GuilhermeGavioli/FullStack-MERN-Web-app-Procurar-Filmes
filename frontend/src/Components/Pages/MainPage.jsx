
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { AuthContext } from "../../App";
import MovieCard from "../MovieCard";
import { grey, amber } from "@mui/material/colors";
import { TextField, Typography } from "@mui/material";
// import { movies_mock } from "../../moviesmock";
import styled from "styled-components";
import banner from './banner.jpg'; // Adjust the path as needed

export default function MainPage() {

  const {auth, setAuth} = useContext(AuthContext)
  const navigator = useNavigate()
  const [movies, setMovies] = useState([])

  useEffect(()=>{

    const movies_mock = [
      {
        id: "mov_1",
        name: "The Princess Bride",
        description: "A classic comedy-fantasy about a farmhand who sets out to rescue his true love from a  dreaded pirate.",
        cover: "https://play-lh.googleusercontent.com/VgZ60UF3ZJ6D9_pOov2SILzVrBcqJmSwiswghJBKTOEKaK_iijF2NU72v74y9YxBVD4AVy7pvNYvdR7R6inG=w240-h480-rw",
        rating: 5
      },
      {
        id: "mov_2",
        name: "Spirited Away",
        description: "A young girl enters the spirit world and works in a bathhouse to free her parents.",
        cover: "https://media.fstatic.com/m41oWJ7xSNVwMwhnoFDMVLQ8irM=/210x312/smart/filters:format(webp)/media/movies/covers/2012/06/1c6e51177f5f68e9e7913f8ca4aa7768.jpg",
        rating: 4
      },
      {
        id: "mov_3",
        name: "The Shawshank Redemption",
        description: "A wrongly convicted man befriends a fellow prisoner and fights for his freedom.",
        cover: "https://play-lh.googleusercontent.com/VgZ60UF3ZJ6D9_pOov2SILzVrBcqJmSwiswghJBKTOEKaK_iijF2NU72v74y9YxBVD4AVy7pvNYvdR7R6inG=w240-h480-rw",
        rating: 5
      },
      {
        id: "mov_4",
        name: "Amélie",
        description: "A quirky waitress in Paris decides to secretly improve the lives of those around her.",
        cover: "https://media.fstatic.com/m41oWJ7xSNVwMwhnoFDMVLQ8irM=/210x312/smart/filters:format(webp)/media/movies/covers/2012/06/1c6e51177f5f68e9e7913f8ca4aa7768.jpg",
        rating: 4
      },
      {
        id: "mov_5",
        name: "Inception",
        description: "A professional thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        cover: "https://www.amazon.com/inception-movie-poster/s?k=inception+movie+poster",
        rating: 4
      }
    ]
    console.log('movies_mock')
    console.log(movies_mock)
    const token = Cookies.get('token')
    if (token){
      setAuth({...auth, isAuth: true})
    } else {
      navigator('/login')
    }
    //call the server to validate token
    //get movies data

    setMovies([...movies_mock])
    console.log(movies)

  }, [])


    return (
  
<div style={{minHeigh: '100%',height: 'fit-content', width: '100%', backgroundColor: grey[900],
backgroundColor: '#161616', 
paddingTop: '100px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px'
}}>

{/* <img src={banner} style={{width: '100%'}} alt="" /> */}

  {/* <div style={{padding: '0 10px 0 10px', width: '100%'}}>




<SearchInput placeholder="Search..." type="text" style={{marginTop: '80px', fontFamily: 'roboto', color: 'white', background: grey[800], }}/>
  </div> */}

  <div style={{height: '45px', width: '100%', padding: '0 10px 0 10px'}}>
      <div style={{width: '100%', height: '100%', background: grey[900],  borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '10px'}}>
        <p style={{fontFamily: 'roboto', color: 'white', fontWeight: '700'}}>
        Released Movies
        </p>
      </div>
  </div>
    
      <div style={{width: 'fit-content', display: 'flex', gap: '15px',
       width: '100vw', overflowX: 'scroll', overflowY: 'hidden',
       
       msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none'
    }}>
      <div style={{width: 'fit-content', height: 'fit-content', display: 'flex', padding: '0 10px 15px 10px', gap: '10px'}}>


        {movies.map((movie, i) => {
          return (
     
            <MovieCard key={i} title={movie.name} cover={movie.cover} description={movie.description}></MovieCard>
            
          )
        }) }
        </div>

      </div>

      <div style={{height: '45px', width: '100%', padding: '0 10px 0 10px'}}>
      <div style={{width: '100%', height: '100%', background: grey[900],  borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '10px'}}>
        <p style={{fontFamily: 'roboto', color: 'white', fontWeight: '700'}}>
        Popular
        </p>
      </div>
  </div>

  <div style={{width: 'fit-content', display: 'flex', gap: '15px',
       width: '100vw', overflowX: 'scroll', overflowY: 'hidden',
       
       msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none'
    }}>
      <div style={{width: 'fit-content', height: 'fit-content', display: 'flex', padding: '0 10px 15px 10px', gap: '10px'}}>


        {movies.map((movie, i) => {
          return (
     
            <MovieCard key={i} title={movie.name} cover={movie.cover} description={movie.description}></MovieCard>
            
          )
        }) }
        </div>

      </div>

      


 
</div>
    )
  }

  const SearchInput = styled.input`
  border: none;
  height: 45px;
  width: 100%;
  border-radius: 3px;
  outline: none;
  padding-left: 10px;
  &::placeholder {
    font-weight: 700;
    font-size: 1.1em;
    color: ${grey[900]};
  }
  `