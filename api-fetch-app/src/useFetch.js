import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        //Executa só quando todas as outras ações/promessas forem executadas ou cumpridas
        .finally(() => setLoading(false));
    }, []);

    return { data, loading };
}

export default useFetch;