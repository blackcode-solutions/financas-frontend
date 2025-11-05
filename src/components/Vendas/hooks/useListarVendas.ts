import { convertToPtBrFormat } from "@/helpers/convertTimeLocalToPtBr";
import { useFiltrosTabelaVendas } from "@/helpers/stores/filtrosTelaVendas";
import { fetchApiQuery } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useListarVendas(){
    const filtrosTabela = useFiltrosTabelaVendas((state) => state.filtrostabelaVendas);
    
    const objOptions = {
        bolUsuario: true,
        ...filtrosTabela,
        dataInicial: filtrosTabela.dataInicial ? convertToPtBrFormat(filtrosTabela.dataInicial) : new Date().toLocaleDateString('pt-BR') + ' 00:00:00',
        dataFinal: filtrosTabela.dataFinal ? convertToPtBrFormat(filtrosTabela.dataFinal) : new Date().toLocaleDateString('pt-BR') + ' 23:59:59'
    };

    async function fetchVendasUsuario(): Promise<any> {
        const response = await fetchApiQuery<any>('vendas/listar', objOptions);
        return response; 
    }

    const listaVendasUsuarioQuery = useQuery({
        queryKey: ['listaVendasUsuario', objOptions],
        queryFn: () => fetchVendasUsuario(),
        refetchOnWindowFocus: true,
    });

    const data = listaVendasUsuarioQuery.data; 
    const empresas = Array.isArray(data?.vendas) ? data?.vendas : [];

    return empresas;
}
