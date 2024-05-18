import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, deepPurple, grey } from '@mui/material/colors';
import { Fab, SwipeableDrawer, Typography, Stack, Skeleton } from '@mui/material';


import Comment from './Comment';

import AddIcon from '@mui/icons-material/Add';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useParams } from 'react-router-dom';


const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    grey[900],
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 40,
  height: 5,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = React.useState(1)
  const [loading, setLoading] = React.useState(true)
  const [comments, setComments] = React.useState([])
  const [end, setEnd] = React.useState(false)
  const [noComments, setNoComments] = React.useState(false)
  const { id } = useParams();


 const getRatings = async () => {

      if (end) return
      const res = await fetch(`http://localhost:3001/ratings/${id}?page=${page}`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res.status == 200) {
        const data = await res.json()

        if (page == 1 && data?.length == 0){
          setNoComments(true)
          setEnd(true)
        } else {
          setComments([ ...comments, ...data ])
          if (data?.length < 10){
            setEnd(true)
          } else {
            setPage((prev_page) => { return prev_page + 1 })
          }
        }
        setLoading(false)
      }
    }


  const toggleDrawer = (newOpen) => () => {
    console.log('puller2')
    setOpen(newOpen);
    getRatings()
  };

  const toggleDrawerAlternativly = (s) => {
    console.log('puller')
    setOpen(s)
  }

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
            height: '80%'
          },
        }}
      />
      {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}

      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
          
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller onClick={() => toggleDrawerAlternativly(true)}/>
          <Typography sx={{ p: 2, color: grey[200] }}>

            Comments</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
            background: 'blue',
          }}
        >
          <Stack spacing={1}>

            {noComments ? 
              <div style={{width: '100%', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <InsertCommentIcon sx={{fontSize: '1.8em', color: grey[500]}}></InsertCommentIcon>
              <Typography sx={{ p: 1, color: grey[500], fontWeight: 600, fontSize: '0.9em' }}>No Comments Yet...</Typography>
              </div> : <></>
          }

            {comments.map(comment => {
              return (
                loading ?
                <div key={comment?._id}>
                  <h1>UÉ</h1>
                <Skeleton key={comment?._id} animation="wave" height={'60px'} width={"200px"} /> 
                </div> 
                :
                <Comment key={comment?._id} comment={comment?.comment} ></Comment>
              )
            })}

            {!end ?
            <button onClick={() => {getRatings()}}>fetch more</button>
            : <></>
            }
      
          </Stack>


          <Fab color="primary" aria-label="add" sx={{height: '50px', width: '50px', background: deepPurple[400], position: 'absolute', right: 5, bottom: 5}}>
        <AddIcon />
      </Fab>
        
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;