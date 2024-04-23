
import Button from '@mui/material/Button';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { grey } from '@mui/material/colors';


//ID=  483651865774-nt9c6up5vhk94roqmijr7kgdjd8jliud.apps.googleusercontent.com
//SECRET KEY=  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



export default function GoogleButonComp() {
  const { theme } = useContext(ThemeContext)
  const navigator = useNavigate()

  const {auth, setAuth} = useContext(AuthContext)

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onGoogleSuccessLogin(tokenResponse),
    flow: 'auth-code'
});

function onGoogleSuccessLogin(tokenResponse){
  console.log(tokenResponse)
  delegateGoogleOAuthToBackend()
}

async function delegateGoogleOAuthToBackend(){
  // fetch backend
  // return token and userinfo
  const data = {token: 'asdckapsdck', user: {image: 'myimg', name: 'Guilherme'}}
  setAuth({
    isAuth: true,
    token: data.token,
    user: {
      name: data.user.name,
      image: data.user.image
    }
  })
  Cookies.set('token', data.token, { expires: 7 });
  navigator('/')
  
}

return (


    <Button fullWidth  onClick={login} variant="outlined"
    sx={{
      color: 'white',
      backgroundColor: grey[900],
      border: `1px solid ${theme.palette.secondary.main}`,
      '&:hover': {
        border: `1px solid ${theme.palette.secondary.main}`,
      }
    }}
    >
      Continue with Google</Button>

)}




