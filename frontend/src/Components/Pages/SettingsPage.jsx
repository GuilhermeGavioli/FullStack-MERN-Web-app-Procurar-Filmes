import * as React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import { theme, theme2 } from '../../theme';
import { Divider, FormControl, Skeleton, Switch, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CircularProgress from '@mui/material/CircularProgress';
import PinkSwitch from '../PinkSwitch';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

function UIRepresentationComponent({currentTheme, secondary_color}){
    return(
           <div style={{width: '110px', height: 'fit-content', borderRadius: '15px', background: currentTheme.palette.darker, display: 'flex',
                padding: '10px', flexDirection: 'column', gap: '10px'
            }}>

                <div style={{width: '100%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                    <div style={{width: '40%', height: '15px', borderRadius: '5px', background: secondary_color}}></div>
                    <div style={{width: '60%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                </div>
                <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                    <div style={{width: '65%', height: '45px', borderRadius: '5px', background: currentTheme.palette.mid}}></div>
                    <div style={{width: '60%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                        <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                        <div style={{width: '50%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                        <div style={{width: '50%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                        </div>
                        <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                        <div style={{width: '50%', height: '25px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                        <div style={{width: '50%', height: '25px', borderRadius: '5px', background: secondary_color}}></div>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
            </div>
    )
}

function UIDarkRepresentationComponent({backgroundcolor, themecolor}){
    return(
        <div style={{width: '110px', height: 'fit-content', borderRadius: '15px', background: backgroundcolor, display: 'flex',
            padding: '10px', flexDirection: 'column', gap: '10px'
        }}>

            <div style={{width: '100%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
            <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                <div style={{width: '40%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
                <div style={{width: '60%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
            </div>
            <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                <div style={{width: '65%', height: '45px', borderRadius: '5px', background: themecolor}}></div>
                <div style={{width: '60%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                    <div style={{width: '50%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
                    <div style={{width: '50%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
                    </div>
                    <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                    <div style={{width: '50%', height: '25px', borderRadius: '5px', background: themecolor}}></div>
                    <div style={{width: '50%', height: '25px', borderRadius: '5px', background: themecolor}}></div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
        </div>
    )
}

export default function SettingsPage (){
    const {currentTheme, changeTheme, currentThemeN, changeDarkMode, isDarkMode} = useContext(ThemeContext)
    
    React.useEffect(()=>{
        
    }, [currentTheme])
    


    return(
        <React.Fragment>



<FormControl >
<div style={{width: '100vw', overflow: 'scroll', padding: '10px'}}>

  <div
  style={{display: 'flex', flexDirection: 'row', gap: '10px', minWidth: 'fit-content', width: 'fit-content', maxWidth: 'fit-content',

  }}
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
  >
    <div style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
         border: currentThemeN == 3 ? `3px solid ${currentTheme.palette.sec}`  : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(47, 255, 227)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}}  control={<Radio checked={currentThemeN == 3 ? true : false}
    onClick={() => changeTheme(3)}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>


    <div style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center',
             border: currentThemeN == 1 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(255,47,47)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="1" control={<Radio checked={currentThemeN == 1 ? true : false}
    onClick={() => changeTheme(1)}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>


    <div style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
           border: currentThemeN == 2 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(255, 251, 27)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="2" control={<Radio checked={currentThemeN == 2 ? true : false}
    onClick={() => changeTheme(2)}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>


    <div style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
           border: currentThemeN == 4 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(141, 1, 255)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="4" control={<Radio checked={currentThemeN == 4 ? true : false}
    onClick={() => changeTheme(4)}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>
    
    <div style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
           border: currentThemeN == 5 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(252, 116, 5)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="5" control={<Radio checked={currentThemeN == 5 ? true : false}
    onClick={() => changeTheme(5)}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>


  </div>

  </div>
</FormControl>

   



      
       




<FormControl >
<div style={{width: '100vw', overflow: 'scroll', padding: '10px', marginBottom: '65px'}}>

  <div
  style={{display: 'flex', flexDirection: 'row', gap: '10px', minWidth: 'fit-content', width: 'fit-content', maxWidth: 'fit-content',

  }}
    aria-labelledby="demo-radio-buttons-group-label2"
    name="radio-buttons-group2"
  >

        <div style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
         border: isDarkMode ? '3px solid rgba(0,0,0,0)' : `3px solid ${currentTheme.palette.mid}`}}>
    <UIDarkRepresentationComponent backgroundcolor='rgb(210,210,210)' themecolor='white' secondary_color='rgb(47, 255, 227)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}}  control={<Radio checked={isDarkMode ? false : true}
    onClick={() => changeDarkMode('l')}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.mid }}} />}
    />
    </div>

        <div style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
         border: isDarkMode ? `3px solid ${currentTheme.palette.lighter}`  : '3px solid rgba(0,0,0,0)'}}>
    <UIDarkRepresentationComponent backgroundcolor='rgb(25,25,25)' themecolor='rgb(80,80,80)' secondary_color='rgb(47, 255, 227)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}}  control={<Radio checked={isDarkMode ? true : false}
    onClick={() => changeDarkMode('d')}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.lighter }}} />}
    />
    </div>



  </div>
  </div>
  </FormControl>

       

        </React.Fragment>



    )
}



