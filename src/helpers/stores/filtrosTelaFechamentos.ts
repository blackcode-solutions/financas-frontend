import { create } from 'zustand';


type filtrosTabelaRecebimentosTypes = {
  dataInicial?:string;
  dataFinal?:string;
  recebimentoVendaId:string,
  vendaId?:string,
  numeroAbertura?:string;
  usuarioId?:string,
}

type filtrosTabelaRecebimentosFechamentosProps= {
    filtrosTabelaRecebimentos: filtrosTabelaRecebimentosTypes
    setFiltrosTabelaRecebimentos: (value:filtrosTabelaRecebimentosTypes) => void
  }
  
  export const useFiltrostabelaRecebimentosFechamentos = create<filtrosTabelaRecebimentosFechamentosProps>((set) => ({
    filtrosTabelaRecebimentos: {
        dataInicial:"",dataFinal:"",usuarioId:'',
        recebimentoVendaId:'',numeroAbertura:'',vendaId:''
    },
    setFiltrosTabelaRecebimentos: (state) => set({filtrosTabelaRecebimentos: state})
  }));