import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarVendas } from "./hooks/useListarVendas";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { FolhaImpressao } from "../ImpressaoVendas";
import { StatusComponent } from "@/components/StatusComponent/StatusComponent";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

export function TableRecebimentosPendentes({
  setSelectedRow,
  startImpressao,
  impressaoRef,
}: {
  setSelectedRow: (value: any | null) => void;
  startImpressao: boolean;
  impressaoRef: any;
}) {
  const listaVendas = useListarVendas();
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const cellClickedListener = useCallback((event: any) => {
    setSelectedRow(event.data ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "N° Venda",
      width: 150,
      field: "vendaId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Cliente",
      width: 250,
      field: "cliente",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Data Venda",
      width: 207,
      field: "dataVenda",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Status",
      width: 160,
      field: "statusVenda",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return <StatusComponent status={params.value} />
      },
    },
    {
      headerName: "Total Produtos",
      width: 130,
      field: "totalProdutos",
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
      headerName: "Total Serviços",
      width: 130,
      field: "totalServicos",
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
      headerName: "Total ",
      width: 130,
      field: "totalGeral",
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
      headerName: "N° PDV",
      width: 100,
      field: "numeroAbertura",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "usuario",
      width: 140,
      field: "usuario",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
  ]);
  const defaultColDef = {
    flex: 1,
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <FolhaImpressao
          arrayValores={listaVendas}
          impressaoRef={impressaoRef}
          startPrint={startImpressao}
        />
      </div>
      <div>
        <fieldset className="fieldsetContainer">
          <p className="table-title">Vendas Pendentes</p>
          <div className={`${styles.table} ag-theme-alpine`}>
            <AgGridReact
              onCellClicked={cellClickedListener}
              localeText={AG_GRID_LOCALE_PT_BR}
              rowData={listaVendas}
              columnDefs={colDefs}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}
