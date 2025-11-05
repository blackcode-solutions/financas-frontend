import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarConfigBarbeiro(configuracaoRepasseId?:number){

 async function fetchServicos(): Promise<any> {
    const response = await fetchApiQuery<any>('usuariosConfRepasse/listar', configuracaoRepasseId ? {configuracaoRepasseId} : {});
    return response; 
}

    const listaConfigBarbeiroQuery = useQuery({
        queryKey: ['usuariosConfRepasse'],
        queryFn: ()=>fetchServicos(),
    });
    const data = listaConfigBarbeiroQuery.data; 
    const configBarbeiro = Array.isArray(data?.usuariosConfiguracaoRepasse
    ) ? data?.usuariosConfiguracaoRepasse
    : [];

    return configBarbeiro;
}