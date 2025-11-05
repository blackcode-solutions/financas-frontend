import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarUsuarios(){

 async function fetchUsuarios(): Promise<any> {
    const response = await fetchApiQuery<any>('usuarios/listar', {});
    return response; 
}

    const listarUsuariosQuery = useQuery({
        queryKey: ['listarUsuariosEmpresa'],
        queryFn: ()=>fetchUsuarios(),
    });
    const data = listarUsuariosQuery.data; 
    const empresas = Array.isArray(data?.usuarios) ? data?.usuarios : [];

    return empresas;
}