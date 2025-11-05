import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { useEffect, useState } from "react";
import { ModalRemover } from "./ModalRemover";
import { TableListaFornecedores } from "./TableListaFornecedores";
import { useGravarFornecedores } from "./hooks/useGravarFornecedores";
import ButtonComponent from "@/components/ButtonComponent";
import { MdAddCircle, MdCancel, MdEdit, MdSave } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { BiExit } from "react-icons/bi";

interface ModalCadastroFornecedoresProps extends modalOpen {}



export function ModalCadastroFornecedores({
  openModal,
  setOpenModal,
}: ModalCadastroFornecedoresProps) {
  const { FnSalvamentoFornecedores, formulario } = useGravarFornecedores();
  const { register, reset } = formulario;
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const [habilitarFormulario, setHabilitarFormulario] = useState(false);

  function clearInputs() {
    reset({
      cnpj: "",
      fornecedorId: 0,
      nomeFornecedor: "",
      observacao: "",
    });
  }


  return (
    <>
      <ModalRemover
        openModal={openModalRemover}
        setOpenModal={setOpenModalRemover}
        fornecedorId={selectedRow?.fornecedorId || 0}
        closeAll={() => {
          clearInputs();
          setSelectedRow(null);
          setHabilitarFormulario(false);
        }}
      />
      <Dialog
        modal
        header="Fornecedores"
        draggable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        visible={openModal}
        style={{ width: "70vw" }}
        closable={false}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <section style={{ padding: "0.5rem" }}>
          <div className={styles.containerButtons}>
            <ButtonComponent
              isDisable={habilitarFormulario}
              style={{ width: "130px" }}
              onClick={() => {
                clearInputs();
                setHabilitarFormulario(true);
                setSelectedRow(null);
              }}
            >
              <MdAddCircle size={18} /> Novo
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "130px" }}
              isDisable={!habilitarFormulario}
              onClick={() => FnSalvamentoFornecedores(setHabilitarFormulario)}
            >
              <MdSave size={18} />
              Gravar
            </ButtonComponent>
            <ButtonComponent
              isDisable={!selectedRow}
              style={{ width: "130px" }}
              onClick={() => {
                setHabilitarFormulario(true);
              }}
            >
              <MdEdit size={18} /> Editar
            </ButtonComponent>
            <ButtonComponent
              isDisable={!habilitarFormulario}
              isReturn
              style={{ width: "130px" }}
              onClick={() => {
                clearInputs();
                setSelectedRow(null);
                setHabilitarFormulario(false);
              }}
            >
              <MdCancel size={18} /> Cancelar
            </ButtonComponent>
            <ButtonComponent
              isDisable={!selectedRow}
              onClick={() => setOpenModalRemover(true)}
              isReturn
              style={{ width: "130px" }}
            >
              <IoMdTrash size={18} /> Remover
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "130px" }}
              isReturn
              onClick={() => {
                clearInputs();
                setHabilitarFormulario(false);
                setSelectedRow(null);
                setOpenModal(false);
              }}
            >
              <BiExit size={18} /> Sair
            </ButtonComponent>
          </div>
        </section>
        <div
          style={{
            opacity: `${habilitarFormulario ? "1" : "0.6"}`,
            pointerEvents: `${habilitarFormulario ? "visible" : "none"}`,
          }}
          className={styles.containerInputs}
        >
          <div className={styles.containerInput} style={{ width: "190px" }}>
            <label htmlFor="">Fornecedor Id</label>
            <InputComponent {...register("fornecedorId")} isDisable />
          </div>
          <div className={styles.containerInput} style={{ width: "250px" }}>
            <label htmlFor="">Fornecedor</label>
            <InputComponent {...register("nomeFornecedor")} />
          </div>
          <div className={styles.containerInput} style={{ width: "190px" }}>
            <label htmlFor="">CNPJ</label>
            <InputComponent {...register("cnpj")} />
          </div>
          <div className={styles.containerInput} style={{ width: "250px" }}>
            <label htmlFor="">Observação</label>
            <InputComponent
              {...register("observacao")}
            />
          </div>
        </div>

        <div>
          <TableListaFornecedores reset={reset} setSelectedRow={setSelectedRow} />
        </div>
      </Dialog>
    </>
  );
}
