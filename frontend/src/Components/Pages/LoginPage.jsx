import CustomizedButton  from '../CustomizedButton';
import GoogleButonComp  from '../GoogleButton';
import CustomizedInput  from '../CustomizedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


import { useContext } from 'react';
import { ThemeContext } from '../../App';




export default function LoginPage() {
    
  const { theme, toggleThemeHandler } = useContext(ThemeContext);

   

  return (

     <>
      <div style={{background: 'radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(0,0,0,0.05364143948595068) 54%, rgba(0,0,0,0.2833333162366509) 100%)',
       position: 'fixed', width: '100vw', height: '100vh',pointerEvents: 'none' }}>
      </div>


   
        {/* <CentralizedContainer> */}
        <div style={{background:  theme.palette.primary.main, width: '100vw', height: '100vh' , 
    display: 'flex', 
    alignItems: 'center',

    justifyContent: 'center'}}>
        <Stack spacing={2} sx={{width: '200px', background: theme.palette.primary.main, background: 'gray', padding: '10px'}}>
             <Typography variant="h6" component="div" fontWeight="fontWeightMedium" sx={{ flexGrow: 1 }} >
            Sign In
          </Typography>
          <CustomizedInput placeholder="Email"></CustomizedInput>
          <CustomizedInput placeholder="Password" password={true}></CustomizedInput>
          <CustomizedButton text="Login"></CustomizedButton>
          <GoogleButonComp></GoogleButonComp>

        </Stack>
        </div>
      {/* </CentralizedContainer> */}
      </>

  )
}




