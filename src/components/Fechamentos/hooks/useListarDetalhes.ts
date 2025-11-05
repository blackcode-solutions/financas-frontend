import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarDetalhes(fechamentoPDVUsuarioId:number){

 async function fetchParcelas(): Promise<any> {
    const response = await fetchApiQuery<any>('fecharPDV/detalhesFechamento', {fechamentoPDVUsuarioId});
    return response; 
}

    const listaParcelasVendasQuery = useQuery({
        queryKey: ['listaDetalhesFechamentos',{fechamentoPDVUsuarioId}],
        queryFn: ()=>fetchParcelas(),
    });
    const data = listaParcelasVendasQuery.data; 
    const empresas = data?.detalhes ? data?.detalhes : {
        resultadosParcelas:[],
        resultadosPagamentos:[]
    };

    return empresas;
}