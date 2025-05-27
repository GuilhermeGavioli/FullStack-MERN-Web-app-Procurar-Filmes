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
      contra: 'rgb(255,255,255)',
      darker: 'rgb(20,20, 20)',
      dark: 'rgb(23,22,28)',
      mid: 'rgb(35,35,35)',
      light: 'rgb(40,45,45)',
      lighter: 'rgb(55,50,55)',

      sec: 'rgb(255,47,47)',
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
         contra: 'rgb(255,255,255)',
            main: 'blue',
      darker: 'rgb(20,20, 20)',
      dark: 'rgb(23,22,28)',
      mid: 'rgb(35,35,35)',
      light: 'rgb(40,45,45)',
      lighter: 'rgb(55,50,55)',

      sec: 'rgb(255, 202, 27)',
    }
  })

//   const theme3 = createTheme({
// breakpoints: {
//       values: {
//         xs: 0,
//         sm: 600,
//         md: 900,
//         lg: 1200,
//       },
//     },
    
//     palette:{
//          contra: 'rgb(15,15,15)',
//             main: 'blue',
//       darker: 'rgb(75, 75, 75)',
//       dark: 'rgb(255,255,255)',
//       mid: 'rgb(215, 215, 215)',
//       light: 'rgb(232, 232, 232)',
//       lighter: 'rgb(38, 18, 18)',

//       sec: 'rgb(47, 255, 227)',
//     }
//   })
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
   contra: 'rgb(255,255,255)',
            main: 'blue',
      darker: 'rgb(20,20, 20)',
      dark: 'rgb(23,22,28)',
      mid: 'rgb(35,35,35)',
      light: 'rgb(40,45,45)',
      lighter: 'rgb(55,50,55)',

      sec: 'rgb(47, 255, 227)',
    }
  })

  
export { theme, theme2, theme3 }