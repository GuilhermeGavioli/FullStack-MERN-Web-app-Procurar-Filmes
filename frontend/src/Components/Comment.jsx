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
import { grey } from '@mui/material/colors';
import { useState, useEffect } from 'react';


export default function Comment() {
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 2000);
  }, [loading])

  return (
    <Card sx={{  background: '#161616', background: grey[100] , padding:'10px', borderRadius: '15px'}}>
      <CardHeader sx={{padding:0}}
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
            sx={{ width: '35px', height: '35px',bgcolor: grey[800] }}
              alt="Ted talk"
              src="/static/images/avatar/1.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
              sx={{ width: '35px', height: '35px',  }}
            />
          ) : (
            <p style={{color: grey[800], fontWeight: 600}}>Ted</p>
            
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            <p style={{color: grey[800], fontSize: '.9em'}}>5 Hours Ago</p>
          )
        }
      />
  

      <CardContent sx={{padding: 0, margin: 0}}>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2"  component="p" sx={{color: grey[700], margin: 0,mt: 1}}>
             

              Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success.
            
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}



