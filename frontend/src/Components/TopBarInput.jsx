import * as React from 'react';
import { styled as styledMUI, alpha } from '@mui/material/styles';

import Box from '@mui/material/Box';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { Toolbar,AppBar } from '@mui/material';
import { deepPurple, grey } from '@mui/material/colors';
import styled from 'styled-components';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    border-radius: 0 15px 15px 0;
    overflow: hidden;
  display: flex;
  width: 100%;
    background: ${grey[900]};
  height: 40px;

`

const SearchIconWrapper = styled.div`
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GoButton = styled.button`
height: 100%;
width: 100%;
background:  ${grey[900]};
color:  ${grey[700]};
border: none;
font-weight: 700;
cursor: pointer;
position: relative;
&:hover:{
    background: red;
}
 
`

const BallEffect = styled.div`
top: 10px; 
right: 15px;
position: absolute;
height: 5px;
width: 5px;
background:  ${deepPurple[900]};
border-radius: 50%;

`

const StyledInput = styled.input`
  color: inherit;
width: 100%;
height: 100%;
border: none;
background: unset;

outline: unset;
    transition: ease-in-out 0.3s;
  
      &:focus: {
   
        opacity: '50%';
      },
      
      &::placeholder {
        font-weight: 700;
        color: ${grey[700]};
      }
`



export default function TopBarInput() {
  const [searchValue, setSearchValue] = useState(null)
  const navigate = useNavigate();

  function handleSearchChange(value){
    setSearchValue(value)
  } 

  function runSearchQuery(){
    console.log(searchValue)
    navigate(`/results?search_query=${searchValue}`);
  }

    return (
            <Container>
              <SearchIconWrapper >
                <SearchIcon   sx={{color: grey[900]}}/>
              </SearchIconWrapper>

              <div style={{
                flexGrow: 1,

              }}>

              <StyledInput
              value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
                </div>

                <div style={{width: '60px'}}>

                <GoButton onClick={runSearchQuery}>
                    go
                    <BallEffect></BallEffect>
                    </GoButton>
                </div>
            </Container>
            
      
      
  
    );
  }