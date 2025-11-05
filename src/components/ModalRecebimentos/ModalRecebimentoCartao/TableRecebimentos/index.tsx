import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { Tooltip } from "primereact/tooltip";
import { IoMdTrash } from "react-icons/io";
import { ToolTipTrash } from "@/components/Icons/ToolTipTrash";
import { useListarParcelasCartaoVendas } from "./hooks/useListarParcelasVenda";
import { ModalRemover } from "./ModalRemover";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";

interface ModalRecebimentosProps {
  recebimentoVendaId:number;
  listaParcelas:any;
}

export function TableRecebimentosCartao({recebimentoVendaId,listaParcelas}:ModalRecebimentosProps) {
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };
  const [selectedRow,setSelectedRow] = useState<any>(null)
  const [openModalRemover,setOpenModalRemover] = useState(false)

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: '',
      field: '',
      headerClass: 'headerTable',
      width: '50px',
      resizable: false,
      lockPosition: 'left',
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      cellRenderer: (params: any) => {
        return (
          <div onClick={()=>setOpenModalRemover(true)}>
           <ToolTipTrash />
          </div>
        );
      },
    },
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
      field: "statusRecebimentoCartao",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
  ]);
  const cellClickedListener = useCallback((event: any) => {
    setSelectedRow(event.data ?? null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <ModalRemover
    openModal={openModalRemover}
    setOpenModal={setOpenModalRemover}
    parcelaVendaCartaoId={selectedRow?.parcelaVendaCartaoId}
    recebimentoVendaId={selectedRow?.recebimentoVendaId}
    closeAllModal={() => {
      setSelectedRow(null)
      setOpenModalRemover(false)}}
    />
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Recebimentos Cartão</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            rowData={listaParcelas}
            columnDefs={colDefs}
            onCellClicked={cellClickedListener}
          />
        </div>
      </fieldset>
    </div>
    </>
  
  );
}
