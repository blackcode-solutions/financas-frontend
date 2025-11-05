import { convertToPtBrFormat, returnDate } from "@/helpers/convertTimeLocalToPtBr";
import { onSubData } from "@/helpers/dataFunctions";
import { useFiltrosTabelaRecbVendas } from "@/helpers/stores/filtrosTelaVendas";
import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarVendas(){
    const filtrosTabela = useFiltrosTabelaRecbVendas((state) => state.filtrostabelaVendas);
    
    const objOptions = {
        statusVenda:"PENDENTE",
        bolUsuario: false,
        ...filtrosTabela,
        dataInicial: filtrosTabela.dataInicial ? convertToPtBrFormat(filtrosTabela.dataInicial) : onSubData(30,returnDate("00",'00')),
        dataFinal: filtrosTabela.dataFinal ? convertToPtBrFormat(filtrosTabela.dataFinal) : new Date().toLocaleDateString('pt-BR') + ' 23:59:59'
    };

 async function fetchVendasUsuario(): Promise<any> {
    const response = await fetchApiQuery<any>('vendas/listar',objOptions);
    return response; 
}

    const listaVendasUsuarioQuery = useQuery({
        queryKey: ['listaVendasPendentesUsuario',objOptions],
        queryFn: ()=>fetchVendasUsuario(),
        refetchOnWindowFocus: true,
    },);
    const data = listaVendasUsuarioQuery.data; 
    const empresas = Array.isArray(data?.vendas) ? data?.vendas : [];

    return empresas;
}