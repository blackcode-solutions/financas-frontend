import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarEmpresas } from "../hooks/useListarEmpresas";
import { UseFormReset } from "react-hook-form";

interface TableEmpresaProps{
  reset: (value:any) => void
}

export function TableEmpresas({reset}:TableEmpresaProps) {

  const listaEmpresas = useListarEmpresas()
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "EmpresaId",
      width: 130,
      field: "empresaId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Nome Fantasia",
      width: 230,
      field: "nomeFantasia",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Proprietário",
      width: 207,
      field: "proprietario",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "CNPJ",
      width: 100,
      field: "cnpj",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
   
    {
      headerName: "N° Funcionários",
      width: 100,
      field: "numeroFuncionarios",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Endereço",
      width: 100,
      field: "endereco",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Cidade",
      width: 100,
      field: "cidade",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Estado",
      width: 100,
      field: "estado",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
  ]);
  const cellClickedListener = useCallback((event: any) => {
    reset(event.data ?? null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Empresas</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact localeText={AG_GRID_LOCALE_PT_BR} 
          onCellClicked={cellClickedListener}
          rowData={listaEmpresas} defaultColDef={defaultColDef} columnDefs={colDefs} />
        </div>
      </fieldset>
    </div>
  );
}
