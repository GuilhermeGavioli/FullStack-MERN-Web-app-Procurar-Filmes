import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SingleSelectionInput({name, value, setValue, available_values}){

   const handleChange = (event) => {
     setValue(event.target.value);
   }
 
   return (
     <Box sx={{ minWidth: 120 }}>
       <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">{name}</InputLabel>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           value={value}
           label={value}
           onChange={handleChange}
         >
           {
           available_values.map((val) => (
             <MenuItem value={val}>{val}</MenuItem>
           ))
           }
         </Select>
       </FormControl>
     </Box>
   );
 }