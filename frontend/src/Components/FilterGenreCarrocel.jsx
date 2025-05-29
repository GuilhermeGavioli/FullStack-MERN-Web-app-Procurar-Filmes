

import styled from 'styled-components'
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import { Skeleton } from '@mui/material';
import { Fragment, useContext } from 'react';
import {  grey, pink } from '@mui/material/colors';
import { theme } from '../theme';
import { ThemeContext } from './Contexts/ThemeContext';

// const Wrapper = styled.div`
//     width: 100%;
//     height: 55px;
//     position: relative;
//     overflow: scroll;
// `

// const CardsWrapper = styled.div`
//     position: absolute;
//     left: 0;
//     width: fit-content;
//     height: 100%;
//     padding: 0px 10px 0 10px;
//     display: flex;
//     align-items: center;
//     gap: 8px;
// `


const Wrapper = styled.div`
    width: 100%;
    position: relative;
    overflow: scroll;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 45px;
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


export default function FilterGenreCarrocel({availableGenres, handleGenreChange }){
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
  
    

    return (


             <Wrapper>
            <CardsWrapper>

               {
                availableGenres.map(g => {
                    return (
                    g.selected ?
                        <SelectedItem currentTheme={currentTheme} key={g.genre} onClick={() => handleGenreChange(g.genre)}>
                            <p style={{color: 'white',userSelect: 'none', wordBreak: 'keep-all', whiteSpace: 'nowrap'}}>{
                                
                   

                             g.genre == 'Thriller' ? 'Suspense' : g.genre == 'Fantasy' ? 'Fantasia' : g.genre == 'PostApocaliptycal' ? 'Pós-Apocaliptico' :      g.genre == 'Animation' ? 'Animação' : g.genre == 'Comedy' ? 'Comedia' : g.genre == 'Horror' ? 'Terror' :
                    g.genre == 'Action' ? 'Ação' : g.genre == 'Epic' ? 'Épico' : g.genre == 'SciFi' ? 'Sci-Fi' :
                     g.genre == 'Anime' ? g.genre : g.genre == 'Drama' ? g.genre : g.genre == 'Romance' && g.genre
                                }</p>
                        </SelectedItem>
                    :
      
                        <Item currentTheme={currentTheme} key={g.genre} onClick={() => handleGenreChange(g.genre)}>

                     
                        <p style={{color:currentTheme.palette.genre_color, userSelect: 'none', wordBreak: 'keep-all', whiteSpace: 'nowrap'}}>{
                              g.genre == 'Thriller' ? 'Suspense' : g.genre == 'Fantasy' ? 'Fantasia' : g.genre == 'PostApocaliptycal' ? 'Pós-Apocaliptico' :   g.genre == 'Animation' ? 'Animação' : g.genre == 'Comedy' ? 'Comedia' : g.genre == 'Horror' ? 'Terror' :
                    g.genre == 'Action' ? 'Ação' : g.genre == 'Epic' ? 'Épico' : g.genre == 'SciFi' ? 'Sci-Fi' :
                     g.genre == 'Anime' ? g.genre : g.genre == 'Drama' ? g.genre : g.genre == 'Romance' && g.genre
                     }</p>
                    </Item> 
                    )
                    })
                }
                

                
 
                
            
            
 

        </CardsWrapper>
        </Wrapper> 
    )
}