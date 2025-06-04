import styled from 'styled-components'
import MovieCard from './MovieCard';
import { useState, useContext } from 'react';
import { Skeleton } from '@mui/material';
import { ThemeContext } from './Contexts/ThemeContext';

import ReplayIcon from '@mui/icons-material/Replay';
import { AuthContext } from './Contexts/AuthContext';


export default function MovieCarrocel({ finite = true, movies, loading, getMoreMovies, moviesRetry, retry }){
    const {userLoading, auth} = useContext(AuthContext)
    const {currentTheme} = useContext(ThemeContext)
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
 
 <MasterWrapper currentTheme={currentTheme}>
 <SecondaryWrapper>
  <LeftMask currentTheme={currentTheme}/>
  <RightMask currentTheme={currentTheme}/>
<Wrapper currentTheme={currentTheme} onScroll={(e) => fetchMoreMovies(e)}>

{

moviesRetry &&
 <div style={{position: 'absolute', inset: '0 0 0 0', width: 'fit-content', margin: 'auto', height: 'fit-content',
    display: 'flex', flexDirection: 'column', alignItems:'center'
  }}>
<p style={{color: currentTheme.palette.lighter, fontSize: '.9em'}}>Erro durante Carregamento.</p>
<p style={{color: currentTheme.palette.lighter, fontSize: '.8em'}}>Retentar.</p>
  <button onClick={() => retry()} style={{
    background: 'none', color: currentTheme.palette.sec, border: 'none', marginTop: '8px'
  }}>
    <ReplayIcon style={{fontSize: '2.2em'}}/>
  </button>
    </div>
}

{
!userLoading && !auth && !moviesRetry &&
  <div style={{position: 'absolute', inset: '0 0 0 0', width: 'fit-content', margin: 'auto', height: 'fit-content',
    display: 'flex', flexDirection: 'column', alignItems:'center'
  }}>
<p style={{color: currentTheme.palette.lighter, fontSize: '.9em'}}>Permissão Negada.</p>
<p style={{color: currentTheme.palette.lighter, fontSize: '.8em'}}>Faça Login.</p>
    </div>
}


<CardsWrapper>
        {
          movies?.map((movie) => {
            return(
              loading
                ? 
              <Skeleton animation="wave" sx={{background: currentTheme.palette.loading_1, borderRadius: '15px'}} variant="rectangular" width={'135px'} height={'160px'} /> 
                : 
              <MovieCard draggable='false' style={{  userSelect: 'unset', draggable: 'false'}} key={movie?._id} movie={movie} alt="" />
            )
          })
        }
</CardsWrapper>
        </Wrapper> 

        </SecondaryWrapper>
        </MasterWrapper>
    )
}



const MasterWrapper = styled.div`
  width: 100vw;
  position: relative;

  ${({ currentTheme }) => currentTheme.breakpoints.down('md')} {
    height: 180px;
  }

  ${({ currentTheme }) => currentTheme.breakpoints.up('md')} {
      height: 165px;
  }

  ${({ currentTheme }) => currentTheme.breakpoints.up('lg')} {
    height: 205px;
}

`

const SecondaryWrapper = styled.div`
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
    ${({ currentTheme }) => currentTheme.breakpoints.down('md')} {
      height: 180px;
    }

    ${({ currentTheme }) => currentTheme.breakpoints.up('md')} {
      height: 165px;
  }

  ${({ currentTheme }) => currentTheme.breakpoints.up('lg')} {
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
  background: ${({ currentTheme }) => currentTheme.palette.cover_l};
  height: 89%;
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
  background: ${({ currentTheme }) => currentTheme.palette.cover_r};
  height: 89%;
  margin: auto 0;
  bottom: 0;
  top: 0;
`