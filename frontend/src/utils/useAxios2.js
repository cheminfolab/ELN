import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const useAxios2 = (params, authentication=false) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async params => {
        try {
            const result = await axios.request(params);
            setResponse(result.data);
        } catch( error ) {
             setError(error);
        } finally {
             setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(params);
    }, []); // execute once only

    return { response, error, loading };
};

export default useAxios2