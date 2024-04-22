
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useContext } from "react";
import { ThemeContext } from "../App";



const CustomizedButtonStyle = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
}));


export default function CustomizedButton({text, clickHandler}) {
  const { theme, toggleThemeHandler } = useContext(ThemeContext);
return (
  
    <CustomizedButtonStyle fullWidth   onClick={clickHandler} variant="contained">{text}</CustomizedButtonStyle>
)}




