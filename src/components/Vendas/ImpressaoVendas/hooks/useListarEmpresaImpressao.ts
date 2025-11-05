import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

type FormData = {
    empresaId:number;
    nomeFantasia: string;
    proprietario: string;
    cnpj: string;
    numeroFuncionarios: number;
    endereco: string;
    estado: string;
    cidade: string;
  }

export function useListarEmpresaImpressao(){

 async function fetchEmpresas(): Promise<any> {
    const response = await fetchApiQuery<any>('empresas/listarEmpresaUsuario', {minhaEmpresa:true});

    return response; 
}

    const listaEmpresasQuery = useQuery({
        queryKey: ['listaEmpresasusuario'],
        queryFn: ()=>fetchEmpresas(),
    });
    const data = listaEmpresasQuery.data; 
    const empresas = Array.isArray(data?.empresas) ? data?.empresas[0] : [];

    return empresas;
}