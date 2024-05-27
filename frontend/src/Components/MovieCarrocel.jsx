import styled from 'styled-components'
import MovieCard from './MovieCard';
import { useState, useContext, useRef, useEffect } from 'react';
import { Loadingtctx, MoviesContext } from './Pages/MainPage';
import { Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { theme } from '../theme';


const MasterWrapper = styled.div`
    width: 100vw;
    height: 145px;
    position: relative;

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
    height: 145px;
    position: relative;
    overflow-x: scroll;
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
    padding: 0 10px 0 10px;
`

const LeftMask = styled.div`
  left: 0;
  pointer-events: none;
  z-index: 3;
  position: absolute;
  width: 130px;
  background: linear-gradient(90deg, rgba(0,0,0,0.37296917057838763) 0%, rgba(0,0,0,0.14327729382768728) 72%, rgba(0,0,0,0) 100%);
  height: 100%;
  `
  
  const RightMask = styled.div`
  right: 0;
  pointer-events: none;
  z-index: 3;
  position: absolute;
  width: 130px;
  background: linear-gradient(270deg, rgba(0,0,0,0.37296917057838763) 0%, rgba(0,0,0,0.14327729382768728) 72%, rgba(0,0,0,0) 100%);
  height: 100%;
`

export default function MovieCarrocel({ finite = true, movies, loading, getMoreMovies }){

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
<CardsWrapper>
        {
          movies?.map((movie) => {
            return(
              loading
                ? 
              <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'115px'} height={'135px'} /> 
                : 
              <MovieCard key={movie?._id} movie={movie} alt="" />
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