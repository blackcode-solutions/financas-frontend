import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


export function useListarFornecedores(){

 async function fetchFornecedores(): Promise<any> {
    const response = await fetchApiQuery<any>('fornecedores/listar', {});
    return response; 
}

    const listaPagamentosQuery = useQuery({
        queryKey: ['listaFornecedoresCadastro',{}],
        queryFn: ()=>fetchFornecedores(),
    });
    const data = listaPagamentosQuery.data; 
    console.log(data)
    const empresas = Array.isArray(data?.fornecedores)  ? data?.fornecedores  : [];

    return empresas;
}