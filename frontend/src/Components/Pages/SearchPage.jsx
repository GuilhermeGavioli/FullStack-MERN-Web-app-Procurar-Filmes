import { grey } from '@mui/material/colors';
import { useParams, useSearchParams } from 'react-router-dom';
export default function SearchPage() {
    const [searchParams] = useSearchParams();
     const search_query = searchParams.get('search_query');
 


    return (
        <div style={{minHeight: '100%',height: 'fit-content', width: '100%', backgroundColor: grey[900],
backgroundColor: '#161616', 
paddingTop: '60px', display: 'flex', flexDirection: 'column', gap: '10px',
msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  paddingBottom: '60px'
}}>
    {/* <div style={{paddingTop: '150px', marginTop: '150px'}}> */}
        <p style={{background: 'red'}}>
            aokdcoadskocapd
            {search_query}
        
        </p>
        
    </div>
    );
}

