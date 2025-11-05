import { useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { ToolTipTrash } from "@/components/Icons/ToolTipTrash";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useListarFornecedores } from "./hooks/useListarFornecedores";
import { UseFormReset } from "react-hook-form";

type FormData = {
  fornecedorId:number;
    nomeFornecedor: string;
    observacao: string;
    cnpj:string;
    
  }
interface TableListaFornecedoresProps {
  setSelectedRow:(value:any) => void;
  reset: UseFormReset<FormData>
}

export function TableListaFornecedores({setSelectedRow,reset}:TableListaFornecedoresProps) {
  const listaFornecedores = useListarFornecedores()
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    // {
    //   headerName: '',
    //   field: '',
    //   headerClass: 'headerTable',
    //   width: '50px',
    //   resizable: false,
    //   lockPosition: 'left',
    //   filter: true,
    //   sortable: true,
    //   cellStyle: cellStyle,
    //   cellRenderer: (params: any) => {
    //     return (
    //       <div onClick={()=>setOpenModalRemover(true)}>
    //        <ToolTipTrash />
    //       </div>
    //     );
    //   },
    // },
    {
      headerName: "N° ",
      width: 100,
      field: "fornecedorId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Fornecedor",
      width: 350,
      field: "nomeFornecedor",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "CNPJ",
      width: 250,
      field: "cnpj",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Observação",
      width: 350,
      field: "observacao",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    
  
  ]);
  const cellClickedListener = useCallback((event: any) => {
    setSelectedRow(event.data ?? null)
    reset(event.data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Fornecedores</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            rowData={listaFornecedores}
            columnDefs={colDefs}
            onCellClicked={cellClickedListener}
          />
        </div>
      </fieldset>
    </div>
    </>
  
  );
}
