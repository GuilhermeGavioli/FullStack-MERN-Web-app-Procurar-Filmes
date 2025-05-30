import * as React from 'react';

import styled  from 'styled-components';
import Box from '@mui/material/Box';
import MovieCard from '../MovieCard';
import { createContext, useState, useEffect } from 'react';
import MovieScreen from '../Screen/MovieScreen';


import SearchInput from '../SearchInput';
import FilterScreen from '../Screen/FilterScreen';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard2 from '../MovieCard2';
import DeletableChip from '../DeletableChip';
import { Button, Fab, Skeleton, Stack, Typography } from '@mui/material';
import MovieCarrocel from '../MovieCarrocel';
import { theme } from '../../theme';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeContext } from '../Contexts/ThemeContext';

import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { LocationContext } from '../Contexts/LocationContext';
import { useContext } from 'react';

export const MovieContext = createContext()
export const RatingsContext = createContext()

const MyGrid = styled.div`
  margin: auto;
  display: grid;
  width: fit-content;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  grid-gap: 10px;
  row-gap: 10px;
`

const Search = styled('div')((props) => ({

}));

const SearchIconWrapper = styled('div')(() => ({
  height: '100%',
  width: '50px',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
  padding: '0 0px 0 10px',
}));

const StyledInputBase = styled('input')((props) => ({
  width: '70%',
  height: '100%',
  margin: 0,
  padding: 0,
  fontSize: '1.1em',
  paddingLeft: '10px',
  border: 'none',
  outline: 'none',
  background: 'none',
  color: props.currentTheme.palette.contra,
}))

export const FilterContext = createContext()

export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const search = queryParams.get('search');
  const {currentTheme, setCurrentTheme} = useContext(ThemeContext)

  const {auth, userLoading} = useContext(AuthContext)

  const [isYearOn, setIsYearOn] = useState(false)
  const [minYear, setMinYear] = useState(1990)
  const [maxYear, setMaxYear] = useState(2010)

  const [isRuntimeOn, setIsRuntimeOn] = useState(false)
  const [minRuntime, setMinRuntime] = useState(180)
  const [maxRuntime, setMaxRuntime] = useState(260)

  const [isGenresOn, setIsGenresOn] = useState(false)
  const [availableGenres, setAvailableGenres] = useState([
    {
      genre: 'Animation',
      selected: false
    },
    {
      genre: 'Comedy',
      selected: false
    },
    {
      genre: 'Horror',
      selected: false
    },
    {
      genre: 'Action',
      selected: false
    },
    {
      genre: 'PostApocaliptycal',
      selected: false
    },
    {
      genre: 'Epic',
      selected: false
    },
    {
      genre: 'SciFi',
      selected: false
    },
    {
      genre: 'Romance',
      selected: false
    },
    {
      genre: 'Drama',
      selected: false
    },
    {
      genre: 'Anime',
      selected: false
    },
    {
      genre: 'Fantasy',
      selected: false
    },
    {
      genre: 'Thriller',
      selected: false
    },
])

  const [filtersSnapshot, setFiltersSnapshot] = useState({
    year: {
      on: false,
      min: null,
      max: null
    },
    runtime: {
      on: false,
      min: null,
      max: null
    },
    genres: {
      on: false,
      genres: [
        {
          genre: 'Animation',
          selected: false
        },
        {
          genre: 'Comedy',
          selected: false
        },
        {
          genre: 'Horror',
          selected: false
        },
        {
          genre: 'Action',
          selected: false
        },
        {
          genre: 'Post Apocaliptycal',
          selected: false
        },
        {
          genre: 'Epic',
          selected: false
        },
        {
          genre: 'Sci-Fi',
          selected: false
        },
        {
          genre: 'Romance',
          selected: false
        },
        {
          genre: 'Drama',
          selected: false
        },
        {
          genre: 'Anime',
          selected: false
        },
        {
          genre: 'Fantasy',
          selected: false
        },
        {
          genre: 'Thriller',
          selected: false
        },
      ]
    }
  })


  const [loadingMovies, setLoadingMovies] = useState(false)


function changeGenre(g){
  setAvailableGenres((prev_genres) => {
    return prev_genres.map((item) => {
      return item.genre === g ? { ...item, selected: !item.selected } : item;
    })
  })
}

function clearAllGenres(){
  setAvailableGenres(prev_g => {
    return prev_g.map(g => {
      return { genre: g.genre, selected: false}
    })
  })
}

function applyFilters(){ // Snapshot of states
  if (isYearOn) {
    console.log(minYear)
    const year = {on: true, min: minYear, max: maxYear}
    setFiltersSnapshot((prev_obj) => { return {...prev_obj, year } })
  } else {
    const year = {on: false, min: null, max: null}
    setFiltersSnapshot((prev_obj) => { return {...prev_obj, year} })
  }

  if (isRuntimeOn) {
    const runtime = {on: true, min: minRuntime, max: maxRuntime}
    setFiltersSnapshot((prev_obj) => { return {...prev_obj, runtime } })
  } else {
    const runtime = {on: false, min: null, max: null}
    setFiltersSnapshot((prev_obj) => { return {...prev_obj, runtime} })
  }

  console.log(availableGenres.some(g => {return g.selected == true}))
  if (availableGenres.some(g => {return g.selected == true})){
    setFiltersSnapshot((prev_obj) => {
      return {...prev_obj, genres: {on: true, genres: availableGenres}}
    })
  } else {
    setFiltersSnapshot((prev_obj) => {
      return {...prev_obj, genres: {on: false, genres: availableGenres}}
    })
  }

  console.log(filtersSnapshot)

}

function disableYearSnapshot(){
  const year = {on: false, min: null, max: null}
  setFiltersSnapshot((prev_obj) => { return {...prev_obj, year} })
  setIsYearOn(false)
}
function disableRuntimeSnapshot(){
  const runtime = {on: false, min: null, max: null}
  setFiltersSnapshot((prev_obj) => { return {...prev_obj, runtime} })
  setIsRuntimeOn(false)
}

function disableGenresSnapshot(){
  clearAllGenres()
  setFiltersSnapshot((prev_obj) => {
    return {...prev_obj, genres: {on: false, genres: availableGenres}}
  })
}

    const [searchQuery, setSearchQuery] = useState('')
    const [movies, setMovies] = useState([])
  
    const [page, setPage] = useState(0)
    const [forceUpdate, setForceUpdate] = useState(false);
    const [end, setEnd] = useState(false)
    const [loadingMoreMovies, setLoadingMoreMovies] = useState(false)
  const [scrollpos, setScrollpos] = useState(0)
  const [noMovies, setNoMovies] = useState(false)

  const listRef = React.useRef(null);

  function scrollToTop(){
    listRef.current.scrollTop = 0
    setScrollpos(0)
  }

  const handleFetchingMoreOnScroll = async (e) => {
      if ( !userLoading && !auth ) {
          setLoadingMovies(false)
      return
          }
    const { scrollHeight, clientHeight, scrollTop } = listRef.current;
    setScrollpos(scrollTop)
    const isNearEnd = scrollTop + clientHeight >= scrollHeight - 100; // Adjust threshold
    if (isNearEnd && !loadingMoreMovies && !end) {
      console.log('loading more')
      setForceUpdate(!forceUpdate)
      setPage(p => {return p + 1})
    }
  }

  async function queryMovies(){
      if ( !userLoading && !auth ) {
          setLoadingMovies(false)
      return
          }
    setForceUpdate(!forceUpdate)
    setPage(p => {return 1})
    console.log(page)
  }

  useEffect(() => { // handle older stored values
      if ( !userLoading && !auth ) {
          setLoadingMovies(false)
      return
          }
    if(search){
      console.log(search)
            setSearchQuery(search)
                  setPage(1)
      setForceUpdate(!forceUpdate)
      // localStorage.setItem('last_query', search)
    }
    
    if (localStorage.getItem('search_url') && !search){
      console.log('mememem')
      setSearchQuery(localStorage.getItem('last_query'))
      setPage(1)
      setForceUpdate(!forceUpdate)
    }

    // const sq = localStorage.getItem('last_query')
    // sq && setSearchQuery('')
  },[])

  useEffect(() => {
    async function run(){
      console.log('use effect')
      console.log(page)
      if (page == 0 ) return
     
      if (page == 1){
        console.log('pageee1')
        if (loadingMovies){
          console.log('returning beucase loading movies')
          return
        } 
        setMovies([])
        setLoadingMovies(true)
      } else {
        if (loadingMoreMovies) return
        console.log('end')
        console.log(end)
        if (end) return
        setLoadingMoreMovies(true)
      }
      await getMovies()
    }
    run()
  }, [page, forceUpdate])



    async function getMovies(){
      console.log('getting')
      let url = `http://localhost:80/movies/results/${page}?query=${searchQuery}`
      console.log(url)
      if (filtersSnapshot.year.on) url = url.concat(`&year=1&min_year=${filtersSnapshot.year.min}&max_year=${filtersSnapshot.year.max}`)
      if (filtersSnapshot.runtime.on) url = url.concat(`&runtime=1&min_runtime=${filtersSnapshot.runtime.min}&max_runtime=${filtersSnapshot.runtime.max}`)
      if (filtersSnapshot.genres.on){
        url += `&genres=1&genreslist=`
        filtersSnapshot.genres.genres.map(g => {
          if (g.selected) {
            url += `${g.genre},`
          }
        })
      }
      localStorage.setItem('search_url', url)
      localStorage.setItem('last_query', searchQuery)
      console.log(url)
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        // setPage(prev_page => { return prev_page + 1 })
        const data = await res.json()

        if (data.length == 0 && page == 1){
          setNoMovies(true)
        } else if (data.length < 20){
          setEnd(true)
          setNoMovies(false)
        } else {
          setNoMovies(false)
          setEnd(false)
        }
        console.log(data)
        // setPage(prev => {return page + 1})
        setMovies((prev_movies) => {return [...prev_movies, ...data]})
      } else {
        console.log('ops')
      }
      setLoadingMoreMovies(false)
      setLoadingMovies(false)
    }
    

    return (
    <React.Fragment>
      <div 
         ref={listRef}
         onScroll={handleFetchingMoreOnScroll}
      style={{background: currentTheme.palette.bg, width: '100%', height: '100%', overflowY:'scroll',paddingBottom: '0px',position: 'relative' }}>


{
      scrollpos > 400 &&
    <Fab onClick={scrollToTop} size="small" sx={{transition: '0.3s ease-in-out', background: currentTheme.palette.sec, position: 'fixed', bottom: '95px', right: '15px', zIndex: 2,
    }}>
              <KeyboardArrowUpIcon sx={{fontSize: '2em', color: currentTheme.palette.darker}}/>
          </Fab>
}



       <div style={{position: 'relative', width: '100vw', height: 'fit-content',  
       display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
       
       }}>

      <Box sx={{ flexGrow: 1 }}>

<div style={{width: '100vw', padding: '0p', height: '56px', padding: '10px',
 position: 'fixed', top: '0', left: 0, background: currentTheme.palette.bars, zIndex: 5}}>

      <div style={{padding: '0', width: '100%', height: '100%',background: currentTheme.palette.bars, display: 'flex', alignItems: 'center' }}>

      {/* <SearchIconWrapper>
              <SearchIcon sx={{color: 'white'}} />
            </SearchIconWrapper> */}
            <StyledInputBase
            autoFocus
            placeholder='Procurar...'
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value)}}
            currentTheme={currentTheme}
           
            />

<div style={{  display: 'flex', alignItems: 'center', padding: '0',  width: '40px', marginRight: '5px'  }}>

<FilterContext.Provider
      value={{
        minYear, 
        setMinYear, 
        maxYear,
        setMaxYear,
        minRuntime,
        maxRuntime,
        setMinRuntime,
        setMaxRuntime,
        availableGenres,
        changeGenre,
        isYearOn: {snapshot: filtersSnapshot.year.on, temp: isYearOn},
        setIsYearOn,
        isRuntimeOn: {snapshot: filtersSnapshot.runtime.on, temp: isRuntimeOn},
        setIsRuntimeOn,
        applyFilters,
        isGenresOn,
        setIsGenresOn,
      
      }}
        >
        <FilterScreen/>
      </FilterContext.Provider>
      </div> 

      
     

      <div style={{height: '100%', width: '30%', background: currentTheme.palette.sec}}>
              <button onClick={queryMovies}
              style={{ borderRadius: '0',background: 'none', textTransform: 'none', color: 'white',border: 'none', height: '100%', width: '100%',
            margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
              <SearchIcon sx={{color: 'white', fontSize: '1.8em'}} />
                </button>
                  </div>
             

              
       
  

              </div>


          {
          
          <Stack sx={{
     
            padding: 
  filtersSnapshot.year.on || filtersSnapshot.runtime.on || filtersSnapshot.genres.on ? 
  '7px 10px' : '0',
   display: filtersSnapshot.year.on || filtersSnapshot.runtime.on || filtersSnapshot.genres.on ? 'flex' : 'none',
  margin: '0', marginTop: '10px', height: 'fit-content',
  background: currentTheme.palette.dark}} direction='row' spacing={1}>
{
  filtersSnapshot.year.on && <DeletableChip  name={'Year'} action={() => { disableYearSnapshot() }} />
}
{
  filtersSnapshot.runtime.on && <DeletableChip name={'Runtime'} action={() => { disableRuntimeSnapshot() }} />
}
{
//  && <DeletableChip name={'Genre'} action={() => { clearAllGenres() }} />
filtersSnapshot.genres.on && <DeletableChip name={'Genre'} action={() => { disableGenresSnapshot() }} />
}
  </Stack>

          }
        
              </div>


   



  <Stack sx={{padding: '10px', paddingTop: 
    filtersSnapshot.year.on || filtersSnapshot.runtime.on || filtersSnapshot.genres.on ? '90px' : '65px'
    , width: '100vw'}} direction='column' spacing={1}>
  {
    loadingMovies ?
    <React.Fragment>
        <div style={{width: '100%', background: currentTheme.palette.movie2_loading_bg, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'150px'} height={'20px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
    </div>
</div>
        <div style={{width: '100%', background: currentTheme.palette.movie2_loading_bg, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'150px'} height={'20px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
    </div>
</div>
        <div style={{width: '100%', background: currentTheme.palette.movie2_loading_bg, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'150px'} height={'20px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: currentTheme.palette.movie2_loading_band}} variant="rectangular" width={'115px'} height={'12px'} /> 
    </div>
</div>
      
    </React.Fragment>
    :
          movies?.map(movie => {
            return (
              <MovieCard2 key={movie?._id} movie={movie}/>
            )
          })
          
        }

        {
          loadingMoreMovies &&
          <React.Fragment>
          <div style={{width: '100%', background: currentTheme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
          <Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
          <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
          </div>
      </div>
          <div style={{width: '100%', background: currentTheme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
          <Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
          <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
          </div>
      </div>
          <div style={{width: '100%', background: currentTheme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
          <Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
          <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
          </div>
      </div>
      </React.Fragment>
        }


  </Stack>


        
    </Box>

            
<MovieScreen/>

</div>
    {noMovies && !loadingMovies &&
<div style={{height: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'absolute', margin: 'auto', inset: '0 0 0 0'}}>
              
       
              <Typography sx={{userSelect: 'none', fontSize: '1.1em', color: currentTheme.palette.lighter, opacity: '50%'}}>Nenhum filme encontrado com</Typography>
              <Typography sx={{userSelect: 'none', fontSize: '1.1em', color: currentTheme.palette.lighter, opacity: '50%'}}>'{localStorage.getItem('last_query')}'</Typography>
            </div>
            }
</div>
    </React.Fragment>
    )
}

