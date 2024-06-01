import * as React from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import EmailIcon from '@mui/icons-material/Email';
import { theme } from '../../theme';
import { Skeleton } from '@mui/material';

export default function ProfilePage (){
    const {user, userLoading, logout} = React.useContext(AuthContext)


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


    

        </div>
        </React.Fragment>



    )
}