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

export function useListarEmpresas(formulario: UseFormReturn<FormData, any, undefined>){

 async function fetchEmpresas(): Promise<any> {
    const response = await fetchApiQuery<any>('empresas/listarEmpresaUsuario', {minhaEmpresa:true});

    formulario.reset({
        cidade:response.empresas[0].cidade,
        cnpj:response.empresas[0].cnpj,
        empresaId:response.empresas[0].empresaId,
        endereco:response.empresas[0].endereco,
        estado:response.empresas[0].estado,
        nomeFantasia:response.empresas[0].nomeFantasia,
        numeroFuncionarios:response.empresas[0].numeroFuncionarios,
        proprietario:response.empresas[0].proprietario
    })
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