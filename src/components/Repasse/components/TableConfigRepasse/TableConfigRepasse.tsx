import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./stylesConfigRepasse.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { FormDataServico } from "../../Repasse";
import { useListarConfigRepasse } from "../../hooks/useListarConfigRepasse";

interface TableEmpresaProps {
  reset?: (value: any) => void;
  setSelectedRow: Dispatch<SetStateAction<FormDataServico | null>>;
}

export function TableConfigRepasse({ reset, setSelectedRow }: TableEmpresaProps) {
  const listaConfigRepasse = useListarConfigRepasse();
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
      field: "configuracaoRepasseId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Repasse",
      flex:1,
      field: "configuracaoRepasse",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Porcentagem",
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

  console.log({
    listaConfigRepasse
  })

  return (
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Repasse</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            onCellClicked={cellClickedListener}
            rowData={listaConfigRepasse}
            // defaultColDef={defaultColDef}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
  );
}
