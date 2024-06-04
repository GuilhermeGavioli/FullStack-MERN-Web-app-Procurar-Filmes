

import styled from 'styled-components'
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import { Skeleton } from '@mui/material';
import { Fragment } from 'react';
import { deepPurple, grey, pink } from '@mui/material/colors';
import { theme } from '../theme';

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
    padding: 0px 10px 0 10px;
    display: flex;
    align-items: center;
    gap: 8px;
`

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: ${theme.palette.mid};
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
    background: linear-gradient(${theme.palette.purple_light},${theme.palette.purple_mid});
    font-weight: 600;
    color: white;
    font-family: roboto;
    font-size: 0.9em;
`


export default function FilterGenreCarrocel({availableGenres, handleGenreChange }){

    const genres = [
        'Animation','Comedy', 'Horror', 'Action', 'Epic', 'Sci-fi', 'Romance', 'Drama'
    ]
    

    return (


             <Wrapper>
            <CardsWrapper>

               {
                availableGenres.map(g => {
                    return (
                    g.selected ?
                        <SelectedItem key={g.genre} onClick={() => handleGenreChange(g.genre)}>
                            <p>{g.genre}</p>
                        </SelectedItem>
                    :
      
                        <Item key={g.genre} onClick={() => handleGenreChange(g.genre)}>

                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.46405 3.5327C0.87241 3.18856 0.510348 4.42889 0.528272 5.09207C0.528272 5.73733 0.689587 7.83442 1.33484 11.0607C4.45359 17.4057 8.97039 14.9323 9.88451 11.6522C8.59399 9.84547 8.73738 5.77318 8.97039 3.96288C7.67988 4.57229 4.57189 5.33942 2.46405 3.5327Z" fill="#02B8FC" stroke="#02B8FC"/>
    <path d="M12.1507 1.48479C10.6741 0.798104 10.0474 1.92804 9.91867 2.57885C9.77636 3.20822 9.4712 5.28925 9.38903 8.5784C11.0316 15.455 15.9827 14.0386 17.5977 11.0409C19.8316 8.5784 21.1221 5.94698 20.5844 3.79612C18.9175 2.57885 13.8082 3.7119 12.1507 1.48479Z" fill="#FBB004" stroke="#FBB004"/>
    <path d="M16.35 4.16675C16.8448 4.73172 17.9805 5.85264 18.5647 5.81659C16.72 6.61753 16.0204 5.10324 16.35 4.16675Z" fill="#C88B00" stroke="#C88B00" stroke-width="0.5"/>
    <path d="M11.1538 3.74184C11.9033 3.78898 13.4989 3.77327 13.8851 3.33337C13.1532 5.20659 11.5859 4.63565 11.1538 3.74184Z" fill="#C88B00" stroke="#C88B00" stroke-width="0.5"/>
    <path d="M15.4662 10.9432C14.0501 10.3198 10.9465 9.25723 9.86102 9.99371C12.7149 6.22938 15.314 8.60916 15.4662 10.9432Z" fill="#C88B00" stroke="#C88B00" stroke-width="0.5"/>
    <path d="M1.69434 6.55552C2.35907 6.47699 3.77969 6.41417 4.14434 6.79109C3.40364 5.14208 2.0362 5.73101 1.69434 6.55552Z" fill="#0196CE" stroke="#0196CE" stroke-width="0.5"/>
    <path d="M6.24951 6.93189C6.88506 6.72353 8.2638 6.37768 8.69434 6.66123C7.64754 5.24845 6.42346 6.08195 6.24951 6.93189Z" fill="#0196CE" stroke="#0196CE" stroke-width="0.5"/>
    <path d="M3.06263 10.5555C4.4686 10.7248 7.47952 10.9385 8.27538 10.4391C6.60707 12.6991 3.7398 11.7482 3.06263 10.5555Z" fill="#0196CE" stroke="#0196CE" stroke-width="0.5"/>
    </svg>
                        <p>{g.genre}</p>
                    </Item> 
                    )
                    })
                }
                

                
 
                
            
            
 

        </CardsWrapper>
        </Wrapper> 
    )
}