import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useListarUsuarios } from "../CadastroUsuarios/hooks/useListarUsuarios";
import { ToolTipTrash } from "@/components/Icons/ToolTipTrash";
import { ModalRemoverUsuario } from "./ModalRemover";

interface TableVendasprops{
  setSelectedRow:(value:any) => void;
  selectedRow?:any;
}

export function TableUsuarios({setSelectedRow,selectedRow}:TableVendasprops) {
  const listaUsuarios = useListarUsuarios()
  const [openModalRemover,setOpenModalRemover] = useState(false)
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const cellClickedListener = useCallback((event: any) => {
    setSelectedRow(event.data ?? null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <ToolTipTrash  />
          </div>
        );
      },
    },
    {
      headerName: "Usuario Id",
      width: 150,
      field: "usuarioId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Username",
      width: 250,
      field: "username",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "email",
      width: 207,
      field: "email",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Administrador",
      width: 160,
      field: "bolAdministrador",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return params.value === 1 ? "Sim" : "Não";
      },
    }, 
  
   
  ]);
  const defaultColDef = {
    flex: 1,
  };

  return (
    <>
    <ModalRemoverUsuario 
    openModal={openModalRemover}
     setOpenModal={setOpenModalRemover}
     usuarioId={selectedRow?.usuarioId || 0}
      />
    <div style={{ padding: "0.4rem" }}>
       <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact localeText={AG_GRID_LOCALE_PT_BR} defaultColDef={defaultColDef} rowData={listaUsuarios} onCellClicked={cellClickedListener} columnDefs={colDefs} />
        </div>
    </div>
    </>
  
  );
}
