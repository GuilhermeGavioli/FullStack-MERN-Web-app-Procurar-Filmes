import * as React from 'react'
import EmailIcon from '@mui/icons-material/Email';

import { Divider, FormControl, Skeleton, Switch, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

function UIRepresentationComponent({currentTheme, secondary_color}){
    return(
           <div style={{width: '90px', height: 'fit-content', borderRadius: '15px', background: currentTheme.palette.darker, display: 'flex',
                padding: '10px', flexDirection: 'column', gap: '6px'
            }}>

                <div style={{width: '100%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                    <div style={{width: '40%', height: '10px', borderRadius: '3px', background: secondary_color}}></div>
                    <div style={{width: '60%', height: '10px', borderRadius: '3px', background: currentTheme.palette.light}}></div>
                </div>
                <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                    <div style={{width: '65%', height: '30px', borderRadius: '5px', background: currentTheme.palette.mid}}></div>
                    <div style={{width: '60%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                        <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                        <div style={{width: '50%', height: '10px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                        <div style={{width: '50%', height: '10px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                        </div>
                        <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                        <div style={{width: '50%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
                        <div style={{width: '50%', height: '15px', borderRadius: '5px', background: secondary_color}}></div>
                        </div>
                    </div>
                </div>
                <div style={{width: '100%', height: '15px', borderRadius: '5px', background: currentTheme.palette.light}}></div>
            </div>
    )
}

function UIDarkRepresentationComponent({backgroundcolor, themecolor}){
    return(
        <div style={{width: '90px', height: 'fit-content', borderRadius: '15px', background: backgroundcolor, display: 'flex',
            padding: '10px', flexDirection: 'column', gap: '5px'
        }}>

            <div style={{width: '100%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
            <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                <div style={{width: '40%', height: '10px', borderRadius: '5px', background: themecolor}}></div>
                <div style={{width: '60%', height: '10px', borderRadius: '5px', background: themecolor}}></div>
            </div>
            <div style={{width: '100%', display: 'flex', gap: '5px'}}>
                <div style={{width: '65%', height: '30px', borderRadius: '5px', background: themecolor}}></div>
                <div style={{width: '60%', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                    <div style={{width: '50%', height: '10px', borderRadius: '5px', background: themecolor}}></div>
                    <div style={{width: '50%', height: '10px', borderRadius: '5px', background: themecolor}}></div>
                    </div>
                    <div style={{width: '100%', display: 'flex', gap: '4px'}}>
                    <div style={{width: '50%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
                    <div style={{width: '50%', height: '15px', borderRadius: '5px', background: themecolor}}></div>
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
    <div     onClick={() => changeTheme(3)} style={{display:'flex', flexDirection: 'column', padding: '5px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', height: 'fit-content',
         border: currentThemeN == 3 ? `3px solid ${currentTheme.palette.sec}`  : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(47, 255, 227)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}}  control={<Radio  checked={currentThemeN == 3 ? true : false}

    sx={{color: currentTheme.palette.mid, padding: 0, margin: 0, '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>


    <div  onClick={() => changeTheme(1)} style={{display:'flex', flexDirection: 'column', padding: '5px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center',
             border: currentThemeN == 1 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(255,47,47)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="1" control={<Radio checked={currentThemeN == 1 ? true : false}
   
    sx={{color: currentTheme.palette.mid, padding: 0, margin: 0, '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>

      <div  onClick={() => changeTheme(5)} style={{display:'flex', flexDirection: 'column', padding: '5px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
           border: currentThemeN == 5 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(252, 116, 5)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="5" control={<Radio checked={currentThemeN == 5 ? true : false}
   
    sx={{color: currentTheme.palette.mid, padding: 0, margin: 0, '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>


    <div   onClick={() => changeTheme(2)} style={{display:'flex', flexDirection: 'column', padding: '5px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
           border: currentThemeN == 2 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='#1976d2'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="2" control={<Radio checked={currentThemeN == 2 ? true : false}
  
    sx={{color: currentTheme.palette.mid, padding: 0, margin: 0, '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
    />
    </div>


    <div     onClick={() => changeTheme(4)} style={{display:'flex', flexDirection: 'column', padding: '5px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
           border: currentThemeN == 4 ? `3px solid ${currentTheme.palette.sec}` : '3px solid rgba(0,0,0,0)'}}>
    <UIRepresentationComponent currentTheme={currentTheme} secondary_color='rgb(141, 1, 255)'/>
    <FormControlLabel style={{ margin: 0, padding: 0}} value="4" control={<Radio checked={currentThemeN == 4 ? true : false}

    sx={{color: currentTheme.palette.mid, padding: 0, margin: 0, '&.Mui-checked': {color: currentTheme.palette.sec }}} />}
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

       
     

        <div onClick={() => changeDarkMode('l')} style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
         }}>
            <div style={{background: 'rgb(240,240,240)', width: '50px', height: '50px', borderRadius: '5px',
                border: isDarkMode ? '3px solid rgba(0,0,0,0)' : `3px solid ${currentTheme.palette.sec}` 
            }}>

            </div>

    {/* <FormControlLabel style={{ margin: 0, padding: 0}}  control={<Radio checked={isDarkMode ? false : true}
    onClick={() => changeDarkMode('l')}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.lighter }}} />}
    /> */}
    </div>
        <div onClick={() => changeDarkMode('d')} style={{display:'flex', flexDirection: 'column', padding: '10px',
         borderRadius: '12px', width: 'fit-content', alignItems: 'center', 
         }}>
            <div style={{background: 'rgb(32,32,32)', width: '50px', height: '50px', borderRadius: '5px',
                border: isDarkMode ? `3px solid ${currentTheme.palette.sec}`  : '3px solid rgba(0,0,0,0)'
            }}>

            </div>

    {/* <FormControlLabel style={{ margin: 0, padding: 0}}  control={<Radio checked={isDarkMode ? true : false}
    onClick={() => changeDarkMode('d')}
    sx={{color: currentTheme.palette.mid,  '&.Mui-checked': {color: currentTheme.palette.lighter }}} />}
    /> */}
    </div>

    



  </div>
  </div>
  </FormControl>

       

        </React.Fragment>



    )
}



