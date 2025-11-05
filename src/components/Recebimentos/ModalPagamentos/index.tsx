import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { ModalRemover } from "./ModalRemover";
import { TableListaPagamentos } from "./TableListaPagamentos";
import { useGravarPagamento } from "./hooks/useGravarPagamento";
import ButtonComponent from "@/components/ButtonComponent";
import { MdAddCircle, MdCancel, MdEdit, MdSave } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { BiExit } from "react-icons/bi";
import SwitchComponent from "@/components/SwitchComponent";
import { convertToISOFormat } from "@/helpers/convertTimeLocalToPtBr";
import { useListarFornecedores } from "./hooks/useListarFornecedores";
import Select from "react-select";
import { customStyles } from "@/utils/customStyleReactSelect";

interface ModalPagamentosProps extends modalOpen {}

// const customStyles = {
//   control: (base: any, { isFocused, isSelected }: any) => ({
//     ...base,
//     height: 35,
//     minHeight: 35,
//     borderColor: !isSelected ? "#41B06E" : base.borderColor,
//     boxShadow: !isSelected ? "#41B06E" : base.borderColor,
//     zIndex: 99999,
//     "&:hover": {
//       borderColor: "#41B06E",
//     },
//     "&:active": {
//       borderColor: "#41B06E",
//     },
//   }),
//   option: (base: any, { isFocused }: any) => ({
//     ...base,
//     backgroundColor: isFocused ? "#41B06E" : "white",
//     color: !isFocused ? "#41B06E" : "white",
//     zIndex: 99999,
//     "&:hover": {
//       backgroundColor: isFocused ? "#41B06E" : "white", // Define a cor de fundo para verde quando a opção estiver em foco
//       color: !isFocused ? "#41B06E" : "white",
//     },
//   }),
//   menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
// };

export function ModalPagamentos({
  openModal,
  setOpenModal,
}: ModalPagamentosProps) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  const { FnSalvarPagamento, formulario } = useGravarPagamento();
  const {
    fornecedorSelect,
    optionsFornecedores,
    selectedFornecedor,
    setSelectedFornecedor,
    handleInputChangeFornecedores,
  } = useListarFornecedores(openModal);
  const { register, reset } = formulario;
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const [habilitarFormulario, setHabilitarFormulario] = useState(false);
  const [meusPagamentos, setMeusPagamentos] = useState(false);

  function clearInputs() {
    reset({
      competencia: `${month}/${year}`,
      dataVencimento: formattedDateTime,
      contaFinanceira: "",
      dataPagamento: formattedDateTime,
      descricao: "",
      fornecedor: "",
      fornecedorId: 0,
      pagamentoId: 0,
      valor: "0",
    });
  }

  useEffect(() => {
    if (openModal) {
      reset({
        dataEmissao: formattedDateTime,
        dataPagamento: formattedDateTime,
        dataVencimento: formattedDateTime,
        competencia: `${month}/${year}`,
      });
    }
  }, [openModal]);

  useEffect(() => {
    if (openModal && selectedRow)
      reset({
        ...selectedRow,
        dataEmissao: convertToISOFormat(selectedRow?.dataEmissao),
        dataPagamento: convertToISOFormat(selectedRow?.dataPagamento),
        dataVencimento: convertToISOFormat(selectedRow?.dataVencimento),
      });
  }, [openModal, selectedRow]);

  return (
    <>
      <ModalRemover
        openModal={openModalRemover}
        setOpenModal={setOpenModalRemover}
        pagamentoId={selectedRow?.pagamentoId || 0}
        closeAll={() => {
          clearInputs();
          setSelectedRow(null);
          setHabilitarFormulario(false);
        }}
      />
      <Dialog
        modal
        header="Pagamentos"
        draggable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        visible={openModal}
        style={{ width: "70vw" }}
        closable={false}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <div
          style={{
            padding: "0.5rem",
            display: "flex",
            gap: ".5rem",
            flexDirection: "column",
          }}
        >
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
              onClick={() =>
                FnSalvarPagamento(
                  setHabilitarFormulario,
                  selectedFornecedor,
                  () => (fornecedorSelect?.current as any)?.clearValue()
                )
              }
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
          <fieldset
            style={{
              opacity: `${habilitarFormulario ? "1" : "0.6"}`,
              pointerEvents: `${habilitarFormulario ? "visible" : "none"}`,
            }}
            className={`fieldsetContainer ${styles.containerInputs}`}
          >
            <div className={styles.containerInput} style={{ width: "190px" }}>
              <label htmlFor="" className="label">
                Data Emissão
              </label>
              <InputDateTimeComponent {...register("dataEmissao")} />
            </div>
            <div className={styles.containerInput} style={{ width: "190px" }}>
              <label htmlFor="" className="label">
                Data Pagamento
              </label>
              <InputDateTimeComponent {...register("dataPagamento")} />
            </div>
            <div className={styles.containerInput} style={{ width: "190px" }}>
              <label htmlFor="" className="label">
                Data Vencimento
              </label>
              <InputDateTimeComponent {...register("dataVencimento")} />
            </div>
            <div className={styles.containerInput} style={{ width: "110px" }}>
              <label htmlFor="" className="label">
                Competência
              </label>
              <InputComponent
                {...register("competencia")}
                isDisable
                placeholder="__/__"
              />
            </div>
            <div className={styles.containerInput} style={{ width: "190px" }}>
              <label htmlFor="" className="label">
                Conta Financeira
              </label>
              <InputComponent {...register("contaFinanceira")} />
            </div>
            <div className={styles.containerInput} style={{ width: "200px" }}>
              <label htmlFor="" className="label">
                Fornecedor
              </label>
              <Select
                placeholder=""
                ref={fornecedorSelect}
                isClearable={true}
                onChange={(value: any) => setSelectedFornecedor(value)}
                onInputChange={handleInputChangeFornecedores}
                noOptionsMessage={() => "Digite o nome do cliente"}
                styles={customStyles}
                options={optionsFornecedores}
              />
            </div>

            <div className={styles.containerInput} style={{ width: "280px" }}>
              <label htmlFor="" className="label">
                Referente a
              </label>
              <InputComponent {...register("descricao")} />
            </div>
            <div className={styles.containerInput} style={{ width: "130px" }}>
              <label htmlFor="" className="label">
                Valor
              </label>
              <InputComponent {...register("valor")} />
            </div>
          </fieldset>

          <TableListaPagamentos
            meusPagamentos={meusPagamentos}
            setSelectedRow={setSelectedRow}
            setMeusPagamentos={setMeusPagamentos}
          />
        </div>
      </Dialog>
    </>
  );
}
