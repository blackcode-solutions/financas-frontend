
import { convertToPtBrFormat, returnDate } from "@/helpers/convertTimeLocalToPtBr";
import { onSubData } from "@/helpers/dataFunctions";
import { useFiltrostabelaRecebimentosFechamentosConcluidos } from "@/helpers/stores/filtrosTelaFechamentosConcluidos";
import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarFechamentos(){
    
    const filtrosTabela = useFiltrostabelaRecebimentosFechamentosConcluidos((state) => state.filtrosTabelaRecebimentos);

    const objOptions = {
        ...filtrosTabela,
    dataInicial:filtrosTabela.dataInicial ? convertToPtBrFormat(filtrosTabela.dataInicial)+":00" : onSubData(30,returnDate("00",'00')),
    dataFinal:filtrosTabela.dataFinal ? convertToPtBrFormat(filtrosTabela.dataFinal)+":59" : new Date().toLocaleDateString('pt-BR') + ' 23:59:59'
    
    }
 async function fetchRecebimentos(): Promise<any> {
    const response = await fetchApiQuery<any>('fecharPDV/listar',objOptions );
    return response; 
}

    const listarRecebimentosQuery = useQuery({
        queryKey: ['listaPDVFechados',objOptions],
        queryFn: ()=>fetchRecebimentos(),
        refetchOnWindowFocus: false,
    },);
    const data = listarRecebimentosQuery.data; 
    const recebimentos = Array.isArray(data?.fechamentos) ? data?.fechamentos : [];

    return recebimentos;
}