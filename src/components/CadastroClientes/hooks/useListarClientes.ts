import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


type FormCliente = {
    clienteId: number;
    cliente: string;
    datNascimento: string;
    cpf: string;
    cnpj: string;
    empresa:string;
  }

export function useListarClientes(page:number){

 async function fetchClientesEmpresas(): Promise<any> {
    const response = await fetchApiQuery<any>('clientes/listar', {page});
    return response; 
}

    const listaClientesQuery = useQuery({
        queryKey: ['listaClientesEmpresa',{page}],
        queryFn: ()=>fetchClientesEmpresas(),
    });
    const data = listaClientesQuery.data; 
    const clientes = Array.isArray(data?.clientes)  ? data?.clientes as FormCliente[] : [];

    return {clientes,totalPages:listaClientesQuery?.data?.totalPages || 0};
}