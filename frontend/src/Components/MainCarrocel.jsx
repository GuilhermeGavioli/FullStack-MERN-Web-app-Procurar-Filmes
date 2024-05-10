import styled from 'styled-components'
import MovieCard from "./MovieCard"

const Wrapper = styled.div`
    background: red;
    width: 100vw;
    height: 265px;
    position: relative;
    overflow: scroll;
`

const CardsWrapper = styled.div`
    background: yellow;
    position: absolute;
    top: 50%; right: 50%;
    transform: translate(50%,-50%);
    width: fit-content;
    height: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
`

export default function MainCarrocel(){
    return(
        <Wrapper>
<CardsWrapper>
    <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <img style={{width: '200px', height: '260px', borderRadius: '20px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
</CardsWrapper>
        </Wrapper> 
    )
}