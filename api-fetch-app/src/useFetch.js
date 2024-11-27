import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); //Estado para detalhar os erros das respostas da API
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);

        fetch(url, {signal: abortController.signal}) //Permite que se faça um rastreio ao pedido para conseguir controlar o que se passa com o pedido à API
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => {
                if(error.name === "AbortError") {
                    console.log("Request cancelled");
                } else {
                    setError(error); //Apanha o erro e faz o que eu definir que deve ser feito nesse caso
                }  
            })
            .finally(() => setLoading(false)); //Executa só quando todas as outras ações/promessas forem executadas ou cumpridas

        return () => abortController.abort(); //Vai ser executada quando o componente for desmontado (quando já não for visível na tela)
    }, []);

    const handleCancelRequest = () => {
        if(controller) {
            controller.abort();
            setError("Request cancelled");
        }
    }

    return { data, loading, error, handleCancelRequest };
}

export default useFetch;