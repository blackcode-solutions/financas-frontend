import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarEmpresas(){

 async function fetchEmpresas(): Promise<any> {
    const response = await fetchApiQuery<any>('empresas/listar', {});
    return response; 
}

    const listaEmpresasQuery = useQuery({
        queryKey: ['listaEmpresascadastro'],
        queryFn: ()=>fetchEmpresas(),
    });
    const data = listaEmpresasQuery.data; 
    const empresas = Array.isArray(data?.empresas) ? data?.empresas : [];

    return empresas;
}