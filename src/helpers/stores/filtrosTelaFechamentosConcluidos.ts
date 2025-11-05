import { create } from 'zustand';


type filtrosFechamentosTypes = {
  dataInicial?: string;
  dataFinal?: string;
  fechamentoPDVUsuarioId: string;
  numeroAbertura?: string;
  usuarioId?: string;
};

type filtrosTabelaRecebimentosFechamentosProps= {
    filtrosTabelaRecebimentos: filtrosFechamentosTypes
    setFiltrosTabelaRecebimentos: (value:filtrosFechamentosTypes) => void
  }
  
  export const useFiltrostabelaRecebimentosFechamentosConcluidos = create<filtrosTabelaRecebimentosFechamentosProps>((set) => ({
    filtrosTabelaRecebimentos: {
        dataInicial:"",dataFinal:"",usuarioId:'',
        fechamentoPDVUsuarioId:'',numeroAbertura:''
    },
    setFiltrosTabelaRecebimentos: (state) => set({filtrosTabelaRecebimentos: state})
  }));