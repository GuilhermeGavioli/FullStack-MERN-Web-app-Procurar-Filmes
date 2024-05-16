import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';

import { useState, useContext,useEffect } from 'react';
import { AuthContext } from '../App';
import { Avatar, Menu, MenuItem, Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';


import SearchIcon from '@mui/icons-material/Search';

import styled from 'styled-components';

// const MySearchInput = styled.input`
//   background: ${grey[50]};
//   display: ${(props) => (props.isInputOpen ? 'hidden' : 'none')};
//   border: none;
//   height: 30px;
//   outline: none;
//   border-radius: 4px;
//   padding-left: 5px;
// `


export default function TopBar() {
  
  const {auth, setAuth, logout} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isInputOpen, setIsInputOpen] = useState(false)

  const [loadingh, setLoadingh] = useState(true);
  const [userPicture, setUserPicture] = useState(null)


    useEffect(() => {
      const getMyUserInfo = async () => {
        const res = await fetch('http://localhost:3001/auth/user/getinfo', {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        if (res.status == 200) {
          const userdata = await res.json()
          console.log(userdata.picture)
          setUserPicture(userdata.picture)
        } else {
          console.log('error')
        }
        setLoadingh(false)
      }
      getMyUserInfo()
    }, [])


    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed',top: 0, width: '100vw', zIndex: 10 }}>
      <AppBar position="static" sx={{background: grey[900]}}>
        <Toolbar variant="regular" sx={{justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
       

       
          {/* <Typography variant="h6" color="inherit" component="div">
            Movies
          </Typography> */}

           
            <div style={{}}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
     
              >
                {
                  loadingh ? 
              
                  <Skeleton animation="wave" variant="circular" width={'35px'} height={'35px'} sx={{bgcolor: grey[700]}} />
            
                  :
            
                <Avatar alt={auth.user?.name} src={userPicture}  sx={{p:0,m:0, width: '32px', height: '32px',bgcolor: grey[800] }} />
              
                }
              
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => {handleClose(); logout()}}>Logout</MenuItem>
              </Menu>
            </div>
          

        <div style={{display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'space-between'}}>
      
            {/* <MySearchInput isInputOpen={isInputOpen} placeholder="Search…"/> */}

{/* <IconButton size="large" aria-label="search" color="inherit" sx={{m:0, p:0}} onClick={() => setIsInputOpen(!isInputOpen)}> */}
<IconButton size="large" aria-label="search" color="inherit" sx={{m:0, p:0}}>
            <SearchIcon sx={{fontSize: '.9em'}} />
          </IconButton>
        </div>


        </Toolbar>
      </AppBar>
    </Box>
  );
}














