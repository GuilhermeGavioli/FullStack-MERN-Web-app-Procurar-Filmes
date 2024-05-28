
import Button from '@mui/material/Button';
import { useGoogleLogin  } from '@react-oauth/google';

import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { grey } from '@mui/material/colors';
import AuthContextProvider, { AuthContext } from './Contexts/AuthContext';






export default function GoogleButonComp() {
  const { setUser } = useContext(AuthContext)
  const navigator = useNavigate()

 

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => delegateGoogleOAuthToBackend(tokenResponse.access_token),
    
});


async function delegateGoogleOAuthToBackend(oauth_access_token){
  console.log(oauth_access_token)
  const res = await fetch(`http://localhost:3001/auth/google/${oauth_access_token}`);
  if (res.status == 200){
    const { access_token } = await res.json()
    localStorage.setItem('access_token', access_token)
    navigator('/')
  }
}

return (

  <AuthContextProvider>

    <Button fullWidth  onClick={login} variant="outlined"
    sx={{
      color: 'white',
      backgroundColor: grey[900],
      // border: `1px solid ${theme.palette.secondary.main}`,
      '&:hover': {
        // border: `1px solid ${theme.palette.secondary.main}`,
      }
    }}
    >
      Continue with Google</Button>
      </AuthContextProvider>


   // <GoogleLogin
    //clientId='483651865774-nt9c6up5vhk94roqmijr7kgdjd8jliud.apps.googleusercontent.com'
    //buttonText="Login with Google"
    //onSuccess={onSuccess}
    //onFailure={onFailure}
    ///> 
)}




