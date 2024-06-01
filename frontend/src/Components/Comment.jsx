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



function handleClickOpenDialog(){

}

function ThreeDotsPainel({handleClickOpenDialog}){
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
      handleClickOpenDialog()
    } 

  

    return (

        <div>

<IconButton id="basic-button"
aria-label="settings" aria-controls={open ? 'basic-menu' : undefined}  aria-haspopup="true"  aria-expanded={open ? 'true' : undefined}
onClick={handleClick}
>
              <MoreVertIcon />
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
      <MenuItem onClick={() => both()}>Delete</MenuItem>

    </Menu>
  </div>
    )
}




export default function Comment({comment}) {




  return (
    <Card sx={{ background: theme.palette.light, width: '100%', padding: '10px', borderRadius: '0'}}>
      <CardHeader sx={{padding:0}}

        avatar={
         
         <div style={{ width: '45px', height: '45px', borderRadius: '50%', 
         background: 'linear-gradient(180deg, rgba(52,30,102,1) 0%, rgba(118,99,164,1) 100%)', display: 'flex',
         alignItems: 'center', justifyContent: 'center'
         }}>

        <div style={{ width: '40px', height: '40px', borderRadius: '50%', 
         background: 'rgb(49,34,95)', display: 'flex',
         alignItems: 'center', justifyContent: 'center'
         }}>

            <Avatar
            sx={{ width: '35px', height: '35px',bgcolor: pink[800] }}
            alt="Ted talk"
            src="/static/images/avatar/1.jpg"
            />

            </div>
            </div>
          
        }
        // action={
         
        //  <ThreeDotsPainel handleClickOpenDialog={handleClickOpenDialog}></ThreeDotsPainel>
          
        // }
        title={
          
        
            <Typography variant="body1" style={{color: 'white', fontWeight: 600}}>Goldmines</Typography>
            
          
        }
        subheader={
       
    
      
            <p style={{color: 'rgb(119,115,144)', fontSize: '.9em', fontWeight: 600}}>5 Hours Ago</p>
          
        }
      />
  

     
      <div>

          <Typography variant="body2"  component="p" sx={{ textAlign: 'justify', color: 'white', margin: 0,padding: 0, paddingTop: '10px', fontWeight: 500}}>
             

              {comment}
            
          </Typography>
      </div>
    
    
    </Card>
  );
}



