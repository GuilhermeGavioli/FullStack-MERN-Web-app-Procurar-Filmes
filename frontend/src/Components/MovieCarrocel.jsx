import styled from 'styled-components'
import MovieCard from './MovieCard';
import { useState, useContext, useRef, useEffect } from 'react';
import { Loadingtctx, MoviesContext } from './Pages/MainPage';
import { Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';


const Wrapper = styled.div`
    width: 100vw;
    height: 145px;
    position: relative;
    overflow: scroll;
    scroll-left: 1000px;
`

const CardsWrapper = styled.div`
    position: absolute;
    left: 0;
    width: fit-content;
    height: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
`

export default function MovieCarrocel({ finite = true, movies, loading }){

    const { getMoreMovies } = useContext(MoviesContext)
    const [fetchinmore, setFetchingmore ] = useState(false)

    async function fetchMoreMovies(e){
      if (finite) {
        return
      }
      const maxScroll = e.target.scrollLeftMax
      const nearEnd = (maxScroll - 500)
      if (e.target.scrollLeft >= nearEnd && !fetchinmore){
        setFetchingmore(true)
        await getMoreMovies()
        setFetchingmore(false)
      }
    }

    return (
 
<Wrapper onScroll={(e) => fetchMoreMovies(e)}>
<CardsWrapper>
        {
          movies?.map((movie) => {
            return(
              loading
                ? 
              <Skeleton animation="wave" sx={{background: grey[900], borderRadius: '15px'}} variant="rectangular" width={'115px'} height={'135px'} /> 
                : 
              <MovieCard key={movie?._id} movie={movie} alt="" />
            )
          })
        }
</CardsWrapper>
        </Wrapper> 
    )
}