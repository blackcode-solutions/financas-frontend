import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { ToolTipTrash } from "@/components/Icons/ToolTipTrash";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useListarPagamentos } from "./hooks/useListarPagamentos";

interface TableListaPagamentosProps {
  setTotaisPagamentos:(value:number) => void;
  meusPagamentos:boolean;
  setSelectedsPagamentos:(value:any) => void;
}

export function TableListaPagamentos({meusPagamentos,setTotaisPagamentos,setSelectedsPagamentos}:TableListaPagamentosProps) {
  const listaPagamentos = useListarPagamentos(meusPagamentos,setTotaisPagamentos)
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };
  const getRowId = useMemo(() => {
    return (params: any) => params.data.pagamentoId;
  }, []);

  const [colDefs, setColDefs] = useState<any>([
    {
      checkboxSelection: true,
      headerName: 'X',
      field: '',
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: 'headerTable',
      width: 50,
    },
    {
      headerName: "N° ",
      width: 100,
      field: "pagamentoId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Referência",
      width: 250,
      field: "descricao",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Dat. Emissão",
      width: 150,
      field: "dataEmissao",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor",
      width: 90,
      field: "valor",
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
      headerName: "Dat. Vencimento",
      width: 150,
      field: "dataVencimento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Dat. Pagamento",
      width: 150,
      field: "dataPagamento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Competência",
      width: 150,
      field: "competencia",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Fornecedor",
      width: 200,
      field: "fornecedor",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
  
    },
   
  
  ]);
  const onSelectionChanged = useCallback((event:any) => {
    // event.api.showLoadingOverlay();
    const nodeLinhaSelecionada = event.api.selectionService.lastSelectedNode;
    if (!nodeLinhaSelecionada?.selected) {
      setSelectedsPagamentos(event.api.getSelectedRows());
      return;
    }
    // const linhaSelecionada = nodeLinhaSelecionada.data;
    // event.api.hideOverlay();
  
  }, []);

  return (
    <>
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Pagamentos</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            rowData={listaPagamentos}
            columnDefs={colDefs}
            rowMultiSelectWithClick={false}
            rowSelection={'multiple'}
            getRowId={getRowId}
            suppressRowClickSelection={true}
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      </fieldset>
    </div>
    </>
  
  );
}
