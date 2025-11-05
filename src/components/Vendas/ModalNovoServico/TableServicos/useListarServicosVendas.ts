import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarServicosVendas(vendaId:number){

 async function fetchPdvUsuarios(): Promise<any> {
    const response = await fetchApiQuery<any>('servicosVendas/listar', {vendaId});
    return response; 
}

    const listaPDvsQuery = useQuery({
        queryKey: ['listaServicosVendas',{vendaId}],
        queryFn: ()=>fetchPdvUsuarios(),
        refetchOnWindowFocus: false,
    },);
    const data = listaPDvsQuery.data; 
    if(vendaId == 0) return []
    const listaServicosVendas = Array.isArray(data?.servicosVendas) ? data?.servicosVendas : [];
    return listaServicosVendas;
}