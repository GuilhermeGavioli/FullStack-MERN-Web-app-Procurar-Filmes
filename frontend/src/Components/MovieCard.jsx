import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating } from '@mui/material';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { grey } from '@mui/material/colors';
import CustomizedButton from './CustomizedButton';


export default function MovieCard({title, description, rating}) {
  return (


    <Card sx={{ maxWidth: 200, minWidth: 200 }}>
    <CardMedia
      sx={{ height: 200 }}
      image="https://play-lh.googleusercontent.com/-thEPwcogHMGgY9K6F2zVpmVHSRw30FLH3vTdsR_nd6g2_RL3Jz3S4XkqBSqa0KomGW_"
      title={title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" color={grey[800]}>
        {title}
      </Typography>
      <Typography variant="body2"  color={grey[500]}>
       {description}
      </Typography>
      <Rating
      sx={{marginTop: '10px'}}
        name="read-only"
        readOnly 
        value={2}
        onChange={(event, newValue) => {
            //   setValue(newValue);
        }}/>
    </CardContent>
    <CardActions>
    
        <CustomizedButton size="small" text="View More"></CustomizedButton>
        <Button size="small">Rate</Button>

    </CardActions>
  </Card>



  );
}




