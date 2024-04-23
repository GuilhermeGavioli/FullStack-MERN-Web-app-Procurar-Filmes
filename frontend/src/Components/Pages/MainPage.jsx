
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { AuthContext } from "../../App";
import MovieCard from "../MovieCard";
import { grey } from "@mui/material/colors";
// import { movies_mock } from "../../moviesmock";


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
        image: "https://www.allposters.com/-st/Princess-Bride-Posters_c1718_.htm",
        rating: 5
      },
      {
        id: "mov_2",
        name: "Spirited Away",
        description: "A young girl enters the spirit world and works in a bathhouse to free her parents.",
        image: "https://www.amazon.com/Spirited-Away-Movie-Poster/s?k=Spirited+Away+Movie+Poster",
        rating: 4
      },
      {
        id: "mov_3",
        name: "The Shawshank Redemption",
        description: "A wrongly convicted man befriends a fellow prisoner and fights for his freedom.",
        image: "https://www.amazon.com/Shawshank-Redemption-poster/s?k=The+Shawshank+Redemption+poster",
        rating: 5
      },
      {
        id: "mov_4",
        name: "Amélie",
        description: "A quirky waitress in Paris decides to secretly improve the lives of those around her.",
        image: "https://www.redbubble.com/shop/amelie+posters",
        rating: 4
      },
      {
        id: "mov_5",
        name: "Inception",
        description: "A professional thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        image: "https://www.amazon.com/inception-movie-poster/s?k=inception+movie+poster",
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
  
<>
    
      <div style={{backgroundColor: grey[900], paddingTop: '70px', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        {movies.map((movie, i) => {
          return (
     
              <MovieCard key={i} title={movie.name} description={movie.description}></MovieCard>
           
          )
        }) }
      </div>
  
</>
    )
  }