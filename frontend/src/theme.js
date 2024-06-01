import { createTheme } from '@mui/material/styles';
import { grey, amber } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    
    hover: grey[400],
    primary: { //bg
      main: '#ffffff',
      darker: grey[500]
    },
    secondary: {
      lighter: amber[800],
      main: amber[900],
    },
  },
});

const lightTheme = createTheme({
    palette: {
      hover: grey[200],
      primary: { //bg
        main: grey[900],
      },
      secondary: {
        main: grey[50],
      },
    },
  });

  const theme = createTheme({
    palette:{
      darker: 'rgb(25,20,46)',
      dark: 'rgb(39,32,66)',
      mid: 'rgb(51,46,89)',
      light: 'rgb(48,40,79)',
      lighter: 'rgb(68,58,107)',

      
      pink: 'rgb(184,6,248)',
      pink_light: 'rgb(195,2,252)',
      
      cyan: 'rgb(5,176,249)',
      cyan_light: 'rgb(3,180,251)',
      
      yellow: 'rgb(250,178,16)',
      yellow_light: 'rgb(248,176,6)',
      

      purple_button_dark: 'rgb(123,40,245)',
      purple_button_light: 'rgb(127,46,239)',

      purple_title: 'rgb(118,76,202)',
      purple_normal: 'rgb(136,46,250)',
      purple_mid: 'rgb(71, 73, 183)',
      purple_light: 'rgb(121, 79, 207)',

      purple_selected_icon: 'rgb(121, 35, 245)',
    }
  })

  
export { lightTheme, darkTheme, theme }