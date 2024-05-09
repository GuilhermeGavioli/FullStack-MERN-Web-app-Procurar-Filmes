import styled from 'styled-components'
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    background: red;
    width: 100vw;
    height: 55px;
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

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: blue;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px 5px 10px;
    border-radius: 15px;
    font-weight: 600;
    color: white;
    font-family: roboto;
    font-size: 0.9em;
`

const SelectedItem = styled.div`
    width: fit-content;
    height: 100%;
    background: blue;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px 5px 10px;
    border-radius: 15px;
    background: linear-gradient(0deg, rgba(136,20,161,1) 0%, rgba(195,24,232,0.8939775739397321) 100%);
    font-weight: 600;
    color: white;
    font-family: roboto;
    font-size: 0.9em;
`


// moveis
const Wrapper2 = styled.div`
    background: red;
    width: 100vw;
    height: 145px;
    position: relative;
    overflow: scroll;
`

const CardsWrapper2 = styled.div`
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

const Item2 = styled.img`
    width: 115px;
    height: 135px;
    border-radius: 15px;
`


// movies first
const Wrapper3 = styled.div`
    background: red;
    width: 100vw;
    height: 265px;
    position: relative;
    overflow: scroll;
`

const CardsWrapper3 = styled.div`
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

const Item3 = styled.img`
    width: 115px;
    height: 135px;
    border-radius: 15px;
`



export default function Carrocel(){
    const navigator = useNavigate()
    function goToMovie(){
        navigator('/movie/id')
    }

    return (

        <>

<Wrapper3>
<CardsWrapper3>
    <Item3 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item3 style={{width: '200px', height: '260px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item3 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    {/* <Item3 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item3 src="https://encrypted-tbn\0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item3 src="https://encrypted-tbn\0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item3 src="https://encrypted-tbn\0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" /> */}
</CardsWrapper3>
        </Wrapper3> 


        <Wrapper>
            <CardsWrapper>
        <SelectedItem>
            <p>All</p>
        </SelectedItem> 
        <Item>
            <TheaterComedyRoundedIcon sx={{fontSize: '1.7em'}}/>
            <p>Movies</p>
        </Item> 
        <Item>
            <TheaterComedyRoundedIcon sx={{fontSize: '1.7em'}}/>
            <p>Comedy</p>
        </Item> 
        <Item>
            <TheaterComedyRoundedIcon sx={{fontSize: '1.7em'}}/>
            <p>Comedy</p>
        </Item> 
        </CardsWrapper>
        </Wrapper> 

        
<Wrapper2>
<CardsWrapper2 onClick={() => goToMovie()}>
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
</CardsWrapper2>
        </Wrapper2> 

        <Box sx={{background: 'red', mt: 3, width: '100%', maxWidth: 500, padding: '0 10px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Typography sx={{p:0,m:0,color: grey[200], fontWeight: '500', fontSize: '1.5em'}} variant="h4" gutterBottom>
        Trending Now
      </Typography>

      <Typography sx={{p:0,m:0,color: grey[300], fontWeight: '500', fontSize: '.9em', textDecoration: 'underline'}} variant="subtitle1" gutterBottom>
        See all
      </Typography>
        </Box>

        <Wrapper2>
<CardsWrapper2 onClick={() => goToMovie()}>
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
    <Item2 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
</CardsWrapper2>
        </Wrapper2> 
     
        </>
    )
}