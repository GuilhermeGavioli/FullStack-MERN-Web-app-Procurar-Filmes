
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useContext } from "react";
import { ThemeContext } from '../App';
import { grey, orange } from '@mui/material/colors';





// const CustomizedButtonStyle = styled(Button)(({ theme }) => ({
//     color: 'red',
//     backgroundColor: theme.palette.primary.main,
//     '&:hover': {
//       backgroundColor: theme.palette.secondary.main,
//     },
// }));


export default function CustomizedButton({text, clickHandler}) {

return (
  
    <Button fullWidth onClick={clickHandler} variant="contained"
      sx={{

        color: 'white',
        backgroundColor: orange[600],
        '&:hover': {
          // color: theme.palette.primary.main,
          // backgroundColor: theme.palette.secondary.main,
        },
      }}
    
    >{text}</Button>
)}




