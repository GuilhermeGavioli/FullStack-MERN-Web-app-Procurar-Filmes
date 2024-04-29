import CustomizedButton  from '../CustomizedButton';
import GoogleButonComp  from '../GoogleButton';
import CustomizedInput  from '../CustomizedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


import { useContext } from 'react';





export default function LoginPage() {
    
  // const { theme, toggleThemeHandler } = useContext(ThemeContext);


 
   

  return (

     <>

        <div style={{background: 'red', width: '100vw', height: '100vh' , 
    display: 'flex', 
    alignItems: 'center',

    justifyContent: 'center'}}>
        <Stack spacing={2} sx={{width: '200px', background:'red' , padding: '10px'}}>
             {/* <Typography color='white' variant="h6" component="div" fontWeight="fontWeightMedium" sx={{ flexGrow: 1 }} >
            Sign In
          </Typography> */}
          {/* <CustomizedInput placeholder="Email"></CustomizedInput>
          <CustomizedInput placeholder="Password" password={true}></CustomizedInput>
          <CustomizedButton text="Login"></CustomizedButton> */}
          <GoogleButonComp></GoogleButonComp>

        </Stack>
        </div>
      {/* </CentralizedContainer> */}
      </>

  )
}




