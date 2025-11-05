
import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarRecebimentos(){
    const objOptions = {statusRecebimento:"EFETIVADO",
    dataInicial:new Date().toLocaleDateString('pt-BR') + ' 00:00:00',
    dataFinal:new Date().toLocaleDateString('pt-BR') + ' 23:59:59'
    }
 async function fetchRecebimentos(): Promise<any> {
    const response = await fetchApiQuery<any>('recebimentos/listar',objOptions );
    return response; 
}

    const listarRecebimentosQuery = useQuery({
        queryKey: ['listarRecebimentosDia',objOptions],
        queryFn: ()=>fetchRecebimentos(),
        refetchOnWindowFocus: false,
    },);
    const data = listarRecebimentosQuery.data; 
    const empresas = Array.isArray(data?.recebimentos) ? data?.recebimentos : [];

    return empresas;
}