import { Skeleton } from "@mui/material"

const MovieInformationSkeleton = () => {
    return(
          <div style={{padding: '0 10px 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <Skeleton animation="wave" height={32} width={'100%'} style={{ marginBottom: 2, maxWidth: '400px' }} />
            <Skeleton animation="wave" height={32} width={'70%'} style={{ marginBottom: 2 , maxWidth: '400px'}}/>
            <Skeleton animation="wave" height={32} width={'60%'}  style={{ marginBottom: 2, maxWidth: '400px' }}/>
            <Skeleton animation="wave" height={32} width={'80%'}  style={{ marginBottom: 2, maxWidth: '400px' }}/>
            </div>
    )
} 

export default MovieInformationSkeleton