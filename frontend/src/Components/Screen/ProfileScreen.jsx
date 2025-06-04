import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


import { Stack, styled as MUIStyled, Box, Fab, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateRatingDialog from '../CreateRatingDialog';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useContext, useRef } from 'react';
import ActorCard from '../ActorCard';
import { MovieContext } from '../Contexts/MovieContext';
import { ProfileContext } from '../Contexts/ProfileContext';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function ProfileScreen() {

  const {currentTheme} = useContext(ThemeContext)
  const {isProfileOpen, setIsProfileOpen, profileName, profilePicture} = useContext(ProfileContext)

  const listRef = useRef(null);

 



  const handleClose = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsProfileOpen(false)
  };







  return (



      <Dialog
   
        fullScreen
        open={isProfileOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >



<AppBar position="static" sx={{background: currentTheme.palette.bars}}>
        <Toolbar variant="regular" sx={{justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
           
    
        <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
             
        </Toolbar>
      </AppBar>

      
        <Box 
         ref={listRef}
        sx={{width: '100%', height: '100%', background: currentTheme.palette.bg, overflowY: 'scroll', padding: '10px 10px 20px 10px'}}>


       <Stack spacing={'10px'} sx={{width: '100%', margin: "auto",alignItems:'center' }}>

<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', gap: '10px'}}>


<div style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
    <img src={profilePicture} style={{width: '93px', height: '93px', borderRadius: '50%',
     margin: 'auto'}} alt="" />
        <h1 style={{fontSize: '1.5em', fontWeight: 500, color: currentTheme.palette.darker_font_color}}>{profileName}</h1>
</div>


<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>


{/* <p style={{fontSize: '.9em', fontWeight: 400, color: currentTheme.palette.contra}}>sem email</p> */}




</div>

</div>



       </Stack>



        </Box>









    

   



    

      
   
      </Dialog>



  )
}



const MovieTopicContainer = MUIStyled(Typography)`
  padding: 0 20px 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start; 
  margin: auto; 
  justify-content: flex-start;

       ${(props) => props.currentTheme.breakpoints.down('md')} {
           max-width: 350px;
    }

    ${(props) => props.currentTheme.breakpoints.up('md')} {
           max-width: 550px;
  }

  ${(props) => props.currentTheme.breakpoints.up('lg')} {
        max-width: 850px;
  }
`

const MovieTopicTitle = MUIStyled(Typography)`
font-weight: 600;
 color: ${(props) => props.currentTheme.palette.sec};

     ${(props) => props.currentTheme.breakpoints.down('md')} {
      }
      
      ${(props) => props.currentTheme.breakpoints.up('md')} {
        
      }
      
      ${(props) => props.currentTheme.breakpoints.up('lg')} {
        font-size: 1.5em;
      }
`
