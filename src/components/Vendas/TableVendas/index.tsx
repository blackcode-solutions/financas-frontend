import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarVendas } from "../hooks/useListarVendas";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { FolhaImpressao } from "../ImpressaoVendas";
import { Tooltip } from "rsuite";
import { MdDelete } from "react-icons/md";
import { ModalAcao } from "@/components/ModalAcao/ModalAcao";
import { useRemoverVendas } from "../ModalRemover/hooks/useRemoverVendas";
import { StatusComponent } from "@/components/StatusComponent/StatusComponent";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";


type FormData = {
  vendaId:number;
  dataVenda: string;
  usuarioId: number;
  clienteId: number;
  cliente: string;
  numeroAbertura: number;
  statusVenda: string;
  cidade: string;
  totalGeral:any;
  total:number;
}

interface TableVendasprops{
  setSelectedRow:(value:FormData | null) => void;
  impressaoRef:any;
  startImpressao:boolean;
  vendaId: number;
  clearSelectedRow(): void;
}

export function TableVendas({setSelectedRow,startImpressao,impressaoRef,vendaId,clearSelectedRow}:TableVendasprops) {
  const listaVendas = useListarVendas()
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [openModalAcao,setOpenModalAcao] = useState(false);
  const { FnRemoverVendas } = useRemoverVendas();

  const cellClickedListener = useCallback((event: any) => {
    setSelectedRow(event.data ?? null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [colDefs, setColDefs] = useState<any>([
    {
      lockPosition: "left",
      field: "",
      resizable: false,
      filter: true,
      width: "50px",
      cellStyle: cellStyle,
      headerClass: "headerTable",
      sortable: true,
      cellRenderer: (_params: any) => {
        return (
          <div style={{ display: "flex" }}>
            <Tooltip
              title="Excluir Exame"
              onClick={() => {
                setOpenModalAcao(true);
              }}
            >
              <MdDelete color="#C94848" size={18} />
            </Tooltip>
          </div>
        );
      },
    },
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
        return <StatusComponent status={params.value} />;
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
          <MoneyStatus value={formatarDinheiro(params.value)}/>
        ) : (
          <MoneyStatus value={'R$ 0,00'}/>
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
          <MoneyStatus value={formatarDinheiro(params.value)}/>
        ) : (
          <MoneyStatus value={'R$ 0,00'}/>
        );
      },
    },
    {
      headerName: "Total",
      width: 100,
      field: "totalGeral",
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

      {openModalAcao && (
        <ModalAcao
          openModal={openModalAcao}
          setOpenModal={setOpenModalAcao}
          textHeader="Remover"
          text="Deseja realmente remover essa venda ?"
          Fnhandle={() => {
            FnRemoverVendas({
              vendaId,
              handleClose:() => {
                clearSelectedRow();
              }
            })

            setTimeout(() => {
              setOpenModalAcao(false);
            },500)
          }}
        />
      )}

      <div >
        <fieldset className="fieldsetContainer">
          {/* <legend className="fieldsetTitle">Vendas</legend> */}
        <p className="table-title" >Vendas</p>
          <div className={`${styles.table} ag-theme-alpine`}>
            <AgGridReact
              localeText={AG_GRID_LOCALE_PT_BR}
              rowData={listaVendas}
              onCellClicked={cellClickedListener}
              columnDefs={colDefs}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}
