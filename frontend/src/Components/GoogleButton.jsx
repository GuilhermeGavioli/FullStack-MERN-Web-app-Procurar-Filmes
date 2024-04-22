
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';

import { useGoogleLogin } from '@react-oauth/google';

import { useContext } from 'react';
import { AuthContext } from '../App';

const GoogleButtonStyle = styled(Button)(({ theme }) => ({
    color: grey[900],
    // textTransform: 'none',
    backgroundColor: 'white',
}));

//ID=  483651865774-nt9c6up5vhk94roqmijr7kgdjd8jliud.apps.googleusercontent.com
//SECRET KEY=  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



export default function GoogleButonComp() {

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
  
}

return (
<>

    <GoogleButtonStyle fullWidth  onClick={login} variant="outlined">
      Continue with Google</GoogleButtonStyle>
</>
)}




