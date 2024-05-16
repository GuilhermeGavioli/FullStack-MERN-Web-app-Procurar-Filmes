import styled from 'styled-components'
import MovieCard from './MovieCard';
import { useContext } from 'react';
import { Loadingtctx } from './Pages/MainPage';
import { Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';


const Wrapper = styled.div`
    background: red;
    width: 100vw;
    height: 145px;
    position: relative;
    overflow: scroll;
`

const CardsWrapper = styled.div`
    background: yellow;
    position: absolute;
    left: 0;
    width: fit-content;
    height: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
`

export default function MovieCarrocel({movies}){
    const { loadingt } = useContext(Loadingtctx)

    return (
 
<Wrapper>
<CardsWrapper>
        {
          movies?.map((movie) => {
            return(
              loadingt
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