import { createTheme } from '@mui/material/styles';
// import { grey, amber } from '@mui/material/colors';

  const theme = createTheme({

  breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
      },
    },
    
    palette:{
      darker: 'rgb(20,20, 20)',
      dark: 'rgb(23,22,28)',
      mid: 'rgb(35,35,35)',
      light: 'rgb(40,45,45)',
      lighter: 'rgb(55,50,55)',

      pink: 'rgb(255,47,47)',
    }
  })


  const theme2 = createTheme({

   breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
      },
    },
    
    palette:{
      darker: 'rgb(20,20, 20)',
      dark: 'rgb(23,22,28)',
      mid: 'rgb(35,35,35)',
      light: 'rgb(40,45,45)',
      lighter: 'rgb(55,50,55)',

      pink: 'rgb(255, 202, 27)',
    }
  })

  const theme3 = createTheme({
breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
      },
    },
    
    palette:{
      darker: 'rgb(20,20, 20)',
      dark: 'rgb(23,22,28)',
      mid: 'rgb(35,35,35)',
      light: 'rgb(40,45,45)',
      lighter: 'rgb(55,50,55)',

      pink: 'rgb(47, 255, 227)',
    }
  })

  
export { theme, theme2, theme3 }