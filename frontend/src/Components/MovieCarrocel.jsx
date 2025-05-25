import styled from 'styled-components'
import MovieCard from './MovieCard';
import { useState, useContext, useRef, useEffect } from 'react';
import { Loadingtctx, MoviesContext } from './Pages/MainPage';
import { Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { theme } from '../theme';
import { ThemeContext } from './Contexts/ThemeContext';


import ReplayIcon from '@mui/icons-material/Replay';
const MasterWrapper = styled.div`
  width: 100vw;
  position: relative;

  ${theme.breakpoints.down('md')} {
    height: 145px;
  }

  ${theme.breakpoints.up('md')} {
      height: 165px;
  }

  ${theme.breakpoints.up('lg')} {
    height: 205px;
}

`

const WrapperF = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
`

const Wrapper = styled.div`
    width: 100vw;
    position: relative;
    overflow-x: scroll;
    scrollbar-width: 2px;
    ${theme.breakpoints.down('md')} {
      height: 145px;
    }

    ${theme.breakpoints.up('md')} {
      height: 165px;
  }

  ${theme.breakpoints.up('lg')} {
    height: 205px;
}
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
    padding: 0 40px 0 10px;
`

const LeftMask = styled.div`
  left: 0;
  pointer-events: none;
  z-index: 3;
  position: absolute;
  width: 80px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.08) 72%, rgba(0,0,0,0) 100%);
  height: 93%;
  margin: auto 0;
  bottom: 0;
  top: 0;
  `
  
  const RightMask = styled.div`
  right: 0;
  pointer-events: none;
  z-index: 3;
  position: absolute;
  width: 60px;
  background: linear-gradient(270deg,  rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.08) 72%, rgba(0,0,0,0) 100%);
  height: 93%;
  margin: auto 0;
  bottom: 0;
  top: 0;
`

export default function MovieCarrocel({ finite = true, movies, loading, getMoreMovies, moviesRetry, retry }){
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
    const [fetchinmore, setFetchingmore ] = useState(false)

    async function fetchMoreMovies(e){
      if (finite) {
        return
      }
      const maxScroll = e.target.scrollLeftMax
      const nearEnd = (maxScroll - 500)
      if (e.target.scrollLeft >= nearEnd && !fetchinmore){
        setFetchingmore(true)
        await getMoreMovies()
        setFetchingmore(false)
      }
    }

    return (
 
 <MasterWrapper>
 <WrapperF>
  <LeftMask/>
  <RightMask/>
<Wrapper onScroll={(e) => fetchMoreMovies(e)}>

{

moviesRetry ?
 <div style={{position: 'absolute', inset: '0 0 0 0', width: 'fit-content', margin: 'auto', height: 'fit-content',
    display: 'flex', flexDirection: 'column', alignItems:'center'
  }}>
<p style={{color: currentTheme.palette.lighter, fontSize: '.9em'}}>Erro durante Carregamento.</p>
<p style={{color: currentTheme.palette.lighter, fontSize: '.8em'}}>Retentar.</p>
  <button onClick={() => retry()} style={{
    background: 'none', color: currentTheme.palette.pink, border: 'none', marginTop: '8px'
  }}>
    <ReplayIcon style={{fontSize: '2.2em'}}/>
  </button>
    </div>
    :
    <></>
}
<CardsWrapper>
        {
          movies?.map((movie) => {
            return(
              loading
                ? 
              <Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'115px'} height={'135px'} /> 
                : 
              <MovieCard draggable='false' style={{  userSelect: 'unset', draggable: 'false'}} key={movie?._id} movie={movie} alt="" />
            )
          })
        }
</CardsWrapper>
        </Wrapper> 

        </WrapperF>
        </MasterWrapper>
    )
}
















































// const MasterWrapper = styled.div`
//     width: 100vw;
//     height: 145px;
//     position: relative;
//     overflow: scroll;
// `

// const Wrapper = styled.div`
//     width: 100vw;
//     height: 145px;
//     position: relative;
//     overflow: scroll;
// `

// const CardsWrapper = styled.div`
//     position: absolute;
//     left: 0;
//     width: fit-content;
//     height: 100%;
//     padding: 5px;
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 0 10px 0 10px;
// `

// const LeftMask = styled.div`
//   left: 0;
//   pointer-events: none;
//   z-index: 3;
//   position: absolute;
//   width: 50px;
//   background: red;
//   height: 145px;
//   `
// const RightMask = styled.div`
//   right: 0;
//   pointer-events: none;
//   z-index: 3;
//   position: fixed;
//   width: 50px;
//   background: red;
//   height: 80%;
// `

// export default function MovieCarrocel({ finite = true, movies, loading, getMoreMovies }){

//     const [fetchinmore, setFetchingmore ] = useState(false)

//     async function fetchMoreMovies(e){
//       if (finite) {
//         return
//       }
//       const maxScroll = e.target.scrollLeftMax
//       const nearEnd = (maxScroll - 500)
//       if (e.target.scrollLeft >= nearEnd && !fetchinmore){
//         setFetchingmore(true)
//         await getMoreMovies()
//         setFetchingmore(false)
//       }
//     }

//     return (
 
// <Wrapper onScroll={(e) => fetchMoreMovies(e)}>
//   <LeftMask/>
//   <RightMask/>
// <CardsWrapper>
//         {
//           movies?.map((movie) => {
//             return(
//               loading
//                 ? 
//               <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'115px'} height={'135px'} /> 
//                 : 
//               <MovieCard key={movie?._id} movie={movie} alt="" />
//             )
//           })
//         }
// </CardsWrapper>
//         </Wrapper> 
//     )
// }