import * as React from 'react';
import { deepPurple, grey, pink } from '@mui/material/colors';
import {  useSearchParams } from 'react-router-dom';
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

const Search = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  gap: '5px',
  backgroundColor: theme.palette.mid,

  '&:hover': {
    backgroundColor: grey[700],
  },
  width: '100%',
  height: '40px',
  color: 'white',

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  width: '50px',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
  padding: '0 0px 0 10px',

}));

const StyledInputBase = styled('input')({

  width: '100%',
  height: '100%',
  color: 'white',
  margin: 0,
  padding: 0,
  paddingLeft: '10px',
  border: 'none',
  outline: 'none',
  background: 'none',

})

export const FilterContext = createContext()

export default function SearchPage() {

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
    setForceUpdate(!forceUpdate)
    setPage(p => {return 1})
    console.log(page)
  }

  useEffect(() => { // handle older stored values
    if (localStorage.getItem('search_url')){
      setPage(1)
      setForceUpdate(!forceUpdate)
    }

    const sq = localStorage.getItem('last_query')
    sq && setSearchQuery(sq)
  },[])

  useEffect(() => {

    async function run(){
      console.log('use effect')
      console.log(page)
      if (page == 0 ) return
     
      if (page == 1){
        if (loadingMovies) return
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
      let url = `https://popfix.onrender.com/movies/results/${page}?query=${searchQuery}`
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
      style={{background: theme.palette.dark, width: '100%', height: '100%', overflowY:'scroll',paddingBottom: '20px',position: 'relative' }}>


{
      scrollpos > 400 &&
    <Fab onClick={scrollToTop} size="small" sx={{transition: '0.3s ease-in-out', background: theme.palette.cyan, position: 'fixed', bottom: '95px', right: '15px', zIndex: 2,
    }}>
              <KeyboardArrowUpIcon sx={{fontSize: '2em', color: 'theme.palette.darker'}}/>
          </Fab>
}

       <div style={{position: 'relative', width: '100vw', height: 'fit-content',  
       display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
       
       }}>

      <Box sx={{ flexGrow: 1 }}>


      <div style={{padding: '0 10px 0 10px', width: '100%', marginTop: '10px', }}>
      <Search>
      <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value)}}
           
            />

<div style={{  display: 'flex', alignItems: 'center', padding: '0 5px 0 5px' }}>
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

      
              <button onClick={queryMovies}
              style={{ borderRadius: '0', fontWeight: '600', color: 'white',border: 'none', padding: '0 20px 0 20px', 
               background: `linear-gradient(${theme.palette.purple_light},${theme.palette.purple_mid})` }}>
                Search</button>
       
          </Search>
              </div>

        

   

<Stack sx={{padding: 
  filtersSnapshot.year.on || filtersSnapshot.runtime.on || filtersSnapshot.genres.on ? 
  '10px 10px 0 10px' : '0px', margin: '0', height: 'fit-content'}} direction='row' spacing={1}>
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


  <Stack sx={{padding: '10px'}} direction='column' spacing={1}>
  {
    loadingMovies ?
    <React.Fragment>
        <div style={{width: '100%', background: theme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
    </div>
</div>
        <div style={{width: '100%', background: theme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
    </div>
</div>
        <div style={{width: '100%', background: theme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
    <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
      <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
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
          <div style={{width: '100%', background: theme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
          <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
          <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
          </div>
      </div>
          <div style={{width: '100%', background: theme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
          <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
          <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
          </div>
      </div>
          <div style={{width: '100%', background: theme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
          <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
          <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
            <Skeleton animation="wave" sx={{background: theme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
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
              <img src="/popcorn.png" style={{width: '150px'}} alt="" />
              <Typography sx={{fontSize: '1.2em', color: 'white', fontWeight: 700}}>No Movies Found...</Typography>
            </div>
            }
</div>
    </React.Fragment>
    )
}

