import { grey } from '@mui/material/colors';
import { useParams, useSearchParams } from 'react-router-dom';
import MovieCardSearch from '../MovieCardSearch';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';



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

        

        <Box sx={{ width: '100%', background: 'red', padding: '10px' }}>
      <Grid container rowSpacing={1}  columnSpacing={{ xs: 0, sm: 2, md: 3 }}>
        <Grid item xs={8} sm={6}>
        <MovieCardSearch></MovieCardSearch>
        </Grid>
        <Grid item xs={6}>
        <MovieCardSearch></MovieCardSearch>
        </Grid>
        <Grid item xs={6}>
        <MovieCardSearch></MovieCardSearch>
        </Grid>
        <Grid item xs={6}>
        <MovieCardSearch></MovieCardSearch>
        </Grid>
    
   
      </Grid>
    </Box>
        
    </div>
    );
}

