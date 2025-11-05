import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./stylesTabelaServico.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { UseFormReset } from "react-hook-form";
import { useListarEmpresas } from "@/components/CadastroEmpresas/hooks/useListarEmpresas";
import { useListarServicos } from "../../hooks/useListarServicos";
import { FormDataServico } from "../../CadastroServico";

interface TableEmpresaProps {
  reset?: (value: any) => void;
  setSelectedRow: Dispatch<SetStateAction<FormDataServico | null>>;
}

export function TableServicos({ reset,setSelectedRow }: TableEmpresaProps) {
  
  const listaServicos = useListarServicos();
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "Id",
      width: 230,
      field: "servicoId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Serviço",
      width: 230,
      field: "servico",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor R$",
      width: 207,
      field: "valor",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
  ]);

  const cellClickedListener = useCallback((event: any) => {
    setSelectedRow(event.data ?? null);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Serviços</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            onCellClicked={cellClickedListener}
            rowData={listaServicos}
            defaultColDef={defaultColDef}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
  );
}
