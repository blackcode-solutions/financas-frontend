import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styleConfigBarbeiro.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarConfigRepasse } from "../../hooks/useListarConfigRepasse";
import { FormDataServico } from "../../Repasse";
import { useListarConfigBarbeiro } from "../../hooks/useListarConfigBarbeiro";
import { useQueryClient } from "@tanstack/react-query";

interface TableConfigBarbeiroProps {
  reset?: (value: any) => void;
  setSelectedRow: Dispatch<SetStateAction<FormDataServico | null>>;
  selectedRowConfigRepasse: FormDataServico | null;
}

export function TabelaConfigBarbeiro({ reset, setSelectedRow,selectedRowConfigRepasse }: TableConfigBarbeiroProps) {
  const queryClient = useQueryClient();
   const listaConfigRepasseBarbeiro = useListarConfigBarbeiro(selectedRowConfigRepasse?.configuracaoRepasseId);
 
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "Id",
      width: 100,
      field: "usuarioConfiguracaoRepasseId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Barbeiro",
      flex:1,
      field: "username",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Repasse",
      width: 100,
      field: "porcentagem",
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

  // const defaultColDef = {
  //   flex: 1,
  // };

  useEffect(() => {
    if(selectedRowConfigRepasse){
      queryClient.refetchQueries({ queryKey: ["usuariosConfRepasse"] });
    }

  },[selectedRowConfigRepasse])

  return (
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Barbeiro</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            onCellClicked={cellClickedListener}
            rowData={selectedRowConfigRepasse ? listaConfigRepasseBarbeiro : []}
            // defaultColDef={defaultColDef}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
  );
}
