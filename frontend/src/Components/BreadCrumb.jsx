import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadCrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" color={grey[700]} sx={{fontSize: '0.7em'}}>
        <Link underline="hover" color="inherit" href="/">
          Movies
        </Link>
         <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          
        </Link>
        {/*<Typography color={grey[700]} sx={{fontSize: '0.8em'}}>Breadcrumbs</Typography> */}
      </Breadcrumbs>
    </div>
  );
}