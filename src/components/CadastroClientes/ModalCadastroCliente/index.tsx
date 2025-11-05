import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import { Button } from "primereact/button";
import { UseFormReset } from "react-hook-form";
import { useEffect } from "react";
import { useAdicionarCliente } from "../hooks/useAdicionarCliente";
import { pad } from "lodash";

type FormCliente = {
  clienteId: number;
  cliente: string;
  datNascimento: string;
  cpf: string;
  cnpj: string;
  empresa: string;
};

interface ModalCadastroCliente extends modalOpen {
  selectedRow: FormCliente | null;
}

export function ModalCadastroCliente({
  openModal,
  setOpenModal,
  selectedRow,
}: ModalCadastroCliente) {
  const { FnSalvarClientes, formulario } = useAdicionarCliente();
  const { register } = formulario;

  function preencherForm(data: FormCliente | any) {
    formulario.reset(data);
  }

  function cancelarCliente() {
    formulario.reset({
      cliente: "",
      clienteId: 0,
      cnpj: "",
      cpf: "",
      datNascimento: "",
    });
  }

  function handleClose() {
    cancelarCliente();
    setOpenModal(false);
  }

  useEffect(() => {
    if (openModal && selectedRow) {
      preencherForm(selectedRow);
    }
  }, [openModal]);

  const footerContent = (
    <div>
      <Button
        label="Sair"
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={handleClose}
        className="p-button-text"
      />
      <Button
        label="Gravar"
        onClick={() => FnSalvarClientes(handleClose)}
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Cadastro Clientes"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => {
        cancelarCliente();
        setOpenModal(false);
      }}
      closable={false}
    >
      <main style={{ padding: "0.5rem" }}>
        <div className={styles.containerInputs}>
          <div className={styles.containerInput}>
            <label htmlFor="">Cliente</label>
            <InputComponent {...register("cliente")} />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Data Nascimento</label>
            <InputComponent
              type="date"
              placeholder="__/__/____"
              {...register("datNascimento")}
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Empresa</label>
            <InputComponent {...register("empresa")} />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">CPF</label>
            <InputComponent {...register("cpf")} />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">CNPJ</label>
            <InputComponent {...register("cnpj")} />
          </div>
        </div>
      </main>
    </Dialog>
  );
}
