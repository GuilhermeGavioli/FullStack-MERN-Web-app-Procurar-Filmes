import GoogleButonComp  from '../GoogleButton';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import AuthContextProvider from '../Contexts/AuthContext';


export default function LoginPage() {
    

  return (

     <AuthContextProvider>

        <div style={{background: grey[900], width: '100vw', height: '100vh' , 
    display: 'flex', 
    alignItems: 'center',

    justifyContent: 'center'}}>
        <Stack spacing={2} sx={{width: '200px', padding: '10px'}}>

          <GoogleButonComp></GoogleButonComp>

        </Stack>
        </div>

      </AuthContextProvider>

  )
}




