import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';


import { useContext } from 'react';
import { ThemeContext } from '../App';

const CustomizedSwitchStyle = styled(Switch)(({ theme }) => ({

   
}));


export default function CustomizedSwitch() {
  const {theme, toggleThemeHandler} = useContext(ThemeContext)

  return (

    <CustomizedSwitchStyle onClick={toggleThemeHandler} id="filled-basic" label="Email" variant="filled"
    sx={{
      '& .MuiSwitch-thumb': {
        background: theme.palette.primary.main,
      },
      '& .MuiSwitch-track': {
        background: theme.palette.primary.darker
      }
    }}
    ></CustomizedSwitchStyle>

  );


}




