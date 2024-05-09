import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { deepPurple, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Comment from './Comment';
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

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

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
          }}
        >
          <Stack spacing={1}>

            <div style={{width: '100%', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <InsertCommentIcon sx={{fontSize: '1.8em', color: grey[500]}}></InsertCommentIcon>
            <Typography sx={{ p: 1, color: grey[500], fontWeight: 600, fontSize: '0.9em' }}>No Comments Yet...</Typography>
            </div>
            
          <Comment></Comment>
          <Comment></Comment>
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