import styled from 'styled-components'
import { useContext } from 'react';
import { MovieContext } from './Contexts/MovieContext';
import { theme } from '../theme';
import { ThemeContext } from './Contexts/ThemeContext';

export default function MovieCard({movie}) {
  const { handleOpenAndGetMovie } = useContext(MovieContext)
  const { currentTheme } = useContext(ThemeContext)

  function replaceImage(el) {
    el.src = "https://www.shutterstock.com/image-vector/no-photo-blank-image-icon-260nw-1955339317.jpg";
  }

  return (
    <Movie currentTheme={currentTheme} draggable='false' src={movie?.cover} onError={(e) => replaceImage(e.target)} onClick={() => handleOpenAndGetMovie(movie?._id)}/>
  )      
}

const Movie = styled.img`
  user-select: unset;
  border-radius: 15px;
  &: hover: {
    filter: brightness(1.1);
    cursor: pointer;
  }

  ${theme.breakpoints.down('md')} {
      width: 135px;
      height: 175px;
      max-width: 150px;
  }

  ${theme.breakpoints.up('md')} {
       width: 135px;
      height: 175px;
      max-width: 150px;
  }

  ${theme.breakpoints.up('lg')} {
    width: 160px;
    height: 185px;
}
`