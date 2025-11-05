'use client'

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { axiosApi, fetchApiQuery, useCustomMutation } from "@/services/api";
import { convertToPtBrFormat } from "@/helpers/convertTimeLocalToPtBr";
import { ModalDetalhesRecebimentosPorProfissionalRepasse } from "./ModalListarRepassesUsuario";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { AgGridReact } from "ag-grid-react";
import styles from './styles.module.scss'
import { MdAddCircle, MdInfo } from "react-icons/md";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import { ModalProcessarRepassesServicos } from "./ModalProcessarRepasseServico";
import { ModalProcessarRepassesProdutos } from "./ModalProcessarRepasseProduto";
import { ModalDetalhesRecebimentosPorProdutoRepasse } from "./ModalListarRepassesProduto";
export default function ProcessarRepasse() {
 
  const [repasses, setRepasses] = useState<any>([]);
  const [itensRepasse, setItensRepasse] = useState<any>([]);
  const [repasseSelecionado, setRepasseSelecionado] = useState<any>(null);
  
  const [dataInicioFiltro, setDataInicioFiltro] = useState(`${new Date().toISOString().split("T")[0]}T00:00`);
  const [dataFimFiltro, setDataFimFiltro] = useState(`${new Date().toISOString().split("T")[0]}T23:59`);
  const listarRepassesLista = async (dataInicioFiltro?:string,dataFimFiltro?:string) => {
    try {
      const data:any = await fetchApiQuery("repasse/listar", 
        { dataInicio:convertToPtBrFormat(dataInicioFiltro || ''), 
          dataFim:convertToPtBrFormat(dataFimFiltro || '') });
      setRepasses(data.repassesEmpresa);
    } catch (error) {
      console.error("Erro ao listar repasses", error);
    }
  };

  useEffect(()=>{
  const hoje = new Date().toISOString().split("T")[0]; // Ex: '2025-04-05'
    listarRepassesLista(`${hoje}T00:00`,`${hoje}T23:59`)
  },[])

  const listarItensRepasse = async (repasseId:number) => {
    try {
      const data :any = await fetchApiQuery("repasseItem/listar", { repasseId });
      setItensRepasse(data.itensRepasse);
      setRepasseSelecionado(repasseId);
    } catch (error) {
      console.error("Erro ao listar itens do repasse", error);
    }
  };
  const [openModalDetalhesRepasse,setOpenModalDetalhesRepasse] = useState(false)
  const [openModalDetalhesRepasseProduto,setOpenModalDetalhesRepasseProduto] = useState(false)


   const cellStyle = (params: any) => {
      return {
        borderBottom: "1px solid rgb(220,220,220)",
        fontSize: "9pt",
      };
    };
    const defaultColDef = {
      flex: 1,
    }; 
    const [colDefs, setColDefs] = useState<any>([
      {
        headerName: "",
        field: "",
        resizable: true,
        width:50,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
        cellRenderer: (params: any) => {
          return (
            <div title="Recebimentos Profissionais" onClick={()=>setOpenModalDetalhesRepasse(true)}>
             <MdInfo />
            </div>
          );
        },
      },
      {
        headerName: "",
        field: "",
        width:50,

        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
        cellRenderer: (params: any) => {
          return (
            <div title="Recebimentos Produtos" onClick={()=>setOpenModalDetalhesRepasseProduto(true)}>
             <MdInfo />
            </div>
          );
        },
      },
      {
        headerName: "Código",
        width: 130,
        field: "repasseId",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
      {
        headerName: "Repasse",
        flex:1,
        field: "nomeRepasse",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
      {
        headerName: "Tipo",
        flex:1,
        field: "tipoVenda",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
    ]);
    const [colDefsItensRepasse, setColDefsItensRepasse] = useState<any>([

   
      {
        headerName: "Código",
        width: 130,
        field: "itemRepasseId",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
      {
        headerName: "Forma Pagamento",
        width:200,
        field: "formaPagamento",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
      {
        headerName: "Valor Parcela",
        width:200,
        field: "valorParcela",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
      {
        headerName: "Valor Desconto",
        width:200,
        field: "valorDesconto",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
      {
        headerName: "Valor Total",
        flex:1,
        field: "valorTotal",
        resizable: true,
        filter: true,
        sortable: true,
        cellStyle: cellStyle,
        headerClass: "headerTable",
      },
    ]);
    const [selectedRow,setSelectedRow] = useState<any>(null)
    const cellClickedListener = useCallback((event: any) => {
      setSelectedRow(event.data ?? null)
      listarItensRepasse(event.data.repasseId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
const [openModalRepasseServico,setOpenModalRepasseServico] = useState(false)
const [openModalRepasseproduto,setOpenModalRepasseproduto] = useState(false)

  return (
    <>
    <ModalDetalhesRecebimentosPorProdutoRepasse 
     openModal={openModalDetalhesRepasseProduto}
     setOpenModal={setOpenModalDetalhesRepasseProduto}
     repasseId={selectedRow?.repasseId || 0}
    />
    <ModalProcessarRepassesServicos 
      openModal={openModalRepasseServico}
      setOpenModal={setOpenModalRepasseServico}
      setRepasses={setRepasses}
    />
    <ModalProcessarRepassesProdutos 
    openModal={openModalRepasseproduto}
    setOpenModal={setOpenModalRepasseproduto}
    setRepasses={setRepasses}
    />
    <ModalDetalhesRecebimentosPorProfissionalRepasse
      openModal={openModalDetalhesRepasse}
      setOpenModal={setOpenModalDetalhesRepasse}
      repasseId={selectedRow?.repasseId || 0}
    />
   
    <div style={{width:"100%"}}>
      <section className={styles.containerButtons}>
        <ButtonComponent onClick={()=>setOpenModalRepasseServico(true)}>
          <MdAddCircle size={18} /> Novo(Serviço)
        </ButtonComponent>
        <ButtonComponent onClick={()=>{
          setOpenModalRepasseproduto(true)
        }}>
          <MdAddCircle size={18} /> Novo(Produtos)
        </ButtonComponent>
      </section>
  
    <legend className="fieldsetTitle">Repasses Profissional</legend>
     <div style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
     <InputComponent type="datetime-local" style={{width:"200px"}} 
     value={dataInicioFiltro} onChange={(e) => setDataInicioFiltro(e.target.value)} />
      <InputComponent type="datetime-local" style={{width:"200px"}}
       value={dataFimFiltro} onChange={(e) => setDataFimFiltro(e.target.value)} />
      <ButtonComponent 
        style={{width:'150px'}}
      onClick={()=>{
        listarRepassesLista(dataInicioFiltro,dataFimFiltro)
      }}>Filtrar</ButtonComponent>
     </div>
  

      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Repasses Profissional</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact localeText={AG_GRID_LOCALE_PT_BR} 
          onCellClicked={cellClickedListener}
          rowData={repasses}
            columnDefs={colDefs} />
        </div>
      </fieldset>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Itens Repasses </legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact localeText={AG_GRID_LOCALE_PT_BR} 
          // onCellClicked={cellClickedListener}
          rowData={itensRepasse}
          columnDefs={colDefsItensRepasse}
           defaultColDef={defaultColDef}  />
        </div>
      </fieldset>
   
    </div>
    </>
  );
}
