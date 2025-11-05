import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export function useListarPagamentos(meusPagamentos:boolean,setTotaisPagamentos:(value:number)=> void){

 async function fetchPagamentosUsuarios(): Promise<any> {
    const response = await fetchApiQuery<any>('pagamentosUsuario/listar', {meusPagamentos,isPago:"S"});
    return response; 
}

    const listaPagamentosQuery = useQuery({
        queryKey: ['listarPagamentosFechamentoUsuario',{meusPagamentos,isPago:"S"}],
        queryFn: ()=>fetchPagamentosUsuarios(),
    });
    const data = listaPagamentosQuery.data; 

    useEffect(()=>{
        if(listaPagamentosQuery.isSuccess && Array.isArray(data?.pagamentos)){
            const dataResult = data?.pagamentos
            const totalPagamentos = dataResult.reduce((acc:any,element:any)=>{
                acc += parseFloat(element.valor)
                return acc
            },0)
            setTotaisPagamentos(totalPagamentos)
        }
    },[listaPagamentosQuery.isSuccess,data])
    
    const empresas = Array.isArray(data?.pagamentos)  ? data?.pagamentos  : [];

    return empresas;
}