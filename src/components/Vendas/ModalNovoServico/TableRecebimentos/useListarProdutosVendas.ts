import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarProdutosVendas(vendaId:number){

 async function fetchPdvUsuarios(): Promise<any> {
    const response = await fetchApiQuery<any>('produtoVenda/listar', {vendaId});
    return response; 
}

    const listaPDvsQuery = useQuery({
        queryKey: ['listaProdutosVendasUsuario',{vendaId}],
        queryFn: ()=>fetchPdvUsuarios(),
        refetchOnWindowFocus: false,
    },);
    const data = listaPDvsQuery.data; 
    if(vendaId == 0) return []
    const pdv = Array.isArray(data?.produtosvendas) ? data?.produtosvendas : [];
    return pdv;
}