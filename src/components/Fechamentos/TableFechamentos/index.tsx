import { MutableRefObject, useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarFechamentos } from "./hooks/useListarFechamentos";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

interface FechamentoPDVUsuario {
  fechamentoPDVUsuarioId: number;
  numeroAbertura: number;
  dataAbertura: string;
  dataFechamento: string;
  valorAbertura: string;
  bolIncluirValorAbertura: number;
  usuarioId: number;
  empresaId: number;
  usuarioFechamento: string;
  observacao: string;
}

interface TableFechamentosProps {
  setSelectedRow: (value: FechamentoPDVUsuario) => void;
  gridRef: MutableRefObject<any>;
}

export function TableFechamentos({
  setSelectedRow,
  gridRef,
}: TableFechamentosProps) {
  const listaFechamentos = useListarFechamentos();

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
    setSelectedRow(event.data ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "N° Fechamento.",
      width: 130,
      field: "fechamentoPDVUsuarioId",
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
      headerName: "Data Abertura",
      width: 150,
      field: "dataAbertura",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Data Fechamento ",
      width: 150,
      field: "dataFechamento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Observação",
      width: 270,
      field: "observacao",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Usuário Fechamento",
      width: 160,
      field: "usuarioFechamento",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor Abertura PDV",
      width: 160,
      field: "valorAbertura",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return params.value ? (
          <MoneyStatus value={formatarDinheiro(params.value)}/>
        ) : (
          <MoneyStatus value={'R$ 0,00'}/>
        );
      },
    },
  ]);

  const getRowId = useMemo(() => {
    return (params: any) => params.data.fechamentoPDVUsuarioId;
  }, []);

  return (
    <fieldset className="fieldsetContainer">
      <p className="table-title">Fechamentos (30 dias)</p>
      <div className={`${styles.table} ag-theme-alpine`}>
        <AgGridReact
          ref={gridRef}
          onCellClicked={cellClickedListener}
          localeText={AG_GRID_LOCALE_PT_BR}
          rowSelection={"single"}
          getRowId={getRowId}
          rowData={listaFechamentos}
          columnDefs={colDefs}
        />
      </div>
    </fieldset>
  );
}
