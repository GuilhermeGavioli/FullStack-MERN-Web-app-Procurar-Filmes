import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    hover: grey[400],
    primary: {
      main: '#ffffff',
      darker: grey[500]
    },
    secondary: {
      lighter: grey[800],
      main: grey[900],
    },
  },
});

const darkTheme = createTheme({
    palette: {
      hover: grey[200],
      primary: {
        main: grey[900],
      },
      secondary: {
        main: grey[50],
      },
    },
  });


  
export { lightTheme, darkTheme }