import { SetStateAction, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { ToolTipTrash } from "@/components/Icons/ToolTipTrash";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useListarPagamentos } from "./hooks/useListarPagamentos";
import SwitchComponent from "@/components/SwitchComponent";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

interface TableListaPagamentosProps {
  setSelectedRow: (value: any) => void;
  meusPagamentos: boolean;
  setMeusPagamentos: (value: SetStateAction<boolean>) => void;
}

export function TableListaPagamentos({
  setSelectedRow,
  meusPagamentos,
}: TableListaPagamentosProps) {
  const listaPagamentos = useListarPagamentos(meusPagamentos);
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    // {
    //   headerName: '',
    //   field: '',
    //   headerClass: 'headerTable',
    //   width: '50px',
    //   resizable: false,
    //   lockPosition: 'left',
    //   filter: true,
    //   sortable: true,
    //   cellStyle: cellStyle,
    //   cellRenderer: (params: any) => {
    //     return (
    //       <div onClick={()=>setOpenModalRemover(true)}>
    //        <ToolTipTrash />
    //       </div>
    //     );
    //   },
    // },
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
        return params.value ? (
          <MoneyStatus value={formatarDinheiro(params.value)} />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
      },
    },
  ]);
  const cellClickedListener = useCallback((event: any) => {
    setSelectedRow(event.data ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ padding: "0.4rem" }}>
        <fieldset className="fieldsetContainer">
          {/* <legend className="fieldsetTitle">Pagamentos</legend> */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="table-title">Pagamentos</p>
            <SwitchComponent
              // checked={meusPagamentos}
              // onChange={(e) => setMeusPagamentos(e.target.checked)}
              label="Meus Pagamentos"
            />
          </div>
          <div className={`${styles.table} ag-theme-alpine`}>
            <AgGridReact
              localeText={AG_GRID_LOCALE_PT_BR}
              rowData={listaPagamentos}
              columnDefs={colDefs}
              onCellClicked={cellClickedListener}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}
