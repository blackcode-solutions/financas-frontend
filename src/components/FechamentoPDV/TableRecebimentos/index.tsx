import { MutableRefObject, useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarRecebimentos } from "./hooks/useListarRecebimentos";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import SwitchComponent from "@/components/SwitchComponent";
import { StatusComponent } from "@/components/StatusComponent/StatusComponent";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

interface Recebimento {
  cliente: string;
  dataRecebimento: string; // Formato de data/hora: "DD/MM/YYYY HH:mm:ss"
  dataVenda: string; // Formato de data/hora: "DD/MM/YYYY HH:mm:ss"
  nomeUsuarioRecebimento: string;
  nomeUsuarioVenda: string;
  numeroAbertura: number;
  produtosVenda: string; // Produtos em formato de string separados por vírgula
  recebimentoVendaId: number;
  statusRecebimento: string;
  valorTotal: string; // Valor em formato de string
}

interface TableRecebimentosProps {
  clearselectedsRows: () => void;
  setselectedsRowsRecebimentos: (value: Recebimento[]) => void;
  setSelectedRow: (value: Recebimento) => void;
  gridRef: MutableRefObject<any>;
}

export function TableRecebimentos({
  setselectedsRowsRecebimentos,
  setSelectedRow,
  clearselectedsRows,
  gridRef,
}: TableRecebimentosProps) {
  const listaRecebimentos = useListarRecebimentos({ clearselectedsRows });

  const onSelectionChanged = useCallback((event: any) => {
    // event.api.showLoadingOverlay();
    const nodeLinhaSelecionada = event.api.selectionService.lastSelectedNode;
    if (!nodeLinhaSelecionada?.selected) {
      setselectedsRowsRecebimentos(event.api.getSelectedRows());
      return;
    }
    // const linhaSelecionada = nodeLinhaSelecionada.data;
    // event.api.hideOverlay();
  }, []);

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
      checkboxSelection: true,
      headerName: "X",
      field: "",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      width: 50,
    },
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
      cellRenderer: (params: any) => {
        return <StatusComponent status={params.value} />;
      },
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
  const getRowId = useMemo(() => {
    return (params: any) =>
      params.data.recebimentoVendaId || params.data.recebimentoVendaId;
  }, []);

  function deselectAll() {
    gridRef.current.api.deselectAll();
  }
  function selectAll() {
    gridRef.current.api.selectAll();
  }

  return (
    <fieldset className="fieldsetContainer">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="table-title">Recebimentos</p>
        <SwitchComponent
          onChange={(e) => {
            if (e.target.checked) {
              selectAll();
            } else {
              deselectAll();
            }
          }}
          label="Selecionar Todos"
        />
      </div>
      <div className={`${styles.table} ag-theme-alpine`}>
        <AgGridReact
          ref={gridRef}
          onCellClicked={cellClickedListener}
          localeText={AG_GRID_LOCALE_PT_BR}
          rowSelection={"multiple"}
          rowMultiSelectWithClick={false}
          suppressRowClickSelection={true}
          onSelectionChanged={onSelectionChanged}
          getRowId={getRowId}
          rowData={listaRecebimentos}
          columnDefs={colDefs}
        />
      </div>
    </fieldset>
  );
}
