import * as React from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import EmailIcon from '@mui/icons-material/Email';
import { theme } from '../../theme';
import { Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import CircularProgress from '@mui/material/CircularProgress';

export default function ProfilePage (){
    const {user, userLoading, logout, loggingOutLoading} = React.useContext(AuthContext)


    return(
        <React.Fragment>

<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', gap: '10px'}}>

{userLoading 
?
<Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '50%'}} variant='rounded' width={'100px'} height={'100px'} />
:
<div style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
    <div style={{width: '100px', height: '100px', borderRadius: '50%',
    background: 'linear-gradient(180deg, rgb(118,77,202) 0%, rgba(70,70,175) 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <img src={user?.picture} style={{width: '93px', height: '93px', borderRadius: '50%',
    background: 'white', margin: 'auto'}} alt="" />
    </div>
    <h1 style={{fontSize: '1.5em', fontWeight: 500, color: 'white'}}>{user?.name}</h1>
</div>
}

<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
{userLoading 
?
<>
<Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '50%'}} variant='rounded' width={'30px'} height={'30px'} />
<Skeleton animation="wave" sx={{background: theme.palette.light,}} variant='rectangular' width={'200px'} height={'15px'} />
</>
:

<>
<div style={{background: theme.palette.mid, borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center'}}>
    <EmailIcon sx={{margin: 'auto', color: 'white', fontSize: '1em'}}/>
</div>
<p style={{fontSize: '.9em', fontWeight: 400, color: 'white'}}>{user?.email}</p>
</>
}
</div>

{
    userLoading ?
    <Skeleton animation="wave" sx={{background: theme.palette.light, borderRadius: '5px'}} variant='rectangular' width={'120px'} height={'35px'} />
    :

    !loggingOutLoading &&
        <Button color="error" variant="text" onClick={logout}>
    <LogoutIcon sx={{marginRight: '5px'}}></LogoutIcon>
    Log out</Button>
    

}

{
    loggingOutLoading &&
<Button disabled loading variant="outlined" sx={{width: '100px', height: '40px'}}>
<CircularProgress size={20} sx={{color: theme.palette.light}} />
</Button>
}

{/* <Button sx={{color: 'white'}} variant="text" >
    <ModeEditOutlineIcon sx={{marginRight: '5px'}}></ModeEditOutlineIcon>
    Edit
    </Button> */}


    

        </div>
        </React.Fragment>



    )
}