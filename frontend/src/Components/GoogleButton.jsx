
import Button from '@mui/material/Button';
import { useGoogleLogin  } from '@react-oauth/google';

import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { grey } from '@mui/material/colors';
import  { AuthContext } from './Contexts/AuthContext';
import { theme } from '../theme';
import { ThemeContext } from './Contexts/ThemeContext';
import { useState } from 'react';






export default function GoogleButonComp() {
  const { setUser } = useContext(AuthContext)
  const {currentTheme, isDarkMode } = useContext(ThemeContext)
  const navigator = useNavigate()
  const [googleButonActive, setGoogleButtonActive] = useState(true)

 

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => delegateGoogleOAuthToBackend(tokenResponse.access_token),
})


async function delegateGoogleOAuthToBackend(oauth_access_token){
  setGoogleButtonActive(false)
  console.log('token:', oauth_access_token)
  const res = await fetch(`https://procurarfilmes.xyz/auth/google/${oauth_access_token}`);
  setGoogleButtonActive(true)
  if (res.status == 200){
    const { access_token } = await res.json()
    localStorage.setItem('access_token', access_token)
    navigator('/')
  } else { //err

  }
}

return (



    <Button disabled={!googleButonActive} onClick={login} variant="contained"
    sx={{
      marginTop: '100px',
      height: '45px',
      color: currentTheme.palette.contra,
      padding: '0',
      boxShadow: 'none',
      border: isDarkMode ? 'none' : '1px solid rgb(225,225,225)',
      // border: `1px solid ${theme.palette.light}`,
      backgroundColor: 'white',
      
      textTransform: 'none',
      // border: `1px solid ${theme.palette.sec.main}`,
      '&:hover': {
        // border: `1px solid ${theme.palette.sec.main}`,
      },
      width: '45px',
      minWidth: 'unset'
    }}
    >


<div style={{height: 'fit-content', padding: 0}}>
<svg style={{padding: 0, marginTop: '5px'}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
</div>

{/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
<path fill="#4b4dff" d="M50.575,82C32.929,82,18.57,67.647,18.57,50s14.359-32,32.005-32 c7.995,0,15.647,2.962,21.554,8.342l1.076,0.984L62.651,37.88l-0.978-0.837c-3.098-2.652-7.038-4.114-11.098-4.114 c-9.413,0-17.076,7.658-17.076,17.071s7.663,17.071,17.076,17.071c6.788,0,12.152-3.467,14.679-9.375H49.184V43.288l31.375,0.043 l0.234,1.103c1.636,7.766,0.326,19.19-6.304,27.364C68.999,78.565,60.956,82,50.575,82z"></path><polygon fill="#ff8405" points="27,73.875 38.562,62.312 51.5,68 62.5,63 74.375,73.25 59,81.125 39.375,80.625"></polygon><path fill="#ff8405" d="M24.625,31.125l10.25,11.625c0,0,11.428-17.989,27.776-4.87L72.75,26.625 C72.75,26.625,46.25,6.25,24.625,31.125z"></path><rect width="4" height="14.584" x="27.156" y="30.614" fill="#edf7f5" transform="rotate(-45.001 29.156 37.907)"></rect><rect width="15.291" height="4" x="25.511" y="65.469" fill="#edf7f5" transform="rotate(-45.001 33.156 67.47)"></rect><rect width="4" height="19.849" x="67.5" y="58.575" fill="#edf7f5" transform="rotate(-49.088 69.496 68.5)"></rect><path fill="#4343bf" d="M50.575,85c-19.303,0-35.006-15.701-35.006-35s15.703-35,35.006-35 c8.741,0,17.114,3.24,23.574,9.125l3.397,3.104l-13.081,13.08l18.523,0.025l0.738,3.478c1.778,8.443,0.331,20.952-6.909,29.877 C70.729,81.194,61.9,85,50.575,85z M50.575,21c-15.994,0-29.006,13.01-29.006,29s13.012,29,29.006,29 c9.428,0,16.689-3.059,21.583-9.091c5.645-6.958,7.027-16.597,5.933-23.581l-25.907-0.036v8.403h17.617l-1.788,4.18 c-2.998,7.01-9.517,11.195-17.438,11.195c-11.07,0-20.076-9.004-20.076-20.07s9.006-20.07,20.076-20.07 c4.275,0,8.439,1.378,11.879,3.906l6.375-6.376C63.675,23.284,57.255,21,50.575,21z M50.575,35.93 c-7.762,0-14.076,6.312-14.076,14.07s6.314,14.07,14.076,14.07c3.634,0,6.757-1.192,9.055-3.375H46.184V40.284l14.686,0.02 l-1.146-0.979C57.166,37.135,53.918,35.93,50.575,35.93z"></path><path fill="#3abcf8" d="M52.08,88.769c-0.155,0-0.312-0.001-0.467-0.004C29.771,88.445,12,71.953,12,52h9.639 C22.62,66.795,35.351,78.526,51.76,78.767c7.641,0.092,15.922-3.8,21.196-9.965l7.598,6.502 C73.421,83.639,62.55,88.769,52.08,88.769z"></path>
</svg> */}
      </Button>
   


   // <GoogleLogin
    //clientId='483651865774-nt9c6up5vhk94roqmijr7kgdjd8jliud.apps.googleusercontent.com'
    //buttonText="Login with Google"
    //onSuccess={onSuccess}
    //onFailure={onFailure}
    ///> 
)}




