import {
  MdAddCircle,
  MdCancel,
  MdEdit,
  MdSave,
  MdSearch,
} from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from "./styles.module.scss";
import { IoMdExit, IoMdTrash } from "react-icons/io";
import { CardCliente } from "./CardCliente";
import { ModalCadastroCliente } from "./ModalCadastroCliente";
import { useState } from "react";
import { useListarClientes } from "./hooks/useListarClientes";
import { ModalRemover } from "./ModalRemover";
import { Paginator } from "primereact/paginator";
import InputComponent from "../InputComponent";

type FormData = {
  clienteId: number;
  cliente: string;
  datNascimento: string;
  cpf: string;
  cnpj: string;
  empresa: string;
};

export function CadastroClientesPage() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [first, setfirst] = useState(0);
  const onPageChange = (event: any) => {
    setPage(event.page + 1);
    setRows(event.rows);
    setfirst(event.first);
  };
  const [selectedRow, setSelectedRow] = useState<FormData | null>(null);
  const [openModalCadastroCliente, setOpenModalcadastroCliente] =
    useState(false);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const { clientes, totalPages } = useListarClientes(page);

  return (
    <>
      <ModalCadastroCliente
        openModal={openModalCadastroCliente}
        setOpenModal={setOpenModalcadastroCliente}
        selectedRow={selectedRow}
      />
      <ModalRemover
        clienteId={selectedRow?.clienteId}
        openModal={openModalRemover}
        setOpenModal={setOpenModalRemover}
      />
      <main className={styles.containerMain}>
        <section style={{ padding: "0.5rem", width: "100%" }}>
          <div className={styles.containerButtons}>
            <ButtonComponent
              onClick={() => {
                setSelectedRow(null);
                setOpenModalcadastroCliente(true);
              }}
              style={{ width: "160px", height: "37px" }}
            >
              <MdAddCircle size={18} /> Novo
            </ButtonComponent>
            <ButtonComponent
              onClick={() => setOpenModalcadastroCliente(true)}
              style={{ width: "160px", height: "37px" }}
            >
              <MdEdit size={18} /> Alterar
            </ButtonComponent>
            {/* <ButtonComponent style={{ width: "160px", height: "37px" }}>
            <MdCancel size={18} /> Cancelar
          </ButtonComponent> */}
            <ButtonComponent
              isDisable={!selectedRow?.clienteId}
              onClick={() => setOpenModalRemover(true)}
              style={{ width: "160px", height: "37px" }}
            >
              <IoMdTrash size={18} /> Excluir
            </ButtonComponent>
          </div>
        </section>
        <section>
          <div style={{ padding: "0.3rem", width: "335px" }}>
            <div className={styles.containerInput}>
              <MdSearch size={30} />
              <InputComponent type="text" />
            </div>
          </div>

          <div className={styles.containerFlex}>
            <div className={styles.containerList}>
              {clientes.map((element) => {
                return (
                  <CardCliente
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    key={element.clienteId}
                    data={element}
                  />
                );
              })}
            </div>
          </div>
          <div className="card">
            <Paginator
              first={first}
              rows={rows}
              rowsPerPageOptions={[10, 20, 30]}
              totalRecords={totalPages * 10}
              onPageChange={onPageChange}
            />
          </div>
        </section>
      </main>
    </>
  );
}
