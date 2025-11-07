import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styleConfigBarbeiro.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useQueryClient } from "@tanstack/react-query";
import { useListarConfigBarbeiro } from "@/components/Repasse/hooks/useListarConfigBarbeiro";

interface TableConfigBarbeiroProps {
  idRepasse:any;
}

export function TabelaConfigBarbeiro({ idRepasse }: TableConfigBarbeiroProps) {
  const queryClient = useQueryClient();
   const listaConfigRepasseBarbeiro = useListarConfigBarbeiro(idRepasse);
 
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

  // const cellClickedListener = useCallback((event: any) => {
  //   setSelectedRow(event.data ?? null);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const defaultColDef = {
  //   flex: 1,
  // };

  useEffect(() => {
    if(idRepasse){
      queryClient.refetchQueries({ queryKey: ["usuariosConfRepasse"] });
    }

  },[idRepasse])

  return (
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Barbeiro</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            // onCellClicked={cellClickedListener}
            rowData={idRepasse ? listaConfigRepasseBarbeiro : []}
            // defaultColDef={defaultColDef}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
  );
}
