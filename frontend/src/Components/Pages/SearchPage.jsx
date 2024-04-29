

import { useParams, useSearchParams } from 'react-router-dom';
export default function SearchPage() {
    const [searchParams] = useSearchParams();
     const search_query = searchParams.get('search_query');
 


    return (
     <div style={{paddingTop: '150px', marginTop: '150px'}}>
        <p style={{background: 'red'}}>
            aokdcoadskocapd
            {search_query}
        
        </p>
        
    </div>
    );
}

