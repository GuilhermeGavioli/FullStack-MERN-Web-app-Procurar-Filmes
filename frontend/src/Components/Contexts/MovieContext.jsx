import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

function MovieContextProvider ({ children }) {

    const [isMovieContainerOpen, setIsMovieContainerOpen] = useState(false);
    const [movie, setMovie]= useState({})
    const [movieLoading, setMovieLoading]= useState(false)

  
    async function handleOpenAndGetMovie(id){
      console.log(id)
        setMovieLoading(true)
        setIsMovieContainerOpen(true)
        const url = `http://procurarfilmes.xyz/movie/${id}`
          const res = await fetch(url, {
            headers: {
              'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          })
    

            if (res.status == 200) {
            const data = await res.json()
            console.log(data)
            setMovie(data)
          }
          setMovieLoading(false)
   
      }
    
      function handleCloseMovie(){
        setMovieLoading(false)
        setIsMovieContainerOpen(false)
        setMovie({})
      }

    return (
      <MovieContext.Provider value={{ movie, movieLoading, isMovieContainerOpen, handleOpenAndGetMovie, handleCloseMovie }}>
        {children}
      </MovieContext.Provider>
    );
  };
  
  export default MovieContextProvider