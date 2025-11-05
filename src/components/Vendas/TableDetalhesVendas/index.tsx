import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styles from "./styles.module.scss";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { useListarProdutosVendas } from "../ModalNovoServico/TableRecebimentos/useListarProdutosVendas";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { MoneyStatus } from "@/components/MoneyStatus/MoneyStatus";

export function TableDetalhesVendas({
  vendaId,
}: {
  vendaId: number | undefined;
}) {
  const listaprodutos = useListarProdutosVendas(vendaId || 0);
  const cellStyle = (params: any) => {
    return {
      borderBottom: "1px solid rgb(220,220,220)",
      fontSize: "9pt",
    };
  };

  const [colDefs, setColDefs] = useState<any>([
    {
      headerName: "N° Produto ",
      width: 150,
      field: "produtoVendaId",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
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
      headerName: "Produto",
      width: 250,
      field: "nomeProduto",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor",
      width: 130,
      field: "valor",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return params ? (
          <MoneyStatus value={formatarDinheiro(params.value)} />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
      },
    },
    {
      headerName: "Quantidade",
      width: 100,
      field: "quantidade",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
    },
    {
      headerName: "Valor Total",
      width: 130,
      field: "make",
      resizable: true,
      filter: true,
      sortable: true,
      cellStyle: cellStyle,
      headerClass: "headerTable",
      cellRenderer: (params: any) => {
        return params ? (
          <MoneyStatus
            value={formatarDinheiro(
              params.data.quantidade * Number(params.data.valor)
            )}
          />
        ) : (
          <MoneyStatus value={"R$ 0,00"} />
        );
      },
    },
    {
      headerName: "Tipo",
      width: 130,
      field: "tipoProduto",
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
    <div>
      <fieldset className="fieldsetContainer">
        {/* <legend className="fieldsetTitle">Detalhes Vendas</legend> */}
        <p className="table-title">Detalhes Vendas</p>
        <div className={`${styles.table} ag-theme-alpine`}>
          <AgGridReact
            localeText={AG_GRID_LOCALE_PT_BR}
            defaultColDef={defaultColDef}
            rowData={listaprodutos}
            columnDefs={colDefs}
          />
        </div>
      </fieldset>
    </div>
  );
}
