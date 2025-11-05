import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import { Button } from "primereact/button";
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from "react";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { AgGridReact } from "ag-grid-react";
import { useListarDetalhesRepasse } from "./useListarDetalhesRepasse";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
interface ModalDetalhesRecebimentosPorProfissionalRepasse extends modalOpen {
    repasseId:number;
}

export function ModalDetalhesRecebimentosPorProdutoRepasse({
  openModal,
  setOpenModal,
  repasseId
}: ModalDetalhesRecebimentosPorProfissionalRepasse) {

  function close(){
    setOpenModal(false)
  }

  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };
  const listarDetalhesRepasse = useListarDetalhesRepasse({repasseId,openModal})
  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "Produto",
      width: 230,
      field: "nomeProduto",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor(R$)",
      width: 130,
      field: "valorUnitario",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
       cellRenderer: (params: any) => {
              return params.value ? <span>{formatarDinheiro(params.value)}</span> :
              <span>R$ 0,00</span>
            },
    },
    {
      headerName: "Quantidade",
      width: 130,
      field: "quantidadeItensRepasse",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Total(R$)",
      width: 130,
      field: "valorTotalProduto",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
       cellRenderer: (params: any) => {
              return params.value ? <span>{formatarDinheiro(parseFloat(params.data.valorUnitario) * parseFloat(params.data.quantidadeItensRepasse))}</span> :
              <span>R$ 0,00</span>
            },
    },
  
  ]);
//   const cellClickedListener = useCallback((event: any) => {
//     reset(event.data ?? null)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

  const defaultColDef = {
    flex: 1,
  }; 



  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={close}
        className="p-button-text"
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Recebimentos Por Profissional"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={close}
    >
      <main>
        <div>
        <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Repasses Profissional</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact localeText={AG_GRID_LOCALE_PT_BR} 
        //   onCellClicked={cellClickedListener}
          rowData={listarDetalhesRepasse}
           defaultColDef={defaultColDef} columnDefs={colDefs} />
        </div>
      </fieldset>
    </div>       
        </div>
      </main>
    </Dialog>
  );
}
