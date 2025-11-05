import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { Tooltip } from "primereact/tooltip";
import { IoMdTrash } from "react-icons/io";
import { ToolTipTrash } from "@/components/Icons/ToolTipTrash";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { ModalRemover } from "./ModalRemover";
import { useListarServicosVendas } from "./useListarServicosVendas";
import { ModalAcao } from "@/components/ModalAcao/ModalAcao";
import { useRemoverServicoVenda } from "./ModalRemover/hooks/useRemoverServicoVenda";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

export function TableServicos({ vendaId }: { vendaId: number }) {
  const listaServicosVendas = useListarServicosVendas(vendaId);
  const [selectedRow, setselectedRow] = useState<any>(null);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const { FnRemoverServicoVendas } = useRemoverServicoVenda();
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
      headerName: "N° Serviço ",
      width: 110,
      field: "servicoId",
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
      headerName: "Serviço",
      flex: 1,
      field: "servico",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor",
      width: 110,
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
  ]);

  const cellClickedListener = useCallback((event: any) => {
    setselectedRow(event.data ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* {openModalRemover && (
      <ModalRemover 
      produtoVendaId={selectedRow?.produtoVendaId}
      openModal={openModalRemover}
      quantidade={selectedRow?.quantidade}
      produtoId={selectedRow?.produtoId}
      setOpenModal={setOpenModalRemover}
      vendaId={vendaId} />
    )} */}
      {openModalRemover && (
        <ModalAcao
          textHeader="Remover"
          Fnhandle={() => {
            FnRemoverServicoVendas({
              servicoId: selectedRow?.servicoId,
              servicoVendaId: selectedRow?.servicoVendaId,
              vendaId,
            });

            setOpenModalRemover(false);
          }}
          text="Deseja Remover este item ?"
          openModal={openModalRemover}
          setOpenModal={setOpenModalRemover}
        />
      )}

      <div>
        <fieldset className="fieldsetContainer">
          <p className="table-title">Lista de Serviços</p>
          <div className={`${styles.table} ag-theme-alpine`}>
            <AgGridReact
              localeText={AG_GRID_LOCALE_PT_BR}
              rowData={listaServicosVendas}
              columnDefs={colDefs}
              onCellClicked={cellClickedListener}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}
