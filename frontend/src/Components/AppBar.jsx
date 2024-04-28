
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import CustomizedSwitch from './CustomizedSwitch';
import { useContext, useState } from 'react';
import { ThemeContext, AuthContext } from '../App';
import { Avatar } from '@mui/material';
import { grey, amber } from '@mui/material/colors';


export default function MenuAppBar() {

  const { theme, toggleThemeHandler } = useContext(ThemeContext);
  const {auth, setAuth, logout} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

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
    <Box sx={{ flexGrow: 1, top: 0, width: '100vw', zIndex: 10, boxShadow: 'none', textShadow: 'none' }}>

      <AppBar position="static" sx={{
          '& .MuiToolbar-root': {
            display: 'flex',
            background: theme.palette.primary.main,
           justifyContent: 'space-between'
          }
        }}>
        <Toolbar >
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />

          </IconButton> */}
     
 {/* <CustomizedSwitch toggleThemeHandler={toggleThemeHandler}></CustomizedSwitch> */}

          {auth.isAuth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
     
              >
                <Avatar alt="Gemy Sharp" src="/static/images/avatar/1.jpg"  sx={{ bgcolor: grey[600] }} />
              
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
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}