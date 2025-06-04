import { useContext } from 'react';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';
import { ThemeContext } from './Contexts/ThemeContext';
import { useState } from 'react';


const PrettoSlider = styled(Slider)(({currentTheme}) => ({
  color: '#52a000',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    color: currentTheme.palette.sec,
  },
  '& .MuiSlider-rail': {
    border: 'none',
    color: currentTheme.palette.light,
  },
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: currentTheme.palette.sec,
    
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: currentTheme.palette.sec,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },

    '&.Mui-disabled': {
    color: '#ccc',
    '& .MuiSlider-track': {
      backgroundColor: '#ddd',
    },
    '& .MuiSlider-rail': {
      backgroundColor: '#f0f0f0',
    },
    '& .MuiSlider-thumb': {
      backgroundColor: '#e0e0e0',
      borderColor: '#aaa',
    },
  }
}));





export default function MySlider({v1,v2,setMin,setMax, min, max, start,gap, end, state}) {
   const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
  const [value, setValue] = useState([v1, v2]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < gap) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - gap);
        setValue([clamped, clamped + gap]);
        setMin(clamped)
        setMax(clamped + gap)
      } else {
        const clamped = Math.max(newValue[1], min + gap);
        setValue([clamped - gap, clamped]);
        setMin(clamped - gap)
        setMax(clamped)
      }
    } else {
      setValue(newValue);
      setMin(newValue[0])
      setMax(newValue[1])
    }
  };

  return (
    <div style={{
      width: '100%',
      margin: 'auto',
      background: currentTheme.palette.slider_bg,
      margin: 0,
      padding: '0 15px',
      borderRadius: '10px'
    }}>
            <PrettoSlider
            currentTheme={currentTheme}
                   min={min}
                   disabled={!state}
      max={max}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      />

      {/* <Slider
      color='#fffff7'
      disabled={!state}
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      /> */}
    </div>
  );
}
