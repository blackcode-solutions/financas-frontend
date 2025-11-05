import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


type FormData = {
    produtoId: number;
    valor: string;
    quantidade: number;
    codigoBarras: string;
    observacao: string;
    nomeProduto:string;
  }

export function useListarProdutos(page:number){

 async function fetchprodutos(): Promise<any> {
    const response = await fetchApiQuery<any>('produtos/listar', {page});
    return response; 
}

    const listarProdutosQuery = useQuery({
        queryKey: ['listaProdutosEmpresa',{page}],
        queryFn: ()=>fetchprodutos(),
    });
    const data = listarProdutosQuery.data; 
    const produtos = Array.isArray(data?.produtos)  ? data?.produtos as FormData[] : [];

    return {produtos,totalPages:listarProdutosQuery?.data?.totalPages || 0};
}