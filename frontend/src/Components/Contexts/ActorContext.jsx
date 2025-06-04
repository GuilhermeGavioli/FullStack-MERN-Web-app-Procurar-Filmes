import { createContext, useContext, useState } from "react"
import RattingsScreen from "../Screen/CommentsScreen"
import { MovieContext } from "./MovieContext"

export const ActorContext = createContext()

function ActorContextProvider ({children}) {
    const [actorName, setActorName] = useState('')
    const [actorPic, setActorPic] = useState('')
    const [actorNac, setActorNac] = useState('')
    const [actorAge, setActorAge] = useState('')
    const [isActorLoading, setIsActorLoading] = useState(false)
    const [isActorContainerOpen, setIsActorContainerOpen] = useState(false)
    
    async function handleOpenAndGetActor(name, pic, age, nac){
        setActorName(name)
        setActorPic(pic)
        setActorAge(age)
        setActorNac(nac)
        setIsActorContainerOpen(true)
    }

    async function handleCloseActor(){
        setIsActorLoading(false)
        setIsActorContainerOpen(false)
    }

      return(
        <ActorContext.Provider value={{ isActorContainerOpen, setIsActorContainerOpen, actorName, actorPic,actorAge, actorNac, handleOpenAndGetActor, handleCloseActor }}>
            {children}
        </ActorContext.Provider>
      )
    
}

export default ActorContextProvider