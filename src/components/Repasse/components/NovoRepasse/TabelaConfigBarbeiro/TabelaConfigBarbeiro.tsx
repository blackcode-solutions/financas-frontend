import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styleConfigBarbeiro.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useQueryClient } from "@tanstack/react-query";
import { useListarConfigBarbeiro } from "@/components/Repasse/hooks/useListarConfigBarbeiro";
import { ModalAcao } from "@/components/ModalAcao/ModalAcao";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "rsuite";
import { useRemoverUsuarioConfigRepasse } from "../../TabelaConfigBarbeiro/useRemoverUsuarioConfigRepasse";

interface TableConfigBarbeiroProps {
  idRepasse:any;
}

export function TabelaConfigBarbeiro({ idRepasse }: TableConfigBarbeiroProps) {
  const queryClient = useQueryClient();
    const [selectedRow,setSelectedRow] = useState<any>({})
    const { FnRemoverUsuarioConfig } = useRemoverUsuarioConfigRepasse()
   const listaConfigRepasseBarbeiro = useListarConfigBarbeiro(idRepasse);
   const [openModalAcao,setOpenModalAcao] = useState(false)

  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

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
              title="Excluir"
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
    if(idRepasse){
      queryClient.refetchQueries({ queryKey: ["usuariosConfRepasse"] });
    }

  },[idRepasse])

  return (
    <>
         {openModalAcao && (
                <ModalAcao
                  openModal={openModalAcao}
                  setOpenModal={setOpenModalAcao}
                  textHeader="Remover"
                  text="Deseja realmente remover esse usuário ?"
                  Fnhandle={() => {
                    FnRemoverUsuarioConfig({
                      usuarioConfiguracaoRepasseId:selectedRow?.usuarioConfiguracaoRepasseId,
                      usuarioId  :selectedRow?.usuarioId
                    })
        
                    setTimeout(() => {
                      setOpenModalAcao(false);
                    },500)
                  }}
                />
              )}
              <div style={{ padding: "0.4rem" }}>
      <fieldset className="fieldsetContainer">
        <legend className="fieldsetTitle">Barbeiro</legend>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            onCellClicked={cellClickedListener}
            rowData={idRepasse ? listaConfigRepasseBarbeiro : []}
            // defaultColDef={defaultColDef}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
    </>
    
  );
}
