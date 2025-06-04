import { createContext, useContext, useState } from "react"
import { MovieContext } from "../Contexts/MovieContext"

export const CommentsContext = createContext()

function CommentsContextProvider ({children}) {

      const [ratingsPage, setRatingsPage] = useState(1)
      const [isRatingsEnd, setIsRatingsEnd] = useState(false)
      const [isRatingsContainerOpen, setIsRatingsContainerOpen] = useState(false);
      const [ratings, setRatings] = useState([])
      const [ratingsLoading, setRatingsLoading] = useState(false)
      const [loadingMoreRatings, setLoadingMoreRatings] = useState(false)
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
      const [currentCommentId, setCurrentCommentId] = useState(null)
      const {movie} = useContext(MovieContext)

      const getMoreRatings = async () => {
    console.log('firing gettting more ratings')
    if (isRatingsEnd || loadingMoreRatings) return
    setLoadingMoreRatings(true)
    const res = await fetch(`https://procurarfilmes.xyz/ratings/${movie?._id}?page=${ratingsPage}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })

    if (res.status == 200) {
      const data = await res.json()
      console.log(data)
      if (data.length < 20){
        setIsRatingsEnd(true)
      }
      setRatingsPage(prev_page => {return prev_page + 1})
      setRatings([...ratings, ...data])
      
    }
    setLoadingMoreRatings(false)
  }
  
  async function handleOpenAndGetRatings(){
      setRatingsLoading(true)
      setLoadingMoreRatings(true)
      setIsRatingsContainerOpen(true)
      const url = `https://procurarfilmes.xyz/ratings/${movie?._id}?page=${ratingsPage}`
      const res = await fetch(url, {
          headers: {
              'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        if (res.status == 200) {
            const data = await res.json()
            if (data.length < 20){
                setIsRatingsEnd(true)
            }
            setRatingsPage(prev_page => {return prev_page + 1})
            setRatings(data)
        }
        setLoadingMoreRatings(false)
    }
    
    
        function handleCloseRatings(){
        setIsRatingsEnd(false)
        setRatingsLoading(false)
        setIsRatingsContainerOpen(false)
        setRatings([])
        setRatingsPage(prev_page => {return 1})
      }



     const openDialog = (c_id) => {
      setCurrentCommentId(c_id)
      setIsDeleteDialogOpen(true)
    }
    const closeDialog = () => {
      setIsDeleteDialogOpen(false)
    }

    return (
         <CommentsContext.Provider value={{loadingMoreRatings,
            getMoreRatings, isRatingsEnd, isRatingsContainerOpen, setIsRatingsContainerOpen, isDeleteDialogOpen,
            ratings, setRatings, handleOpenAndGetRatings, handleCloseRatings, openDialog, closeDialog }}>
            {children}   {/* children = CommentsScreen */}
         </CommentsContext.Provider>
    )
}

export default CommentsContextProvider