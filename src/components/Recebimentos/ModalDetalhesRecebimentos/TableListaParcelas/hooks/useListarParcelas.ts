import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarParcelasVendas(recebimentoVendaId:number){

 async function fetchParcelas(): Promise<any> {
    const response = await fetchApiQuery<any>('parcelasVenda/listar', {recebimentoVendaId});
    return response; 
}

    const listaParcelasVendasQuery = useQuery({
        queryKey: ['listarParcelasRecebimentos',{recebimentoVendaId}],
        queryFn: ()=>fetchParcelas(),
    });
    const data = listaParcelasVendasQuery.data; 
    const empresas = Array.isArray(data?.parcelaVendas)  ? data?.parcelaVendas  : [];

    return empresas;
}