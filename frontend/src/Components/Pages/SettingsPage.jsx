import * as React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import { theme, theme2 } from '../../theme';
import { Divider, Skeleton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import CircularProgress from '@mui/material/CircularProgress';
import PinkSwitch from '../PinkSwitch';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useContext } from 'react';


export default function SettingsPage (){
    const {currentTheme, changeTheme, currentThemeN} = useContext(ThemeContext)




    return(
        <React.Fragment>

         <p style={{
            paddingLeft: '15px',
            fontSize: '.9em', fontWeight: 500, color: currentTheme.palette.lighter, marginTop: '10px', marginBottom: '5px'}}>
          Tema:
        </p>
       
<div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '15px'}}>


<div onClick={() => changeTheme(1)} style={{
     border: currentThemeN == 1 ? `3px solid rgb(255,47,47)` : '',
    width: '35px', height: '35px', position: 'relative', background: currentTheme.palette.mid, borderRadius: '50%', overflow: 'hidden'}}>
        <div style={{width: '10px', height: '110%', background: 'rgb(255,47,47)', position: 'absolute', right: 0}}></div>
</div>

<div onClick={() => changeTheme(2)} style={{
     border: currentThemeN == 2 ? `3px solid rgb(255, 202, 27)` : '',
    width: '35px', height: '35px', position: 'relative', background: currentTheme.palette.mid, borderRadius: '50%', overflow: 'hidden'}}>
        <div style={{width: '10px', height: '110%', background: 'rgb(255, 202, 27)', position: 'absolute', right: 0}}></div>
</div>

<div onClick={() => changeTheme(3)} style={{
     border: currentThemeN == 3 ? `3px solid rgb(47, 255, 227)` : '',
    width: '35px', height: '35px', position: 'relative', background: currentTheme.palette.mid, borderRadius: '50%', overflow: 'hidden'}}>
        <div style={{width: '10px', height: '110%', background: 'rgb(47, 255, 227)', position: 'absolute', right: 0}}></div>
</div>



        </div>
        </React.Fragment>



    )
}