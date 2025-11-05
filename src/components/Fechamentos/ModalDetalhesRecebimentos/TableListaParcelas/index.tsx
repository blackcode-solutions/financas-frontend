import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";
import { StatusComponent } from "@/components/StatusComponent/StatusComponent";

interface TableRecebimentosprops {
  listaRecebimentos: any;
}

export function TableListaParcelasDetalhes({
  listaRecebimentos,
}: TableRecebimentosprops) {
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "N° Parcela",
      width: 140,
      field: "numeroParcela",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Dat. Pervista",
      width: 180,
      field: "dataPrevista",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Dat. Recebimento",
      width: 180,
      field: "dataRecebimento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },

    {
      headerName: "Forma Pagamento",
      width: 180,
      field: "formaPagamento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor",
      width: 90,
      field: "valorParcela",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return params.value ? (
          <MoneyStatus value={formatarDinheiro(params.value)} />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
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
        return params.value ? (
          <MoneyStatus value={formatarDinheiro(params.value)} />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
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
        return params.value ? (
          <MoneyStatus value={formatarDinheiro(params.value)} />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
      },
    },
    {
      headerName: "Status",
      // width: 110,
      flex: 1,
      field: "statusRecebimento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return <StatusComponent status={params.value} />;
      },
    },
  ]);

  return (
    <>
      <fieldset className="fieldsetContainer">
        <p className="table-title">Parcelas do Recebimento</p>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            rowData={listaRecebimentos}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </>
  );
}
