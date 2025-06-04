import { Fragment, useState, useContext } from "react"
import { ThemeContext } from "./Contexts/ThemeContext"
import { SnackBarContext } from "./Contexts/SnackBarContext"
import { AuthContext } from "./Contexts/AuthContext"
import { LocationContext } from "./Contexts/LocationContext"
import MovieScreen from "./Screen/MovieScreen"


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit';
import { MovieContext } from './Contexts/MovieContext';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Button, DialogActions, DialogContent, Fab, Rating, TextareaAutosize } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ProfileContext } from "./Contexts/ProfileContext"




const UnifiedComment = ({containMovieView, c_id, userid, username, pic, comment, openDialog, movie_id, stars}) => {
    const {currentTheme} = useContext(ThemeContext)
    const {user} = useContext(AuthContext)
    const {goTo} = useContext(LocationContext)
    const { handleDisplaySnackBar } = useContext(SnackBarContext)
      const {openProfilePage} = useContext(ProfileContext)

      function handleOpenProfile(){
        if (user._id == userid) {
            goTo('/profile/me')
        } else {
            openProfilePage(username, pic)
        }

      }

     const [imgSrc, setImgSrc] = useState(pic);
        const fallbackSrc = 'https://smartcitybusiness.com.br/wp-content/uploads/2025/03/default-avatar-icon-of-social-media-user-vector.jpg';

          const [editMode, setEditMode] = useState({editMode: false, newText: null, stars: null})
        
          const [stars2, setstars2] = useState(stars)
          const [comment2, setcomment2] = useState(comment)

                
        function enterEditMode(){
            setEditMode({editMode: true, newText: comment2, newStars: stars2})
        }
        function exitEditMode(){
            setEditMode({editMode: false, newText: null, newStars: null})
        }
        async function saveEditMode(){ //Update Otimista
        handleDisplaySnackBar('edit', 'A Edição foi Agendada com Sucesso!')
            await updateCommentRequest()
        }
        function setNewCommentValue(v){
            setEditMode({...editMode, newText: v})
        }
        function setNewStarsValue(s){
            setEditMode({...editMode, newStars: s, })
        }

        async function updateCommentRequest(){
       try{
              const res = await fetch(`https://procurarfilmes.xyz/ratings/update/${c_id}`, {
                  method: 'PUT',
                  body: JSON.stringify({comment: editMode.newText, stars: editMode.newStars, movie_id: movie_id}),
              
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
                  handleUpdateFail()
              }
              
            } catch(err){
             handleUpdateFail()
            }
        }

        function handleUpdateFail(){
 console.log('not ok')
                alert('Um erro inesperado aconteceu. Tente Novamente.')
        }

    return (
   <Fragment>
    <Card  sx={{boxShadow: 'none', height: 'fit-content', background: currentTheme.palette.dark, width: '100%', padding: '10px', borderRadius: '0', position: 'relative',
    maxWidth: '340px'
    }}>

   
      {
        (user._id == userid) &&
          <div style={{position: 'absolute', top: '5px',right: 0, display: 'flex', alignItems: 'center', gap: '5px'}} aria-label="settings">
               <EditIcon onClick={()=> enterEditMode()} sx={{color: currentTheme.palette.font_color, fontSize: '1.3em'}}/>
          <ThreeDotsPainel containMovieView={containMovieView} movie_id={movie_id} currentTheme={currentTheme} openDialog={openDialog} c_id={c_id} 
          aria-label="settings" />
          </div>
          }


      <CardHeader sx={{height: 'fit-content', padding:0}}
        avatar={
       
        <div style={{ width: '46px', height: '46px', borderRadius: '50%', 
         background: currentTheme.palette.mid, display: 'flex',
         alignItems: 'center', justifyContent: 'center'
         }}>
            <Avatar onClick={() => handleOpenProfile()} sx={{ width: '46px', height: '46px',bgcolor: currentTheme.palette.dark }}
            alt={username}
                            src={imgSrc || fallbackSrc}  
                 onError={() => setImgSrc(fallbackSrc)}
                     
            />
            </div>
        
        }
        title={
  
                     <div style={{width: '100%', display: 'flex', justifyContent: 'flex-start'}}>
             <div style={{flex: 1, width: '50%'}}>
<p onClick={() => handleOpenProfile()} variant="body1" style={{ color: currentTheme.palette.darker_font_color, fontWeight: 600, fontSize: '1.1em',
                        overflow: 'hidden',
                         textOverflow: 'ellipsis',
                         whiteSpace: 'nowrap',
  }}>{username}</p> 
                         </div>
           </div>



        }
        

        subheader={
          <>
          {
            editMode.editMode ?
               <Rating
                  sx={{color: currentTheme.palette.sec}}
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
                   readOnly sx={{color: currentTheme.palette.sec, marginTop: '3px'}} 
                   
                   emptyIcon={<StarIcon style={{ opacity: 0.85 }} fontSize="inherit" />}
                              />
          }
          </>
        }/>
      <div> 
        {
          editMode.editMode ?
          <>
          <div style={{marginTop: '10px'}}> 
              <TextareaAutosize style={{border: 'none', width: '100%', padding: '5px', outline: 'none',
                  '&:focus': {border: `2px solid ${currentTheme.palette.sec}`, outline: 'none'},
                  '&:hover': {border: `2px solid ${currentTheme.palette.sec}`, }
                          
              }}
       value={editMode.newText} onChange={(e) => setNewCommentValue(e.target.value)}/>
          </div>
                  <DialogActions style={{width: '100%', display: 'flex', justifyContent: 'end', gap: '0'}}>
                    <Button  style={{color: currentTheme.palette.editnomebtn}} onClick={()=> exitEditMode()}>Cancelar</Button>
                    <Button style={{color: currentTheme.palette.sec}} onClick={()=> saveEditMode()}>Salvar</Button>
                  </DialogActions>  
      </>
          :
          <Typography variant="body2"  component="p" sx={{fontSize: '1em', textAlign: 'justify', color: currentTheme.palette.darker_font_color, margin: 0,padding: 0, paddingTop: '10px', fontWeight: 500}}>
              {comment2}
          </Typography>
        }
      </div>
    </Card>


    {
        containMovieView && <MovieScreen draggable='false'/>
    }

    </Fragment>
    )
}

export default UnifiedComment


function ThreeDotsPainel({containMovieView, openDialog, c_id, currentTheme, movie_id }){
  const { handleOpenAndGetMovie } = useContext(MovieContext)
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

  
  
    function viewMovie(){
        handleClose()
      handleOpenAndGetMovie(movie_id)
    }

    return (

        <div>

<IconButton
aria-label="settings" aria-controls={open ? 'basic-menu' : undefined}  aria-haspopup="true"  aria-expanded={open ? 'true' : undefined}
onClick={handleClick} sx={{margin: 0, padding: 0}}
>

              <MoreVertIcon sx={{margin: 0,padding: 0,color: currentTheme.palette.font_color, fontSize: '1.2em'}} />

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
          <div style={{width: '100%', height: '100%' }}>  
      <MenuItem  onClick={() => both()}>Remover</MenuItem>
      {
        containMovieView && <MenuItem  onClick={() => viewMovie()}>Ver Filme</MenuItem>
      }

          </div>

    </Menu>
  </div>
    )
}