import {  fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";


type FormData = {
    parcelaVendaId?: number;
    numeroParcela: number;
    valorParcela: string;
    valorDesconto: string;
    valorTotal: string;
    dataPrevista: string;
    dataRecebimento: string;
    formaPagamento: string;
    formaPagamentoId: number;
    statusRecebimento: string;
    empresaId: number;
    vendaId: number;
    usuarioId: number;
    recebimentoVendaId: number;
  }

export function useListarParcelasCartaoVendas(recebimentoVendaId:number){

 async function fetchParcelas(): Promise<any> {
    const response = await fetchApiQuery<any>('parcelaVendaCartao/listar', {recebimentoVendaId});
    return response; 
}

    const listaParcelasVendasQuery = useQuery({
        queryKey: ['listarParcelasCartaoRecebimentos',{recebimentoVendaId}],
        queryFn: ()=>fetchParcelas(),
    });
    const data = listaParcelasVendasQuery.data; 
    const empresas = Array.isArray(data?.recebimentosVendaCartao)  ? data?.recebimentosVendaCartao  : [];

    return empresas;
}