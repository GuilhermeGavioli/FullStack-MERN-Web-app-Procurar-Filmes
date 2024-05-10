import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';


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

export default function MovieCarrocel(){
    const navigator = useNavigate()
    function goToMovie(){
        navigator('/movie/id')
    }

    return (
 
<Wrapper>
<CardsWrapper onClick={() => goToMovie()}>
    <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
</CardsWrapper>
        </Wrapper> 


 
    )
}