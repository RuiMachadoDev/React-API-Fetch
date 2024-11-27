import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); //Estado para detalhar os erros das respostas da API

    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => setError(error)) //Apanha o erro e faz o que eu definir que deve ser feito nesse caso
        .finally(() => setLoading(false)); //Executa só quando todas as outras ações/promessas forem executadas ou cumpridas
    }, []);

    return { data, loading, error };
}

export default useFetch;