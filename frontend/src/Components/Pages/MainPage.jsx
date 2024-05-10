
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { AuthContext } from "../../App";
import MovieCard from "../MovieCard";
import { grey, amber, deepPurple } from "@mui/material/colors";
import { TextField, Typography, Box } from "@mui/material";
// import { movies_mock } from "../../moviesmock";
import styled from "styled-components";
import TopBarInput from "../TopBarInput";
import BreadCrumb from "../BreadCrumb";
import CategoryBar from "../CategoryBar";
import Carrocel from '../MovieCarrocel'
import MovieCarrocel from "../MovieCarrocel";
import GenreCarrocel from "../GenreCarrocel";
import MainCarrocel from "../MainCarrocel";




export default function MainPage() {
 


  const {auth, setAuth} = useContext(AuthContext)
  const navigator = useNavigate()
  const [movies, setMovies] = useState([])

  useEffect(()=>{

    const movies_mock = [
      {
        id: "1",
        name: "The Princess Bride",
        description: "A classic comedy-fantasy about a farmhand who sets out to rescue his true love from a  dreaded pirate.",
        cover: "https://s.yimg.com/ny/api/res/1.2/ZzAHlDHi8a2xdBRRbruaYQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkyOA--/https://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/d05a3f087fa57f6d41b865d53a42a5f5",
        rate: 8.7,
        genre: 'Epic'
      },
      {
        id: "2",
        name: "Spirited Away",
        description: "A young girl enters the spirit world and works in a bathhouse to free her parents.",
        cover: "https://media.fstatic.com/m41oWJ7xSNVwMwhnoFDMVLQ8irM=/210x312/smart/filters:format(webp)/media/movies/covers/2012/06/1c6e51177f5f68e9e7913f8ca4aa7768.jpg",
        rate: 8.2,
        genre: 'Action'
      },
      {
        id: "3",
        name: "The Shawshank Redemption",
        description: "A wrongly convicted man befriends a fellow prisoner and fights for his freedom.",
        cover: "https://upload.wikimedia.org/wikipedia/en/a/ae/Naruto_Shippuden_the_Movie.jpg",
        rate: 7.8,
        genre: 'Horror'
      },
      {
        id: "4",
        name: "Amélie",
        description: "A quirky waitress in Paris decides to secretly improve the lives of those around her.",
        cover: "https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg",
        rate: 8.7,
        genre: 'Suspense'
      },
      {
        id: "5",
        name: "Inception",
        description: "A professional thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        cover: "data:image/jpeg;base64,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",
        rate: 8.9,
        genre: 'Drama'
      }
    ]
    console.log('movies_mock')
    console.log(movies_mock)
    const token = localStorage.getItem('access_token')
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
  
<div style={{minHeight: '100%',height: 'fit-content', backgroundColor: '#161616', width: '100%',
 
paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px'
}}>

<MainCarrocel></MainCarrocel>
<GenreCarrocel></GenreCarrocel>
<MovieCarrocel></MovieCarrocel>

<Box sx={{background: 'red', mt: 3, width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<Typography sx={{p:0,m:0,color: grey[200], fontWeight: '500', fontSize: '1.5em'}} variant="h4" gutterBottom>
Trending Now
</Typography>
<Typography sx={{p:0,m:0,color: grey[300], fontWeight: '500', fontSize: '.9em', textDecoration: 'underline'}} variant="subtitle1" gutterBottom>
See all
</Typography>
</Box>



<MovieCarrocel></MovieCarrocel>




      


 
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