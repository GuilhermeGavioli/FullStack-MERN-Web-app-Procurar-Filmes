
import { styled, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';

import { useContext } from 'react';



// const CustomizedInputStyle = styled(TextField)(({ theme }) => ({
//     backgroundColor: theme.palette.primary.hover,
//     color: 'yellow',
//     '&:hover': {
//       backgroundColor: 'white',
//     },

//     '& .MuiOutlinedInput-notchedOutline .MuiInputBase-input': {
//       color: 'red',
//     }
// }));


export default function CustomizedInput({placeholder, password}) {
  // const { theme, toggleThemeHandler } = useContext(ThemeContext);


  return (
    <></>
    // <CustomizedInputStyle fullWidth  size="small" id={`outlined-${password ? 'password' : ''}-small`} type={password? 'password' : ''} 
    // label={placeholder} variant="outlined" 
    // />


  );


}




