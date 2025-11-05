import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarRecebimentos } from "./hooks/useListarRecebimentos";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

export function TableRecebimentosPagos({
  setSelectedRowRecebimentos,
}: {
  setSelectedRowRecebimentos: (value: any) => void;
}) {
  const listaRecebimentos = useListarRecebimentos();
  console.log({ listaRecebimentos });
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  // const defaultColDef = {
  //   flex: 1,
  // };

  const cellClickedListener = useCallback((event: any) => {
    setSelectedRowRecebimentos(event.data ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "N° Receb.",
      width: 100,
      field: "recebimentoVendaId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Cliente",
      width: 230,
      field: "cliente",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Produtos",
      width: 150,
      field: "produtosVenda",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Serviços",
      width: 150,
      field: "servicosVenda",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Status ",
      width: 90,
      field: "statusRecebimento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "N° PDV",
      width: 90,
      field: "numeroAbertura",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Total",
      width: 80,
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
      headerName: "Usuário Venda",
      width: 130,
      field: "nomeUsuarioVenda",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Usuário Recebimento",
      width: 160,
      field: "nomeUsuarioRecebimento",
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
      headerName: "Dat. Venda",
      width: 150,
      field: "dataVenda",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
  ]);

  return (
    <div>
      <fieldset className="fieldsetContainer">
        {/* <legend className='fieldsetTitle'>
                Recebimentos do Dia
              </legend> */}
        <p className="table-title">Recebimentos do Dia</p>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            onCellClicked={cellClickedListener}
            localeText={AG_GRID_LOCALE_PT_BR}
            rowData={listaRecebimentos}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
  );
}
