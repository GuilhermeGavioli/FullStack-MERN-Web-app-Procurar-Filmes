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
    }
  })

  
export { lightTheme, darkTheme, theme }