import * as React from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import EmailIcon from '@mui/icons-material/Email';
import { theme } from '../../theme';
import { Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import EditIcon from '@mui/icons-material/Edit';

import CircularProgress from '@mui/material/CircularProgress';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function ProfilePage (){
        const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)
    const {user, userLoading, logout, loggingOutLoading} = React.useContext(AuthContext)


function enterEditMode(){

}

    return(
        <React.Fragment>

<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', gap: '10px'}}>

{userLoading 
?
<Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '50%'}} variant='rounded' width={'100px'} height={'100px'} />
:
<div style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
    <div style={{width: '100px', height: '100px', borderRadius: '50%',
    background: `linear-gradient(180deg, ${currentTheme.palette.sec} 0%,${currentTheme.palette.sec_light}`, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <img src={user?.picture} style={{width: '93px', height: '93px', borderRadius: '50%',
    background: currentTheme.palette.contra, margin: 'auto'}} alt="" />
    </div>
    <h1 style={{fontSize: '1.5em', fontWeight: 500, color: currentTheme.palette.contra}}>{user?.name}</h1>
</div>
}

<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
{userLoading 
?
<>
<Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '50%'}} variant='rounded' width={'30px'} height={'30px'} />
<Skeleton animation="wave" sx={{background: currentTheme.palette.light,}} variant='rectangular' width={'200px'} height={'15px'} />
</>
:

<>
{/* <div style={{background: currentTheme.palette.mid, borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center'}}>
    <EmailIcon sx={{margin: 'auto', color: currentTheme.palette.contra, fontSize: '1em'}}/>
</div> */}
<p style={{fontSize: '.9em', fontWeight: 400, color: currentTheme.palette.contra}}>{user?.email}</p>
</>
}
</div>

{
    userLoading ?
    <Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '5px'}} variant='rectangular' width={'120px'} height={'35px'} />
    :

    !loggingOutLoading &&
    <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
    <Button sx={{color: currentTheme.palette.lighter, border: `1px solid ${currentTheme.palette.lighter}` }} variant="outlined" onClick={logout}>
     <EditIcon onClick={()=> enterEditMode()} style={{color: currentTheme.palette.lighter, fontSize: '1.2em', marginRight: '5px'}}/>
    Editar Nome</Button>

        <Button sx={{backgroundColor: currentTheme.palette.sec}} variant="contained" onClick={logout}>
    <LogoutIcon sx={{marginRight: '5px',fontSize: '1.2em'}}></LogoutIcon>
    Log out</Button>
    </div>

}

{
    loggingOutLoading &&
<Button disabled loading variant="outlined" sx={{width: '100px', height: '40px'}}>
<CircularProgress size={20} sx={{color: currentTheme.palette.light}} />
</Button>
}

{/* <Button sx={{color: currentTheme.palette.contra}} variant="text" >
    <ModeEditOutlineIcon sx={{marginRight: '5px'}}></ModeEditOutlineIcon>
    Edit
    </Button> */}


    

        </div>
        </React.Fragment>



    )
}