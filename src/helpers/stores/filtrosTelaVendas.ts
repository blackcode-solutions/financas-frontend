import { create } from 'zustand';


type filtrostabelaVendasTypes = {
    dataInicial?:string;
    dataFinal?:string;
    bolEstornado?:boolean;
    bolCancelado?:boolean,
}

type filtrostabelaVendasProps= {
    filtrostabelaVendas: filtrostabelaVendasTypes
    setfiltrostabelaVendas: (value:filtrostabelaVendasTypes) => void
  }
  
  export const useFiltrosTabelaVendas = create<filtrostabelaVendasProps>((set) => ({
    filtrostabelaVendas: {
        dataInicial:'',dataFinal:'',
        bolCancelado:false,bolEstornado:false
    },
    setfiltrostabelaVendas: (state) => set({filtrostabelaVendas: state})
  }));

  type filtrostabelaVendasRecebProps= {
    filtrostabelaVendas: filtrostabelaVendasTypes
    setfiltrostabelaVendas: (value:filtrostabelaVendasTypes) => void
  }
  
  export const useFiltrosTabelaRecbVendas = create<filtrostabelaVendasRecebProps>((set) => ({
    filtrostabelaVendas: {
        dataInicial:'',dataFinal:'',
        bolCancelado:false,bolEstornado:false
    },
    setfiltrostabelaVendas: (state) => set({filtrostabelaVendas: state})
  }));