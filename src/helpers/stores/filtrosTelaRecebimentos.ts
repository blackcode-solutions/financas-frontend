import { create } from 'zustand';


type filtrosTabelaRecebimentosTypes = {
    dataInicial:string;
    dataFinal:string;
    bolEstornado:boolean;
    bolCancelado:boolean,
}

type filtrosTabelaRecebimentosProps= {
    filtrosTabelaRecebimentos: filtrosTabelaRecebimentosTypes
    setFiltrosTabelaRecebimentos: (value:filtrosTabelaRecebimentosTypes) => void
  }
  
  export const useFiltrostableaRecebimentos = create<filtrosTabelaRecebimentosProps>((set) => ({
    filtrosTabelaRecebimentos: {
        dataInicial:"",dataFinal:"",
        bolCancelado:false,bolEstornado:false
    },
    setFiltrosTabelaRecebimentos: (state) => set({filtrosTabelaRecebimentos: state})
  }));