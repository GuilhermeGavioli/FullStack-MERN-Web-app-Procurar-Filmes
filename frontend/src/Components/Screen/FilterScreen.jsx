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
import SliderYears from '../SliderTwoButtons';
import styled from 'styled-components';
import { FilterContext } from '../Pages/SearchPage';
import SliderTwoButtons from '../SliderTwoButtons';
import PinkSwitch from '../PinkSwitch';

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
  backgroundColor: grey[900],
  gap: '50px'
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
  export default function FilterScreen() {
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
 
        <FilterListIcon sx={{color: 'white', fontSize: '1.3em'}} onClick={handleClickOpen}></FilterListIcon>
       
        <Dialog
            sx={{width: '100vw'}}
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative', background: pink[500] }}>
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
                Filters
              </Typography>
              <Button autoFocus color="inherit" onClick={handleApplying}>
                Apply
              </Button>
            </Toolbar>
          </AppBar>

          <div style={{background: '#161616', height: '100%', width: '100vw', margin: 0, padding: 0}}>



  
    


        
         <List sx={style} aria-label="mailbox folders">

         <Typography variant="h6" component="h2" sx={{color: 'white'}}>
          Genre
        </Typography>
         <div style={{ gridAutoFlow: 'column',padding: '10px', placeItems: 'start', alignItems: 'start', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', rowGap: '5px', columnGap: '5px', width: 'fit-content', justifyContent: 'start', width: '100%', overflow: 'hidden'}}>
        {
          availableGenres.map(g => {
          
            return (
              g.selected ?
                <SelectedItem key={g.genre} onClick={() => changeGenre(g.genre)}>{g.genre}</SelectedItem>
              :
                <Item key={g.genre}  onClick={() => changeGenre(g.genre)}>{g.genre}</Item>
              )
            })
        }
         </div>
         

         <Typography variant="h6" component="h2" sx={{color: 'white'}}>
          Year
        </Typography>
   
        <PinkSwitch state={isYearOn.temp} setter={setIsYearOn}></PinkSwitch>
         <SliderTwoButtons v1={minYear} v2={maxYear} min={1930} setMin={setMinYear} setMax={setMaxYear} max={2025} start={1990} end={2010} gap={20} state={isYearOn.temp}></SliderTwoButtons>

  
      <Typography variant="h6" component="h2" sx={{color: 'white'}}>
          Runtime
        </Typography>
        <PinkSwitch state={isRuntimeOn.temp} setter={setIsRuntimeOn}></PinkSwitch>
      <SliderTwoButtons v1={minRuntime} v2={maxRuntime} setMin={setMinRuntime} setMax={setMaxRuntime} min={10} max={400} start={180} end={260} gap={80} state={isRuntimeOn.temp}></SliderTwoButtons>
   

      </List>

  
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
  
  