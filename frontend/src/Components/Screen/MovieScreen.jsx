
import { forwardRef, useContext, Fragment } from "react"
import CommentsContext from '../Contexts/CommentsContext';
import {   Skeleton, Typography, styled as MUIStyled, Dialog } from "@mui/material";
import CommentsScreen from './CommentsScreen';
import Box from "@mui/material/Box";
import { MovieContext } from '../Contexts/MovieContext';
import Slide from '@mui/material/Slide';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ActorScreen from './ActorScreen';
import { ThemeContext } from '../Contexts/ThemeContext';
import ActorContextProvider from '../Contexts/ActorContext';
import MovieInformationSkeleton from '../Skeleton/MovieInformationSkeleton';
import MovieCardFull from '../MovieCardFull';
import CommentsContextProvider from "../Contexts/CommentsContext";
import { SnackBarContext } from "../Contexts/SnackBarContext";

export default function MovieScreen() {
   const {currentTheme, changeTheme} = useContext(ThemeContext)
  const { movieLoading, isMovieContainerOpen, movie, handleCloseMovie } = useContext(MovieContext)

  const toggleDrawer = () => (event) => {
    handleCloseMovie();
  }

  return(
    <Fragment>

            <Dialog
              fullScreen
              open={isMovieContainerOpen}
               onOpen={toggleDrawer(true)}
              onClose={() => {toggleDrawer(false)}}
              TransitionComponent={Transition}
            >
     <Box draggable='false'
    role="presentation"
    sx={{ width:'100vw', height: '100vh', overflowY: 'scroll', overflowX: 'hidden', background: currentTheme.palette.dark }}>

<div draggable='false' style={{height: '45px', width: '45px',opacity: '100%', background: currentTheme.palette.mid, position: 'absolute', top: '15px', left: '10px', zIndex: 3, 
display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}}>
    <ChevronLeftIcon onClick={toggleDrawer(false)}  sx={{color: 'white', fontSize: '2.3em'}}></ChevronLeftIcon>
</div>


 <CommentsContextProvider>
     <CommentsScreen/>
</CommentsContextProvider>


{
  movieLoading ?
  <Fragment>
  <Skeleton animation="wave" sx={{background: currentTheme.palette.mid,borderRadius: '0 0 0 0', width:'100%', height:'390px'}} variant="rectangular"  />
    <MovieInformationSkeleton/>
  </Fragment>
  :
 <MovieCardFull/>
}

<ActorTopicContainer currentTheme={currentTheme} style={{padding: '0 20px 0 20px', width: '100%', flexDirection: 'column', alignItems: 'start', 
margin: 'auto',justifyContent: 'flex-start',   marginTop: '5px'}}>

<ActorTopicTitle currentTheme={currentTheme} variant="body1" gutterBottom>
          Atores
      </ActorTopicTitle>
      <ActorContextProvider>
            <ActorScreen></ActorScreen>
      </ActorContextProvider>
      </ActorTopicContainer>     



    </Box>
  </Dialog>

</Fragment>
)}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide draggable='false' direction="up" ref={ref} {...props} />;
})

const ActorTopicTitle = MUIStyled(Typography)`
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

const ActorTopicContainer = MUIStyled(Typography)`
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
