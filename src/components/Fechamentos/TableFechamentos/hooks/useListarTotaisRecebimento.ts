import {
  convertToPtBrFormat,
  returnDate,
} from "@/helpers/convertTimeLocalToPtBr";
import { onSubData } from "@/helpers/dataFunctions";
import { useFiltrostabelaRecebimentosFechamentos } from "@/helpers/stores/filtrosTelaFechamentos";
import { fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarTotaisRecebimentos(fechamentoPDVUsuarioId:any) {
    const objOptions = {
      fechamentoPDVUsuarioId
    };
    async function fetchTotaisRecebimentos(): Promise<any> {
      const response = await fetchApiQuery<any>(
        "fecharPDV/listarTotais",
        objOptions
      );
      return response;
    }
  
    const listarRecebimentosQuery = useQuery({
      queryKey: ["listaResultadosTotais", objOptions],
      queryFn: () => fetchTotaisRecebimentos(),
      refetchOnWindowFocus: false,
    });
  
    const data = listarRecebimentosQuery.data;
  
    // Formas de pagamento disponíveis
    const formasPagamento = {
      Cortesia: 0,
      Pix: 0,
      "Cartão Crédito": 0,
      "Cartão Debito": 0,
      Dinheiro: 0,
      PagamentosUsuarios:0
    };
  
    // Preencher valores dos resultados
    const resultadosFormasPagamentos :any= { ...formasPagamento };
    if (data && data.resultados) {
      for (const formaPagamento in formasPagamento) {
        if (data.resultados.hasOwnProperty(formaPagamento)) {
          resultadosFormasPagamentos[formaPagamento] =
            data.resultados[formaPagamento];
        }
      }
    }
  
    return resultadosFormasPagamentos;
  }
  
