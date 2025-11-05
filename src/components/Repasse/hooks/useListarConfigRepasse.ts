import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useListarConfigRepasse(){
        const [optionsProdutos, setOptionsConfigRepasse] = useState<any>([])
    

 async function fetchServicos(): Promise<any> {
    const response = await fetchApiQuery<any>('configuracaoRepasse/listar', {});
    return response; 
}

    const listaConfigRepasseQuery = useQuery({
        queryKey: ['configuracaoRepasse'],
        queryFn: ()=>fetchServicos(),
    });
    const data = listaConfigRepasseQuery.data; 
    const configRepasse = Array.isArray(data?.configuracaoRepasseList) ? data?.configuracaoRepasseList : [];

    return configRepasse;
}