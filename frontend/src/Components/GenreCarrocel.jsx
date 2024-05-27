

import styled from 'styled-components'
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import { Skeleton } from '@mui/material';
import { Fragment } from 'react';
import { deepPurple, grey, pink } from '@mui/material/colors';


const Wrapper = styled.div`
  
    width: 100vw;
    height: 55px;
    position: relative;
    overflow: scroll;
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

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: ${grey[800]};
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
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px 5px 10px;
    border-radius: 15px;
    background: linear-gradient(${pink[700]},${pink[500]});
    font-weight: 600;
    color: white;
    font-family: roboto;
    font-size: 0.9em;
`


export default function GenreCarrocel({runGenreChange,genre, loading}){

    const genres = [
        'Animation','Comedy', 'Horror', 'Action', 'Epic', 'Sci-fi', 'Romance', 'Drama'
    ]

    return (

             <Wrapper>
            <CardsWrapper>

               {
                loading ? 
                <Fragment>
                <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'60px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: grey[400],padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'80px'} height={'100%'} />
                </Fragment>
                :

               genres.map(g => {   
                return (
                    
                g == genre ? 
                    <SelectedItem key={g}>
                    <TheaterComedyRoundedIcon sx={{fontSize: '1.7em'}}/>
                    <p>{g}</p>
                </SelectedItem> 
                    :
                    <Item key={g} onClick={() => runGenreChange(g)}>
                    <TheaterComedyRoundedIcon sx={{fontSize: '1.7em'}}/>
                    <p>{g}</p>
                </Item> 
                )
            })
            }
 

        </CardsWrapper>
        </Wrapper> 
    )
}