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
import { Stack } from '@mui/material';
import MovieCarrocel from '../MovieCarrocel';
import { theme } from '../../theme';


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
  backgroundColor: grey[900],
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
  
    const [page, setPage] = useState(1)


  function queryMovies(){
    console.log('test')
    console.log(filtersSnapshot)
    getMovies()
  }


  // useEffect(()=>{
    async function getMovies(){
      setPage(1)
      setMovies([])

      console.log(searchQuery)
      let url = `http://localhost:3001/movies/results/${page}?query=${searchQuery}`
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
      console.log(url)
      const res = await fetch(url, {
        // /movies/results/filter/:page
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        // setPage(prev_page => { return prev_page + 1 })
        const data = await res.json()
        console.log(data)
        setMovies((prev_movies) => {return [...prev_movies, ...data]})
      } else {
        console.log('ops')
      }
    }
    
  // }, [])

    return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>


      <div style={{padding: '0 10px 0 10px', width: '100%', marginTop: '10px'}}>
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
              style={{ borderRadius: '0 15px 0 15px', fontWeight: '600', color: 'white',border: 'none', padding: '0 20px 0 20px',  background: `linear-gradient(${pink[700]},${pink[600]})` }}>
                Search</button>
       
          </Search>
              </div>

    

<Stack sx={{padding: '10px'}} direction='row' spacing={1}>
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
          movies?.map(movie => {
            return (
              <MovieCard2 key={movie?._id} movie={movie}/>
            )
          })
          
        }


  </Stack>

      {/* <div style={{padding: '0 10px 0 10px', width: '100%', marginTop: '10px'}}> */}



{/* 
      <MyGrid>
       
      </MyGrid> */}

        {/* </div> */}
        
    </Box>
<MovieScreen/>
    </React.Fragment>
    )
}

