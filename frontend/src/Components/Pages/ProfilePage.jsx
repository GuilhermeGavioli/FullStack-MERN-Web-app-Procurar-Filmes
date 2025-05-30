import * as React from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import EmailIcon from '@mui/icons-material/Email';
import { theme } from '../../theme';
import { DialogActions, Skeleton, TextareaAutosize } from '@mui/material';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import EditIcon from '@mui/icons-material/Edit';

import CircularProgress from '@mui/material/CircularProgress';
import { ThemeContext } from '../Contexts/ThemeContext';
import styled from 'styled-components';


// ({currentTheme, isDarkTheme}) => `

    const StyledTextarea = styled('input')((props) => ({
width: '100%',
    padding: '5px',
    resize: 'unset',
    border: `${props.isDarkTheme  ? 'none' : '1px solid rgb(220,220,220)'}`,
    color: props.currentTheme.palette.bottom_bar_icon,
    fontSize: '1.1em',
    '&:focus': {
        border: `2px solid ${props.currentTheme.palette.sec}`,
        outline: 'none',
        resize: 'unset',
    }
    }))


     
export default function ProfilePage (){
        const {currentTheme, setCurrentTheme, isDarkTheme} = React.useContext(ThemeContext)
    const {user, userLoading, logout, loggingOutLoading} = React.useContext(AuthContext)
    const [isEditMode, setIsEditMode] = React.useState(false)
    const [name2, setName2] = React.useState(user.name)
    const [newNameValue, setNewNameValue] = React.useState(name2)

function enterEditMode(){
    setIsEditMode(true)
}

async function runEdtiFetch(){
    const res = await fetch(`http://localhost:80/user/edit?name=${encodeURIComponent(newNameValue)}`, {
    method: 'GET',
     headers: {
            'Content-Type': 'application/json',
             'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    if (res.status == 200){
        setName2(newNameValue)
        setIsEditMode(false)
    } else {
        const {msg} = await res.json()
        alert('err' +msg)
    }
}

async function saveEditMode(){
    await runEdtiFetch()
    
}
function exitEditMode(){
    setIsEditMode(false)
}

    return(
        <React.Fragment>

<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', gap: '10px'}}>

{userLoading 
?
<Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '50%'}} variant='rounded' width={'100px'} height={'100px'} />
:
<div style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
   
    <img src={user?.picture} style={{width: '93px', height: '93px', borderRadius: '50%',
     margin: 'auto'}} alt="" />
    

    {
        isEditMode ? 
        <>
            <div style={{marginTop: '10px'}}> 
                <StyledTextarea
   
                currentTheme={currentTheme}
                isDarkTheme={isDarkTheme}
            value={newNameValue} onChange={(e) => setNewNameValue(e.target.value)}/>
            </div>
                                        <DialogActions style={{width: '100%', display: 'flex', justifyContent: 'center', gap: '0'}}>
                              <Button  style={{color: currentTheme.palette.editnomebtn}} onClick={()=> exitEditMode()}>Cancelar</Button>
                              <Button style={{color: currentTheme.palette.sec}} onClick={()=> saveEditMode()}>Salvar</Button>
                            </DialogActions>  
            </>
        :
        <h1 style={{fontSize: '1.5em', fontWeight: 500, color: currentTheme.palette.darker_font_color}}>{name2}</h1>
    }
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
<p style={{fontSize: '.9em', fontWeight: 400, color: currentTheme.palette.darker_font_color}}>{user?.email}</p>
</>
}
</div>

{
    userLoading ?
    <Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '5px'}} variant='rectangular' width={'120px'} height={'35px'} />
    :

    !loggingOutLoading &&


        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
    <Button onClick={enterEditMode} disabled={isEditMode} sx={{color: currentTheme.palette.editnomebtn, border: `1px solid ${currentTheme.palette.editnomebtn}` }} variant="outlined">
     <EditIcon style={{color: currentTheme.palette.editnomebtn, fontSize: '1.2em', marginRight: '5px'}}/>
    Editar Nome</Button>
    

        <Button sx={{backgroundColor: currentTheme.palette.sec}} variant="contained" onClick={logout}>
    <LogoutIcon sx={{marginRight: '5px',fontSize: '1.2em'}}></LogoutIcon>
    Sair</Button>
    </div>

}

{
    loggingOutLoading &&

    
        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
    <Button onClick={enterEditMode} disabled='true' sx={{color: currentTheme.palette.editnomebtn, border: `1px solid ${currentTheme.palette.editnomebtn}` }} variant="outlined">
     <EditIcon style={{color: currentTheme.palette.editnomebtn, fontSize: '1.2em', marginRight: '5px'}}/>
    Editar Nome</Button>

<Button disabled loading variant="outlined" sx={{width: '100px', height: '40px', display: 'flex', gap: '10px'}}>
<CircularProgress size={20} sx={{color: currentTheme.palette.light}} />
Sair
</Button>
    </div>
}

{/* <Button sx={{color: currentTheme.palette.contra}} variant="text" >
    <ModeEditOutlineIcon sx={{marginRight: '5px'}}></ModeEditOutlineIcon>
    Edit
    </Button> */}


    

        </div>
        </React.Fragment>



    )
}