import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { grey, pink } from '@mui/material/colors';
import { useState, useEffect } from 'react';



import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { theme } from '../theme';
import { Fab } from '@mui/material';
import { AuthContext } from './Contexts/AuthContext';




function ThreeDotsPainel({openDialog, c_id}){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    function both(){
      handleClose()
      openDialog(c_id)
    } 

  

    return (

        <div>

<IconButton 
aria-label="settings" aria-controls={open ? 'basic-menu' : undefined}  aria-haspopup="true"  aria-expanded={open ? 'true' : undefined}
onClick={handleClick}
>

              <MoreVertIcon sx={{color: 'white'}} />

            </IconButton>


    <Menu

      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
          <div style={{width: '100%', height: '100%', background: theme.palette.purple}}>
      <MenuItem  onClick={() => both()}>Delete</MenuItem>
          </div>

    </Menu>
  </div>
    )
}




export default function Comment({c_id, userid, username, pic, comment, openDialog}) {

  const {user} = React.useContext(AuthContext)

  

  return (
    <Card  sx={{height: 'fit-content', background: theme.palette.light, width: '100%', padding: '10px', borderRadius: '0', position: 'relative',
    }}>

   
      {
        (user._id == userid) &&
          <div style={{position: 'absolute', top: 0, right: 0}} aria-label="settings">
          <ThreeDotsPainel openDialog={openDialog} c_id={c_id} aria-label="settings" />
          </div>
          }

      <CardHeader sx={{height: 'fit-content', padding:0}}
        avatar={
         <div style={{ width: '45px', height: '45px', borderRadius: '50%', 
         background: 'linear-gradient(180deg, rgba(129,48,246,1) 0%, rgba(197,167,240,1) 100%)', display: 'flex',
         alignItems: 'center', justifyContent: 'center'
         }}>
        <div style={{ width: '41px', height: '41px', borderRadius: '50%', 
         background: theme.palette.mid, display: 'flex',
         alignItems: 'center', justifyContent: 'center'
         }}>
            <Avatar sx={{ width: '30px', height: '30px',bgcolor: theme.palette.dark }}
            alt={username}
            src={pic}
            />
            </div>
            </div>
        }
        title={
            <Typography variant="body1" style={{color: 'white', fontWeight: 600}}>{username}</Typography>
        }
        subheader={<p style={{color: 'rgb(119,115,144)', fontSize: '.9em', fontWeight: 600}}>5 Hours Ago</p>}/>
      <div> 
          <Typography variant="body2"  component="p" sx={{ textAlign: 'justify', color: 'white', margin: 0,padding: 0, paddingTop: '10px', fontWeight: 500}}>
              {comment}
          </Typography>
      </div>
    </Card>
  )
}



