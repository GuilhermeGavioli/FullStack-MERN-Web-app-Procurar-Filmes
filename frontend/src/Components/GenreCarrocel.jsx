

import styled from 'styled-components'
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import { Skeleton } from '@mui/material';
import { Fragment, useContext } from 'react';
import {  grey, pink } from '@mui/material/colors';
import { theme } from '../theme';
import { ThemeContext } from './Contexts/ThemeContext';

// import { theme } from '../theme';




export default function GenreCarrocel({runGenreChange,genre, loading, moviesRetry}){
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
    const genres = [
        'Animation','Comedy','Anime', 'Horror', 'Action', 'Epic', 'SciFi', 'Romance', 'Drama'
    ]

    return (

             <Wrapper currentTheme={currentTheme}>
            <CardsWrapper currentTheme={currentTheme}>
         
               {
                loading && moviesRetry ? 
                <Fragment>
                <Skeleton animation="wave" sx={{background: currentTheme.palette.lighter ,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: currentTheme.palette.lighter ,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: currentTheme.palette.lighter ,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: currentTheme.palette.lighter ,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: currentTheme.palette.lighter ,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: currentTheme.palette.lighter ,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'60px'} height={'100%'} />
                <Skeleton animation="wave" sx={{background: currentTheme.palette.lighter ,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'80px'} height={'100%'} />
                </Fragment>
                :

               genres.map(g => {   
                return (
                    
                g == genre ? 
                    <SelectedItem currentTheme={currentTheme} key={g}>

                   
                    <p style={{color: 'white',userSelect: 'none', wordBreak: 'keep-all', whiteSpace: 'nowrap'}}>
                        {
                    g == 'Animation' ? 'Animação' : g == 'Comedy' ? 'Comedia' : g == 'Horror' ? 'Terror' :
                    g == 'Action' ? 'Ação' : g == 'Epic' ? 'Épico' : g == 'SciFi' ? 'Sci-fi' :
                     g == 'Anime' ? g : g == 'Drama' ? g : g == 'Romance' && g 
                        
                        }</p>
                </SelectedItem> 
                    :
                    <Item  currentTheme={currentTheme} key={g} onClick={() => runGenreChange(g)}>
        
          
{/* <Image currentTheme={currentTheme} draggable='false' width={'100%'} style={{background: 'none'}} src={`${g}.svg`} alt="" /> */}
    
                    <p style={{color:currentTheme.palette.genre_color, userSelect: 'none', wordBreak: 'keep-all', whiteSpace: 'nowrap'}}>
                         {
                    g == 'Animation' ? 'Animação' : g == 'Comedy' ? 'Comedia' : g == 'Horror' ? 'Terror' :
                    g == 'Action' ? 'Ação' : g == 'Epic' ? 'Épico' : g == 'SciFi' ? 'Sci-fi' :
                     g == 'Anime' ? g : g == 'Drama' ? g : g == 'Romance' && g 
                        
                        }
                        
                        
                        </p>
             
                    </Item>
                )
            })
            }
 

        </CardsWrapper>
        </Wrapper> 
    )
}








const Wrapper = styled.div`
    width: 100vw;
    position: relative;
    overflow: scroll;
    margin-top: 5px;
    margin-bottom: 5px;
    ${(props) => props.currentTheme?.breakpoints.down('sm')} {
        height: 45px;
    }
    
    ${(props) => props.currentTheme?.breakpoints.up('md')} {
        height: 65px;
     
    }

    
`

const CardsWrapper = styled.div`
    position: absolute;
    left: 0;
    width: fit-content;
    height: 100%;
    padding: 0px 10px 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;
`

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: ${(props) => props.currentTheme.palette.genre_bg};
    color: ${(props) => props.currentTheme.palette.genre_color};
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 15px;
    font-weight: 600;
    color: white;
    font-family: roboto;
   
    ${(props) => props.currentTheme.breakpoints.down('md')} {
        padding: 5px 10px 5px 10px;
        font-size: 1em;
    }

    ${(props) => props.currentTheme.breakpoints.up('md')} {
        fontSize: 1em;
        padding: 5px 20px 5px 20px;
    }

    ${(props) => props.currentTheme.breakpoints.up('lg')} {
        fontSize: 1em;
        padding: 5px 20px 5px 20px;
    }
`

const Image = styled.img`
    width: 15px;
    ${(props) => props.currentTheme.breakpoints.down('md')} {
        
    }

    ${(props) => props.currentTheme.breakpoints.up('md')} {
        width: 20px;
    }
    
    ${(props) => props.currentTheme.breakpoints.up('lg')} {
      
    }
`

const SelectedItem = styled.div`
width: fit-content;
height: 100%;
display: flex;
align-items: center;
gap: 8px;
border-radius: 15px;
font-weight: 600;
background: linear-gradient(${(props) => props.currentTheme.palette.sec},${(props) => props.currentTheme.palette.sec});
    color: white;


    ${(props) => props.currentTheme.breakpoints.down('md')} {
        padding: 5px 10px 5px 10px;
        font-size: 1em;
    }

    ${(props) => props.currentTheme.breakpoints.up('md')} {
        fontSize: 1em;
        padding: 5px 20px 5px 20px;
    }

    ${(props) => props.currentTheme.breakpoints.up('lg')} {
        fontSize: 1em;
        padding: 5px 20px 5px 20px;
    }
`
