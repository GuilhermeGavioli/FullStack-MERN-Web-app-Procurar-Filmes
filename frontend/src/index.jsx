import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';



import { GoogleOAuthProvider  } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.getElementById('root').style.width = '100%'
document.getElementById('root').style.height = '100%'
root.render(
  <GoogleOAuthProvider clientId="483651865774-cia2qbsqglugfhvkupj1reua0s4stgn9.apps.googleusercontent.com">
       <BrowserRouter>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
       </BrowserRouter>
  </GoogleOAuthProvider>
);

// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
