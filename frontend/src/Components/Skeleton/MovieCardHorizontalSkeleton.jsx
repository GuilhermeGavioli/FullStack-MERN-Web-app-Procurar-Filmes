import { Skeleton } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

const MovieCardHorizontalSkeleton = () => {
    const {currentTheme} = useContext(ThemeContext)

           return (
           <div style={{width: '100%', background: currentTheme.palette.mid, height: 'fit-content', padding: '10px', display: 'flex', gap: '0px'}}>
              <Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '15px'}} variant="rectangular" width={'80px'} height={'100px'} /> 
              <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'150px'} height={'20px'} /> 
                <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
                <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
                <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'115px'} height={'12px'} /> 
              </div>
          </div>
          )
}

export default MovieCardHorizontalSkeleton