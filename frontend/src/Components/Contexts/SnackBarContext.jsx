import { createContext, useState } from "react"
import SnackBar from "../SnackBar"

export const SnackBarContext = createContext()

function SnackBarContextProvider ({children}) {
    const [snackbarCreate, setSnackbarCreate] = useState({display: false, position: false, message: null })
    const [snackbarDelete, setSnackbarDelete] = useState({display: false, position: false, message: null })
    const [snackbarEdit, setSnackbarEdit] = useState({display: false, position: false, message: null })
    const [snackbarError, setSnackbarError] = useState({display: false, position: false, message: null })

    function handleDisplaySnackBar(snackBar, message){
        if (snackBar === 'create') {
            setSnackbarCreate((prev) => { return {...prev, message: message, display: true }})
            setTimeout(() => {
            setSnackbarCreate((prev) => { return {...prev, position: true }})
            }, 300);
            setTimeout(()=>{
            setSnackbarCreate((prev) => { return {...prev, position: false }})
            },3500)
            setTimeout(() => {
            setSnackbarCreate((prev) => { return {...prev, display: false }})
            }, 4000)
        } else if (snackBar === 'delete') {
            setSnackbarDelete((prev) => { return {...prev, message: message, display: true }})
            setTimeout(() => {
            setSnackbarDelete((prev) => { return {...prev, position: true }})
            }, 300);
            setTimeout(()=>{
            setSnackbarDelete((prev) => { return {...prev, position: false }})
            },3500)
            setTimeout(() => {
            setSnackbarDelete((prev) => { return {...prev, display: false }})
            }, 4000)
        } else if (snackBar === 'edit') {
            setSnackbarEdit((prev) => { return {...prev, message: message, display: true }})
            setTimeout(() => {
            setSnackbarEdit((prev) => { return {...prev, position: true }})
            }, 300);
            setTimeout(()=>{
            setSnackbarEdit((prev) => { return {...prev, position: false }})
            },3500)
            setTimeout(() => {
            setSnackbarEdit((prev) => { return {...prev, display: false }})
            }, 4000)
        } else if (snackBar === 'error') {
            setSnackbarError((prev) => { return {...prev, message: message, display: true }})
            setTimeout(() => {
            setSnackbarError((prev) => { return {...prev, position: true }})
            }, 300);
            setTimeout(()=>{
            setSnackbarError((prev) => { return {...prev, position: false }})
            },3500)
            setTimeout(() => {
            setSnackbarError((prev) => { return {...prev, display: false }})
            }, 4000)
        }
    }
    
    return (
        <SnackBarContext.Provider value={{snackbarCreate, snackbarDelete, snackbarEdit, snackbarError, handleDisplaySnackBar}}>

            <SnackBar type={'create'} text={snackbarCreate.message} state={{open: snackbarCreate.position, visible: snackbarCreate.display}} setter={handleDisplaySnackBar}/>
            <SnackBar type={'delete'} text={snackbarDelete.message} state={{open: snackbarDelete.position, visible: snackbarDelete.display}} setter={handleDisplaySnackBar}/>
            <SnackBar type={'edit'} text={snackbarEdit.message} state={{open: snackbarEdit.position, visible: snackbarEdit.display}} setter={handleDisplaySnackBar}/>
            <SnackBar type={'error'} text={snackbarError.message} state={{open: snackbarError.position, visible: snackbarError.display}} setter={handleDisplaySnackBar}/>
 

            {children}
        </SnackBarContext.Provider>
    
    )
}


export default SnackBarContextProvider