import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarServicos(){

 async function fetchServicos(): Promise<any> {
    const response = await fetchApiQuery<any>('servicos/listar', {});
    return response; 
}

    const listaServicosQuery = useQuery({
        queryKey: ['listaServicos'],
        queryFn: ()=>fetchServicos(),
    });
    const data = listaServicosQuery.data; 
    const servicos = Array.isArray(data?.servicos) ? data?.servicos : [];

    return servicos;
}