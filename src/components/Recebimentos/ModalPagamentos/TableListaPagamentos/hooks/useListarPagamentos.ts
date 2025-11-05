import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


export function useListarPagamentos(meusPagamentos:boolean){

 async function fetchPagamentosUsuarios(): Promise<any> {
    const response = await fetchApiQuery<any>('pagamentosUsuario/listar', {meusPagamentos,isPago:"S"});
    return response; 
}

    const listaPagamentosQuery = useQuery({
        queryKey: ['listarPagamentosUsuario',{meusPagamentos,isPago:"S"}],
        queryFn: ()=>fetchPagamentosUsuarios(),
    });
    const data = listaPagamentosQuery.data; 
    console.log(data)
    const empresas = Array.isArray(data?.pagamentos)  ? data?.pagamentos  : [];

    return empresas;
}