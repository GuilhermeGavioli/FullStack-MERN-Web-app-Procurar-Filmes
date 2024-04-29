import { Skeleton } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors"
import { useState, useEffect } from "react"


export default function CategoryBar({title}){
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])

    return(
        <>
        {
            loading ?
            <Skeleton animation="wave" sx={{background: grey[900]}} variant="rectangular" width={'100%'} height={'100%'} />
            :
            <div style={{position: 'relative', width: '100%', height: '100%', background: grey[900],  borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '10px', paddingLeft: '20px'}}>
            <div style={{position: 'absolute', left: 0, height: '100%', width: '10px', background: deepPurple[900]}}></div>
                <p style={{fontFamily: 'roboto', color: 'white', fontWeight: '700'}}>
                {title}
                </p>
              </div>
        }
        </>
        

    )
}