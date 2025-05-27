// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import { styled } from '@mui/material';
// import { grey, pink } from '@mui/material/colors';

// function valuetext(value) {
//   return `${value}°C`;
// }

// const iOSBoxShadow =
//   '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

// const IOSSlider = styled(Slider)(({ theme }) => ({
//     color: pink[700],
//     height: 5,
//     padding: '15px 0',
//     '& .MuiSlider-thumb': {
//       height: 20,
//       width: 20,
//       backgroundColor: '#fff',
//       boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
//       '&:focus, &:hover, &.Mui-active': {
//         boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
//         // Reset on touch devices, it doesn't add specificity
//         '@media (hover: none)': {
//           boxShadow: iOSBoxShadow,
//         },
//       },
//       '&:before': {
//         boxShadow:
//           '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
//       },
//     },
//     '& .MuiSlider-valueLabel': {
//       fontSize: 12,
//       fontWeight: 'normal',
//       top: -6,
      
//       backgroundColor: 'unset',
//       color: currentTheme.palette.contra,
//       '&::before': {
//         display: 'none',
//       },
//       '& *': {
//         background: 'transparent',
//         color: currentTheme.palette.contra,
//       },
//     },
//     '& .MuiSlider-track': {
//       border: 'none',
//       height: 5,
//     },
//     '& .MuiSlider-rail': {
//       opacity: 0.5,
//       boxShadow: 'inset 0px 0px 4px -2px #000',
//       backgroundColor: grey[100],
//     },
//   }));

// const gap = 20;

// export default function SliderTwoButtons({min, max, start, end, state, setMin, setMax}) {


//   const [value1, setValue1] = React.useState([min, max]);

//   const handleChange1 = (event, newValue, activeThumb) => {
//     if (!Array.isArray(newValue)) {
//       return;
//     }

//     if (activeThumb === 0) {
//       setMin(Math.min(min, max - minDistance))
//       // setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);

//     } else {
//       setMax(Math.max(max, min + minDistance))
//       // setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
//     }
//   };

//   return (
//     <Box sx={{ width: 200 }}>
//       {/* <IOSSlider
//       disabled={!state}
//       min={min}
//       max={max}
//         getAriaLabel={() => 'Minimum distance shift'}
//         value={[start, end]}
//         onChange={handleChange2}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//         disableSwap
//       /> */}

//      <Slider
//       disabled={!state}
//       getAriaLabel={() => 'Minimum distance'}
//       value={[min,max]}
//       onChange={handleChange1}
//       valueLabelDisplay="auto"
//       getAriaValueText={valuetext}
//       disableSwap
//    />
//     </Box>
//   );
// }

import React from 'react';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';
import { ThemeContext } from './Contexts/ThemeContext';

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
    border: `2px solid white`,
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
    color: '#ccc', // overall color (affects track and thumb)
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





export default function SliderTwoButtons({v1,v2,setMin,setMax, min, max, start,gap, end, state}) {
   const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)
  const [value, setValue] = React.useState([v1, v2]);

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
      background: currentTheme.palette.darker,
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
