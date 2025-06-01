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

      bars: 'rgb(35,35,35)', //mid
      bg: 'rgb(23,22,28)', //dark
      font_color: 'rgb(255,255,255)',
      darker_font_color:'rgb(255,255,255)',
      genre_bg: 'rgb(35,35,35)', //mid
      genre_color: 'rgb(255,255,255)', //mid
      bottom_bar_icon: 'rgb(18, 17, 20)', //dark
      movie2_bg: 'rgb(35,35,35)', //dark
      loading_1: 'rgb(40,45,45)', //dark
      cover_l: 'linear-gradient(90deg, rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.08) 72%, rgba(0,0,0,0) 100%)',
      cover_r: 'linear-gradient(90deg, rgba(0, 0, 0, 0.0) 0%, rgba(0, 0, 0, 0.08) 72%, rgba(0,0,0,0.19) 100%)',
      editnomebtn: 'rgb(80,80,80)',

      movie2_loading_bg: 'rgb(35,35,35)', //mid
      movie2_loading_band: 'rgb(40,45,45)', //light

      slider_bg: 'rgb(20,20,20)', //light

      sec: 'rgb(252, 116, 5)',

             logininputbg: 'rgb(20,20, 20)',
                logininputclr: 'rgb(255,255,255)'
   
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


  
export { theme }