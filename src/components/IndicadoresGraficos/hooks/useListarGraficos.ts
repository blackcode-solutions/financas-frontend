import { axiosApi } from "@/services/api";



export function useListarGraficos(){

    async function listarVendasUsuario(){
        const result = await axiosApi.get('graficos/listarVendasUsuario',{})
        return result.data
    }
    async function listarVendasPendentesUsuario(){
        const result = await axiosApi.get('graficos/listarVendasUsuarioPendente',{})
        return result.data
    }
    async function listarVendasClientes(){
        const result = await axiosApi.get('graficos/listarVendasCliente',{})
        return result.data
    }
    async function listarSaldoLiquidoMes(){
        const result = await axiosApi.get('graficos/listarSaldoLiquidoMes',{})
        return result.data
    }
    async function listarSaldoMes(){
        const result = await axiosApi.get('graficos/listarSaldoMes',{})
        return result.data
    }
    async function listarSaldoDia(){
        const result = await axiosApi.get('graficos/listarSaldoDia',{})
        return result.data
    }
    async function listarSaldoAno(){
        const result = await axiosApi.get('graficos/listarSaldoAno',{})
        return result.data
    }
    async function listarRecebimentosMes(){
        const result = await axiosApi.get('graficos/listarRecebimentosMes',{})
        return result.data
    }
    async function listarDespesasMes(){
        const result = await axiosApi.get('graficos/listarDespesasMes',{})
        return result.data
    }
    async function listarDespesas3Mes(){
        const result = await axiosApi.get('graficos/listarDespesas3Mes',{})
        return result.data
    }
    async function listarDespesasDia(){
        const result = await axiosApi.get('graficos/listarDespesasDia',{})
        return result.data
    }
    async function evolucaoVendasPorMes(){
        const result = await axiosApi.get('graficos/evolucaoVendasPorMes',{})
        return result.data
    }
    async function projecaoVendasFuturas(){
        const result = await axiosApi.get('graficos/projecaoVendasFuturas',{})
        return result.data
    }
    async function desempenhoProduto(){
        const result = await axiosApi.get('graficos/desempenhoProduto',{})
        return result.data
    }
    async function lucroPorFormaPagamento(){
        const result = await axiosApi.get('graficos/lucroPorFormaPagamento',{})
        return result.data
    }
    async function lucroBrutoPorProduto(){
        const result = await axiosApi.get('graficos/lucroBrutoPorProduto',{})
        return result.data
    }
    

    return { listarDespesasDia,listarSaldoDia,evolucaoVendasPorMes,
        lucroBrutoPorProduto,lucroPorFormaPagamento,desempenhoProduto,
        listarDespesas3Mes,listarSaldoAno,listarSaldoMes,projecaoVendasFuturas,
        listarDespesasMes,listarRecebimentosMes,listarSaldoLiquidoMes,
        listarVendasClientes,listarVendasPendentesUsuario,listarVendasUsuario,
    }
}