import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Rating } from '@mui/material';
import { AuthContext } from './Contexts/AuthContext';
import { ThemeContext } from './Contexts/ThemeContext';
import { MovieContext } from './Contexts/MovieContext';
import EditIcon from '@mui/icons-material/Edit';
import { Button, DialogActions, DialogContent, Fab, TextareaAutosize } from '@mui/material';

function ThreeDotsPainel({openDialog, c_id, currentTheme}){
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
          <div style={{width: '100%', height: '100%', background: currentTheme.palette.pink}}>
      <MenuItem  onClick={() => both()}>Remover</MenuItem>
          </div>

    </Menu>
  </div>
    )
}




export default function Comment({c_id, userid, username, pic, comment, openDialog, stars}) {
    const {currentTheme, setCurrentTheme} = React.useContext(ThemeContext)
    const {movie} = React.useContext(MovieContext)
  const {user} = React.useContext(AuthContext)

    const [editMode, setEditMode] = useState({editMode: false, newText: null, stars: null})

     const [stars2, setstars2] = useState(stars)
      const [comment2, setcomment2] = useState(comment)

   function enterEditMode(){
    setEditMode({editMode: true, newText: comment2, newStars: stars2})
  }
  function exitEditMode(){
    setEditMode({editMode: false, newText: null, newStars: null})
  }
 async function saveEditMode(){
    await updateCommentFetch()
  }
  function setNewCommentValue(v){
    setEditMode({...editMode, newText: v})
  }
  function setNewStarsValue(s){
    setEditMode({...editMode, newStars: s, })
  }
    async function updateCommentFetch(){
 try{
        const res = await fetch(`http://procurarfilmes.xyz/ratings/update/${c_id}`, {
            method: 'PUT',
            body: JSON.stringify({comment: editMode.newText, stars: editMode.newStars, movie_id: movie._id}),
        
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        if (res.status == 200) {
          console.log('ok')
              setstars2(editMode.newStars)
            setcomment2(editMode.newText)
            setEditMode({...editMode, editMode: false})
        } else {
          console.log('not ok')
          alert('Um erro inesperado aconteceu. Tente Novamente.')
        }
        
      } catch(err){
        alert('Um erro inesperado aconteceu. Tente Novamente.')
        console.log(err)
      }
  }

  

  return (
    <Card  sx={{height: 'fit-content', background: currentTheme.palette.dark, width: '100%', padding: '10px', borderRadius: '0', position: 'relative',
      boxShadow: 'none'
    }}>

   
      {
        (user._id == userid) &&

          <div style={{position: 'absolute', top: 0, right: 0, display: 'flex', alignItems: 'center', gap: '5px'}} aria-label="settings">
                       <EditIcon onClick={()=> enterEditMode()} style={{color: 'white', fontSize: '1.2em'}}/>
                  <ThreeDotsPainel movie_id={movie._id} currentTheme={currentTheme} openDialog={openDialog} c_id={c_id} aria-label="settings" />
                  </div>
       
        //   <div style={{position: 'absolute', top: 0, right: 0}} aria-label="settings">
        // <EditIcon onClick={()=> enterEditMode()} style={{color: 'white', fontSize: '1.2em'}}/>
        //   <ThreeDotsPainel  currentTheme={currentTheme} openDialog={openDialog} c_id={c_id} aria-label="settings" />
        //   </div>
          }

      <CardHeader sx={{height: 'fit-content', padding:0}}
        avatar={
        
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', 
         background: currentTheme.palette.mid, display: 'flex',
         alignItems: 'center', justifyContent: 'center'
         }}>
            <Avatar sx={{ width: '40px', height: '40px',bgcolor: currentTheme.palette.dark }}
            alt={username}
            src={pic}
            />
            </div>
           
        }
        title={
            <Typography variant="body1" style={{color: 'white', fontWeight: 600}}>{username}</Typography>
        }
        subheader={
        <>
             {/* <Rating size="small" name="read-only" value={stars} readOnly
              sx={{color: currentTheme.palette.pink, marginTop: '3px'}}
                     emptyIcon={<StarIcon style={{ opacity: 0.85 }} fontSize="inherit" />}
                      /> */}


                    
                                {
                                  editMode.editMode ?
                                     <Rating
                                        sx={{color: currentTheme.palette.pink}}
                                  emptyIcon={<StarIcon style={{ opacity: 0.85 }} fontSize="inherit" />}
                                  value={editMode.newStars}
                                  defaultValue={editMode.newStars}
                                  onChange={(event, newValue) => {
                                    setNewStarsValue(newValue);
                                  }}
                                  />
                                  :
                                       <Rating size="small" name="read-only"
                                        value={stars2}
                                         readOnly sx={{color: currentTheme.palette.pink, marginTop: '3px'}} emptyIcon={<StarIcon style={{ opacity: 0.85 }} fontSize="inherit" />}
                                                    />
                                }
                           
   
        </>}
        />
      <div> 
          {/* <Typography variant="body2"  component="p" sx={{ textAlign: 'justify', color: 'white', margin: 0,padding: 0, paddingTop: '10px', fontWeight: 500}}>
              {comment}
          </Typography> */}

                  {
                    editMode.editMode ?
                    <>
                    <div style={{marginTop: '10px'}}> 
                        <TextareaAutosize style={{border: 'none', width: '100%', padding: '5px'}}
                 value={editMode.newText} onChange={(e) => setNewCommentValue(e.target.value)}/>
                    </div>
                            <DialogActions style={{width: '100%', display: 'flex', justifyContent: 'end', gap: '0'}}>
                              <Button  style={{color: currentTheme.palette.lighter}} onClick={()=> exitEditMode()}>Cancelar</Button>
                              <Button style={{color: currentTheme.palette.pink}} onClick={()=> saveEditMode()}>Salvar</Button>
                            </DialogActions>  
                </>
                    :
                    <Typography variant="body2"  component="p" sx={{ textAlign: 'justify', color: 'white', margin: 0,padding: 0, paddingTop: '10px', fontWeight: 500}}>
                        {comment2}
                    </Typography>
                  }
      </div>
    </Card>
  )
}



