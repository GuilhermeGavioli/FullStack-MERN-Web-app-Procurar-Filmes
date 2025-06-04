import { Card, CardHeader, Typography, Skeleton } from "@mui/material"
import { theme } from "../../theme"
import { ThemeContext } from "../Contexts/ThemeContext"
import { useContext } from "react"


export default function CommentSkeleton (){
      const {currentTheme} = useContext(ThemeContext)
    return (
        <Card sx={{ background: currentTheme.palette.dark, width: '100%', padding: '10px', borderRadius: '0',
          boxShadow: 'none'
        }}>
        <CardHeader sx={{padding:0}}
          avatar={
<Skeleton animation="wave" sx={{background: currentTheme.palette.light, borderRadius: '50%', marginBottom: '10px'}} variant="rectangular" width={'45px'} height={'45px'} /> 
          }
          title={
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'50%'} height={'15px'} /> 
          }
          subheader={
            <Skeleton animation="wave" sx={{background: currentTheme.palette.light, marginTop: '5px'}} variant="rectangular" width={'40px'} height={'12px'} /> 
          }/>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'80%'} height={'10px'} /> 
        <Skeleton animation="wave" sx={{background: currentTheme.palette.light}} variant="rectangular" width={'60%'} height={'10px'} /> 
    
            
        </div>
      </Card>

    )
}