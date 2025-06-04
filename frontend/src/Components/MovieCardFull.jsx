import styled from 'styled-components'
import { useContext, Fragment } from "react"
import {  Typography, styled as MUIStyled, Skeleton } from "@mui/material";
import { ThemeContext } from './Contexts/ThemeContext';
import { MovieContext } from './Contexts/MovieContext';

export default function MovieCardFull() {
    const {currentTheme} = useContext(ThemeContext)
    const {movie, movieLoading} = useContext(MovieContext)

    return (
        <Fragment>
          <MovieCoverContainer currentTheme={currentTheme}>

  <div style={{borderRadius: '0 0 0 0', width: '100%', height: '100%',
  maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 100%, transparent 100%)', position: 'absolute',
  inset: '0 0 0 0', margin: 'auto', zIndex: '1'
}}>
  <img draggable='false' src={`${movie?.cover}`} style={{width: '100%', height: '100%',}} alt="" />
  </div>
    </MovieCoverContainer>

    <MovieTopicContainer currentTheme={currentTheme} style={{marginTop: '5px'}}>
        <MovieTopicTitle gutterBottom currentTheme={currentTheme} style={{color:currentTheme.palette.darker_font_color, fontSize: '1.6em'}}>
          {movie?.title}
      </MovieTopicTitle>
     </MovieTopicContainer>


     <MovieTopicContainer currentTheme={currentTheme}>
     <Wrapper currentTheme={currentTheme}>
    <CardsWrapper currentTheme={currentTheme}>
      {
        movieLoading || !movie?.genres ?
        <>
        <Skeleton animation="wave" sx={{background: currentTheme.palette.mid,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'100px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: currentTheme.palette.mid,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'60px'} height={'100%'} />
      <Skeleton animation="wave" sx={{background: currentTheme.palette.mid,padding: '0 15px 0 15px', borderRadius: '13px'}} variant="rectangular" width={'80px'} height={'100%'} />
        </>
        :
        
        <Fragment>
          
        <Item currentTheme={currentTheme}>
        <p>{movie?.genres[0]}</p>
    </Item> 
        <RuntimeItem currentTheme={currentTheme}>
        <p>{movie?.runTime} Min</p>
    </RuntimeItem>
        <YearItem currentTheme={currentTheme}>
        <p>{movie?.released}</p>
    </YearItem>
        </Fragment>

      }
</CardsWrapper>
</Wrapper> 
</MovieTopicContainer>


        <MovieTopicContainer style={{marginTop: '5px'}} currentTheme={currentTheme}>
        <MovieTopicTitle gutterBottom currentTheme={currentTheme}>
          Sinopse
      </MovieTopicTitle>
        <MovieDescription currentTheme={currentTheme} gutterBottom sx={{ 
        }}>
        {movie?.description} 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam accusantium soluta placeat, debitis distinctio sed temporibus harum iusto iste quibusdam quidem minus, ullam repellendus nobis possimus impedit corrupti perferendis neque.
      </MovieDescription>
     </MovieTopicContainer>
            </Fragment>
    )
}


const Wrapper = styled.div`
    width: 100%;
    height: 45px;
    position: relative;
    overflow-x: scroll;

         ${(props) => props.currentTheme.breakpoints.up('lg')} {
       height: 60px;
      }
`

const CardsWrapper = styled.div`
    position: absolute;
    left: 0;
    width: fit-content;
    height: 100%;
    padding: 5px 0 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
`

const Item = styled.div`
user-select: none;
    width: fit-content;
    height: 70%;
    background: linear-gradient(${(props) => props.currentTheme.palette.sec},${(props) => props.currentTheme.palette.sec});
    border: 2px solid ${(props) => props.currentTheme.palette.sec};
    background: none;
    color: ${(props) => props.currentTheme.palette.font_color};
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: roboto;
    font-size: 1.1em;
          white-space: nowrap;
    
    ${(props) => props.currentTheme.breakpoints.down('md')} {
      padding: 12px 15px 12px 15px;
      border-radius: 20px;
      font-weight: 500;
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
           
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
       padding: 20px 35px 20px 35px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 1.2em;
      }

`
const RuntimeItem = styled.p`
    width: fit-content;
    height: 70%;
    user-select: none;
    background: linear-gradient(${(props) => props.currentTheme.palette.sec},${(props) => props.currentTheme.palette.sec});
      border: 2px solid ${(props) => props.currentTheme.palette.sec};
    background: none;
    color: ${(props) => props.currentTheme.palette.font_color};
    display: flex;
    align-items: center;
    gap: 8px;
        padding: 12px 15px 12px 15px;
    border-radius: 20px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;
    font-size: 1.1em;
         
                         
                         white-space: nowrap;

          ${(props) => props.currentTheme.breakpoints.up('lg')} {
       padding: 20px 35px 20px 35px;
      border-radius: 30px;
      font-weight: 600;
      }
`
const YearItem = styled.div`
    width: fit-content;
    user-select: none;
    height: 70%;
    background: linear-gradient(${(props) => props.currentTheme.palette.sec},${(props) => props.currentTheme.palette.sec});
      border: 2px solid ${(props) => props.currentTheme.palette.sec};
    background: none;
    color: ${(props) => props.currentTheme.palette.font_color};
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 15px 12px 15px;
    border-radius: 20px;
    font-size: .9em;
    font-weight: 500;
    font-family: roboto;
 font-size: 1.1em;
      white-space: nowrap;
          ${(props) => props.currentTheme.breakpoints.up('lg')} {
       padding: 20px 35px 20px 35px;
      border-radius: 30px;
      font-weight: 600;

      }
`

const MovieDescription = MUIStyled(Typography)`
user-select: none;
  font-weight: 400;
  text-align: justify;
  word-spacing: 1px; 

  line-height: 26px;
  color: ${(props) => props.currentTheme.palette.darker_font_color};
  ${(props) => props.currentTheme.breakpoints.down('md')} {
    font-size: 1em;
    }
    
    ${(props) => props.currentTheme.breakpoints.up('md')} {
      font-size: 1.1em;
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        line-height: none;
      font-size: 1.4em;
  }
`

const MovieTopicContainer = MUIStyled(Typography)`
user-select: none;
  padding: 0 20px 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start; 
  margin: auto; 
  justify-content: flex-start;

       ${(props) => props.currentTheme.breakpoints.down('md')} {
           max-width: 350px;
    }

    ${(props) => props.currentTheme.breakpoints.up('md')} {
           max-width: 550px;
  }

  ${(props) => props.currentTheme.breakpoints.up('lg')} {
        max-width: 850px;
  }
`

const MovieTopicTitle = MUIStyled(Typography)`
user-select: none;
font-weight: 600;
 font-size: 1.3em;
 color: ${(props) => props.currentTheme.palette.sec};

     ${(props) => props.currentTheme.breakpoints.down('md')} {
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
        
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        font-size: 1.5em;
      }
`

const MovieCoverContainer = styled.div`
  position: relative; 
  margin: auto;
  width: 100%;

   ${(props) => props.currentTheme.breakpoints.down('md')} {
        max-width: 400px;
        height: 390px;
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
               max-width: 300px;
        height: 350px;
        margin-top: 30px;
       
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        max-width: 300px;
        height: 390px;
        margin-top: 30px;
      }

`


