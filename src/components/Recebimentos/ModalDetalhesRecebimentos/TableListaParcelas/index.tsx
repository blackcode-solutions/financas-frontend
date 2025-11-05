import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useListarParcelasVendas } from "./hooks/useListarParcelas";

interface TableRecebimentosprops {
  recebimentoVendaId:number;
}

export function TableListaParcelasDetalhes({recebimentoVendaId}:TableRecebimentosprops) {
  const listaRecebimentos = useListarParcelasVendas(recebimentoVendaId)
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
   
    {
      headerName: "N° Parcela",
      width: 100,
      field: "numeroParcela",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Dat. Pervista",
      width: 150,
      field: "dataPrevista",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Dat. Recebimento",
      width: 150,
      field: "dataRecebimento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
   
    {
      headerName: "Forma Pagamento",
      width: 150,
      field: "formaPagamento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor",
      width: 80,
      field: "valorParcela",
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
      headerName: "Desconto",
      width: 90,
      field: "valorDesconto",
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
      headerName: "Total",
      width: 100,
      field: "valorTotal",
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
      headerName: "Status",
      width: 100,
      field: "statusRecebimento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
  ]);


  return (
    <>
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Parcelas Pagas</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            rowData={listaRecebimentos}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
    </>
  
  );
}
