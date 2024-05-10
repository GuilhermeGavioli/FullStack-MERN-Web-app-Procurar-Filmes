import { grey } from '@mui/material/colors';
import { useParams, useSearchParams } from 'react-router-dom';


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MovieCard from '../MovieCard';



export default function SearchPage() {
    const [searchParams] = useSearchParams();
     const search_query = searchParams.get('search_query');
 


    return (
        <div style={{minHeight: '100%',height: 'fit-content', width: '100%', backgroundColor: grey[900],
backgroundColor: '#161616', 
paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px'
}}>
    {/* <div style={{paddingTop: '150px', marginTop: '150px'}}> */}
        <p style={{background: 'red'}}>
            aokdcoadskocapd
            {search_query}
        
        </p>

        

        <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Grid   container rowSpacing={{xs: '5px'}}  columnSpacing={{ xs: '5px', sm: 2, md: 3 }}
      sx={{background: 'red', padding: "10px", width: 'fit-content', placeContent: 'center'}}
      >
        
        <Grid item xs={'auto'}>
        <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
        </Grid>
        
        <Grid item xs={'auto'} sx={{background: 'blue'}}>
          <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
        </Grid>

        <Grid item xs={'auto'}>
          <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
        </Grid>

        <Grid item xs={'auto'}>
          <MovieCard cover="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMvgrMj1e_mm4mamPM2XwWyzSA-wGmg624oe9nLFBHw&s" alt="" />
        </Grid>
    
      </Grid>
    </Box>
        
    </div>
    );
}

