import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { Tooltip } from "primereact/tooltip";
import { IoMdTrash } from "react-icons/io";
import { ToolTipTrash } from "@/components/Icons/ToolTipTrash";
import { useListarProdutosVendas } from "./useListarProdutosVendas";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { ModalRemover } from "./ModalRemover";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

export function TableRecebimentos({ vendaId }: { vendaId: number }) {
  const listaprodutosVendas = useListarProdutosVendas(vendaId);
  const [selectedRow, setselectedRow] = useState<any>(null);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "",
      field: "",
      headerClass: "headerTable",
      width: "50px",
      resizable: false,
      lockPosition: "left",
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      cellRenderer: (params: any) => {
        return (
          <div onClick={() => setOpenModalRemover(true)}>
            <ToolTipTrash />
          </div>
        );
      },
    },
    {
      headerName: "N° Produto ",
      width: 110,
      field: "produtoVendaId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "N° PDV",
      width: 80,
      field: "numeroAbertura",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Produto",
      flex: 1,
      field: "nomeProduto",
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
        return params ? (
          <MoneyStatus value={formatarDinheiro(params.value)} />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
      },
    },
    {
      headerName: "Quantidade",
      width: 100,
      field: "quantidade",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor Total",
      width: 100,
      field: "make",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return params ? (
          <MoneyStatus
            value={formatarDinheiro(
              params.data.quantidade * Number(params.data.valor)
            )}
          />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
      },
    },
  ]);

  const cellClickedListener = useCallback((event: any) => {
    setselectedRow(event.data ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalRemover
        produtoVendaId={selectedRow?.produtoVendaId}
        openModal={openModalRemover}
        quantidade={selectedRow?.quantidade}
        produtoId={selectedRow?.produtoId}
        setOpenModal={setOpenModalRemover}
        vendaId={vendaId}
      />
      <div>
        <fieldset className="fieldsetContainer">
          <p className="table-title ">Lista de Recebimentos</p>
          <div className={`${styles.table} ag-theme-alpine`}>
            <AgGridReact
              localeText={AG_GRID_LOCALE_PT_BR}
              rowData={listaprodutosVendas}
              columnDefs={colDefs}
              onCellClicked={cellClickedListener}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}
