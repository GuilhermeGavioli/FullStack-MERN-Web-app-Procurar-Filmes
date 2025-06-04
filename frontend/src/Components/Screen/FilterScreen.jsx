import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import FilterListIcon from '@mui/icons-material/FilterList';
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import MultipleSelectionInput from '../Inputs/MultipleSelectionInput';
import FilterInputsYears from '../FilterInputsYears';
import FilterInputsRunTimes from '../FilterInputsRunTimes';
import { Chip, ListItem, Stack } from '@mui/material';
import { grey, pink } from '@mui/material/colors';
import SliderYears from '../MySlider';
import styled from 'styled-components';
import { FilterContext } from '../Pages/SearchPage';
import SliderTwoButtons from '../MySlider';
import PinkSwitch from '../MySwitch';
import FilterGenreCarrocel from '../FilterGenreCarrocel';
import { theme } from '../../theme';
import { ThemeContext } from '../Contexts/ThemeContext';

const Item = styled.div`
    width: fit-content;
    height: 100%;
    background: ${grey[600]};
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px 0 10px;
    border-radius: 0px;
    font-weight: 600;
    color: white;
    font-family: roboto;
    font-size: 0.9em;
`

const SelectedItem = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px 0 10px;
    border-radius: 0px;
    background: linear-gradient(${pink[700]},${pink[500]});
    font-weight: 600;
    color: white;
    font-family: roboto;
    font-size: 0.9em;
`

const style = {
  p: '10px',
  m: 0,
  width: '100%',
  maxWidth: 360,
  borderColor: 'divider',
  backgroundColor: 'none',
  gap: '50px'
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
  export default function FilterScreen() {
     const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)


  const  { availableGenres, changeGenre, isYearOn, setIsYearOn, isRuntimeOn, setIsRuntimeOn, applyFilters, minYear, maxYear, minRuntime,
    maxRuntime, setMinYear, setMaxYear, setMinRuntime, setMaxRuntime
   } = React.useContext(FilterContext)
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleApplying = () => {
      applyFilters()
      handleClose()
    }

    return (
      <React.Fragment>
 
        <FilterListIcon sx={{color: currentTheme.palette.font_color, fontSize: '1.7em',}} onClick={handleClickOpen}></FilterListIcon>
       
        <Dialog
            sx={{width: '100vw'}}
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative', background: currentTheme.palette.mid, boxShadow: 'none'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Filtros
              </Typography>
              <Button sx={{color: 'white',background: `linear-gradient(${currentTheme.palette.sec},
              ${currentTheme.palette.sec})`, textDecoration: 'none', textAlign: 'none', textTransform: 'none',
              borderRadius: '8px', fontSize: '1em', padding: '5px 15px'}}  onClick={handleApplying}>
                Aplicar
              </Button>
            </Toolbar>
          </AppBar>

          <div style={{background: currentTheme.palette.dark, height: '100%', width: '100vw', margin: 0, padding: 0}}>



  
    


        
         <List sx={style} aria-label="mailbox folders">

         <p style={{fontSize: '.9em', fontWeight: 500, color: currentTheme.palette.font_color, marginTop: '10px', marginBottom: '5px'}}>
          Gênero:
        </p>
       
        
          <FilterGenreCarrocel availableGenres={availableGenres} handleGenreChange={changeGenre}></FilterGenreCarrocel>

        
      
         
            <p style={{fontSize: '.9em', fontWeight: 500, color: currentTheme.palette.font_color, marginTop: '20px', marginBottom: '5px'}}>
          Ano:
        </p>

        <PinkSwitch state={isYearOn.temp} setter={setIsYearOn}></PinkSwitch>
         <SliderTwoButtons v1={minYear} v2={maxYear} min={1930} setMin={setMinYear} setMax={setMaxYear} max={2025} start={1990} end={2010} gap={20} state={isYearOn.temp}></SliderTwoButtons>

  
 <p style={{fontSize: '.9em', fontWeight: 500, color: currentTheme.palette.font_color, marginTop: '20px', marginBottom: '5px'}}>
          Duração:
        </p>
        <PinkSwitch state={isRuntimeOn.temp} setter={setIsRuntimeOn}></PinkSwitch>
      <SliderTwoButtons v1={minRuntime} v2={maxRuntime} setMin={setMinRuntime} setMax={setMaxRuntime} min={10} max={400} start={180} end={260} gap={80} state={isRuntimeOn.temp}></SliderTwoButtons>
   

      </List>

  
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
  
  