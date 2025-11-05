
import { convertToPtBrFormat, returnDate } from "@/helpers/convertTimeLocalToPtBr";
import { onSubData } from "@/helpers/dataFunctions";
import { useFiltrostabelaRecebimentosFechamentos } from "@/helpers/stores/filtrosTelaFechamentos";
import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarRecebimentos({clearselectedsRows}:{clearselectedsRows:()=>void}){
    
    const filtrosTabela = useFiltrostabelaRecebimentosFechamentos((state) => state.filtrosTabelaRecebimentos);
    

    const objOptions = {
        ...filtrosTabela,
        statusRecebimento:"EFETIVADO",
    dataInicial:filtrosTabela.dataInicial ? convertToPtBrFormat(filtrosTabela.dataInicial) : onSubData(30,returnDate("00",'00')),
    dataFinal:filtrosTabela.dataFinal ? convertToPtBrFormat(filtrosTabela.dataFinal) : new Date().toLocaleDateString('pt-BR') + ' 23:59:59'
    
    }
 async function fetchRecebimentos(): Promise<any> {
    const response = await fetchApiQuery<any>('recebimentos/listar',objOptions );
    clearselectedsRows()
    return response; 
}

    const listarRecebimentosQuery = useQuery({
        queryKey: ['listaFechamentoRecebimentos',objOptions],
        queryFn: ()=>fetchRecebimentos(),
        refetchOnWindowFocus: false,
    },);
    const data = listarRecebimentosQuery.data; 
    const recebimentos = Array.isArray(data?.recebimentos) ? data?.recebimentos : [];

    return recebimentos;
}