
import Button from '@mui/material/Button';
import { useGoogleLogin, GoogleLogin  } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
// import { ThemeContext } from '../App';
import { grey } from '@mui/material/colors';


import {jwtDecode} from "jwt-decode";



export default function GoogleButonComp() {
  // const { theme } = useContext(ThemeContext)
  const navigator = useNavigate()

  const {auth, setAuth} = useContext(AuthContext)

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => delegateGoogleOAuthToBackend(tokenResponse.access_token),
    
});


async function delegateGoogleOAuthToBackend(oauth_access_token){
  const res = await fetch(`http://localhost:3001/googleauth?oauth_access_token=${oauth_access_token}`);
  const { access_token } = await res.json()
  localStorage.setItem('access_token', access_token)
  setAuth({ isAuth: true, access_token })
  navigator('/')
}

return (


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


   // <GoogleLogin
    //clientId='483651865774-nt9c6up5vhk94roqmijr7kgdjd8jliud.apps.googleusercontent.com'
    //buttonText="Login with Google"
    //onSuccess={onSuccess}
    //onFailure={onFailure}
    ///> 
)}




