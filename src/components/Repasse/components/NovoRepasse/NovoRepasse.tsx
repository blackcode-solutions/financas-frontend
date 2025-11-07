import { IoMdTrash } from "react-icons/io";
import {
  MdAddCircle,
  MdCancel,
  MdEdit,
  MdExitToApp,
  MdPerson,
  MdSave,
} from "react-icons/md";

import Select from "react-select";
import { useAdicionarConfigRepasse } from "../../hooks/useAdicionarConfigRepasse";
import { useAdicionarConfigBarbeiro } from "../../hooks/useAdicionarConfigBarbeiro";
import { useListarConfigRepasse } from "../../hooks/useListarConfigRepasse";
import { useRef, useState } from "react";
import { useRemoverConfigRepasse } from "../../hooks/useRemoverConfigRepasse";
import { useListarUsuarios } from "@/components/DetalhesUsuario/CadastroUsuarios/hooks/useListarUsuarios";
import { ModalAcao } from "@/components/ModalAcao/ModalAcao";
import ButtonComponent from "@/components/ButtonComponent";
import styles from "./styleRepasse.module.scss";
import InputComponent from "@/components/InputComponent";
import { TableConfigRepasse } from "../TableConfigRepasse/TableConfigRepasse";
import { TabelaConfigBarbeiro } from "../TabelaConfigBarbeiro/TabelaConfigBarbeiro";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export interface FormDataServico {
  empresaId: number;
  configuracaoRepasseId: number;
  configuracaoRepasse: string;
  porcentagem: string;
}

const customStyles = {
  control: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    borderColor: !isSelected ? "#41B06E" : base.borderColor,
    boxShadow: !isSelected ? "#41B06E" : base.borderColor,
    zIndex: 99999,
    "&:hover": {
      borderColor: "#41B06E",
    },
    "&:active": {
      borderColor: "#41B06E",
    },
  }),
  option: (base: any, { isFocused }: any) => ({
    ...base,
    backgroundColor: isFocused ? "#41B06E" : "white",
    color: !isFocused ? "#41B06E" : "white",
    zIndex: 99999,
    "&:hover": {
      backgroundColor: isFocused ? "#41B06E" : "white", // Define a cor de fundo para verde quando a opção estiver em foco
      color: !isFocused ? "#41B06E" : "white",
    },
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
};

interface IProps {
  openModal: boolean;
  setOpenModal: (_value: boolean) => void;
}

const NovoRepasse = ({ openModal, setOpenModal }: IProps) => {
  const { FnSalvarConfigRepasse, formulario } = useAdicionarConfigRepasse();
  const { FnSalvarConfigRepasseBarbeiro, formularioConfigBarbeiro } =
    useAdicionarConfigBarbeiro();
  const listaConfigRepasse = useListarConfigRepasse();
  const configRepasseSelect = useRef<any>(null);

  const { register, reset, watch } = formulario;
  const { FnRemoverConfigRepasse } = useRemoverConfigRepasse();
  const [selectedRow, setSelectedRow] = useState<FormDataServico | null>(null);
  const [selectedRepasse, setSelectedRepasse] = useState<any | null>(null);
  const [selectedUsuario, setSelectedUsuario] = useState<any | null>(null);
  const [idRepasse,setIdRepasse] = useState(0);

  const [openModalRemover, setOpenModalRemover] = useState(false);

  const optionsRepasse = listaConfigRepasse.map((option: any) => ({
    value: option.configuracaoRepasseId,
    label: option.configuracaoRepasse,
    valor: option.porcentagem,
  }));

  const usuarios = useListarUsuarios();
  const optionsUsuarios = usuarios.map((option: any) => ({
    value: option.usuarioId,
    label: option.username,
    // valor: option.porcentagem,
  }));
  console.log({ usuarios });

  const [openForm,setOpenForm] = useState(false);

  const footerContent = (
    <div>
      <Button
        label="Sair"
        onClick={() => {
          // setValor("");
          // setValorServico("");
          // setVendaId(0);
          // setNomeProdutoAvulso("");
          // setNomeServicoAvulso("");
          // setbolProdutoAvulso(false);
          // setValorTotal("0");
          // setQuantidade(1);
          setOpenModal(false);
        }}
        style={{ backgroundColor: "#7c42e0", width: "130px" }}
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
      header="Nova Configuração Repasse"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      onHide={() => {
        //   setValor("");
        //   setValorServico("");
        //   setValorTotal("0");
        //   setQuantidade(1);
        //   setNomeProdutoAvulso("");
        //   setNomeServicoAvulso("");
        //   setbolProdutoAvulso(false);
        //   setVendaId(0);
        setOpenModal(false);
      }}
      style={{ padding: 0 }}
    >
      <div>
        {openModalRemover && (
          <ModalAcao
            openModal={openModalRemover}
            setOpenModal={setOpenModalRemover}
            Fnhandle={() => {
              FnRemoverConfigRepasse(
                selectedRow?.configuracaoRepasseId as number,
                setOpenModalRemover
              );
            }}
            textHeader="Remover"
            text="Deseja realmente excluir essa configuração ?"
          />
        )}

        <section style={{ padding: "0.4rem" }}>
          <div className={styles.containerButtons}>
            <ButtonComponent
              // isDisable={habilitarFormulario}
              // onClick={addNewEmpresa}
              style={{ width: "160px", height: "37px" }}
            >
              <MdAddCircle size={18} /> Novo
            </ButtonComponent>
            <ButtonComponent
              // isDisable={!watch("empresaId")}
              // onClick={()=>setHabilitarFormulario(true)}
              style={{ width: "160px", height: "37px" }}
            >
              <MdEdit size={18} /> Editar
            </ButtonComponent>
            <ButtonComponent
            //   onClick={FnSalvarConfigRepasse}
              // isDisable={!habilitarFormulario}
              style={{ width: "160px", height: "37px" }}
            >
              <MdSave size={18} /> Salvar
            </ButtonComponent>
            <ButtonComponent
              // isDisable={!habilitarFormulario}
              // onClick={cancelarEmpresa}
              isReturn={true}
              style={{ width: "160px", height: "37px" }}
            >
              <MdCancel size={18} /> Cancelar
            </ButtonComponent>
            {/* <ButtonComponent style={{width:"160px",height:"37px"}}>
                        <MdSearch size={18} /> Pesquisar
                    </ButtonComponent> */}
            <ButtonComponent
              // isDisable={!watch("empresaId")}
              onClick={() => setOpenModalRemover(true)}
              isReturn={true}
              style={{ width: "160px", height: "37px" }}
            >
              <IoMdTrash size={18} /> Remover
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "160px", height: "37px" }}
              // isDisable={!watch("empresaId")}
              // onClick={()=>setOpenModalCadastroUsuarios(true)} style={{width:"160px",height:"37px"}}
            >
              <MdPerson size={18} /> Usuários
            </ButtonComponent>
            <ButtonComponent
              style={{ width: "160px", height: "37px" }}
              // onClick={()=>router.back()}
              // isReturn={true} style={{width:"160px",height:"37px"}}
            >
              <MdExitToApp size={18} /> Sair
            </ButtonComponent>
          </div>
        </section>

        <section>
          <fieldset className="fieldsetContainer">
            <legend className="fieldsetTitle">Configuração Repasse</legend>
            <div className={styles.containerFlex}>
              <div className={styles.containerInput} style={{ width: "200px" }}>
                <label htmlFor="">Repasse</label>
                <InputComponent {...register("configuracaoRepasse")} />
              </div>

              <div className={styles.containerInput} style={{ width: "100px" }}>
                <label htmlFor="">Porcentagem</label>
                <InputComponent {...register("porcentagem")} />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <ButtonComponent
                  onClick={() => {
                    FnSalvarConfigRepasse(setOpenForm,setIdRepasse);
                  }}
                  style={{ width: "100px", height: "38px" }}
                >
                  Salvar
                </ButtonComponent>
              </div>
            </div>
          </fieldset>

          <fieldset
            className="fieldsetContainer"
            style={
              {
                opacity: `${openForm ? "1" : "0.6"}`,
                pointerEvents: `${openForm ? "visible" : "none"}`,
              }
            }
          >
            <legend className="fieldsetTitle">
              Configuração Repasse Barbeiro
            </legend>
            <div className={styles.containerFlex} style={{ padding: "0" }}>
              {/* <div className={styles.containerInput} style={{ width: "250px" }}>
                <label htmlFor="">Repasse</label>
                <Select
                  placeholder=""
                  ref={configRepasseSelect}
                  isClearable={true}
                  onChange={(value: any) => {
                    setSelectedRepasse(value.value);
                  }}
                  noOptionsMessage={() => "Digite o nome do produto"}
                  styles={customStyles}
                  options={optionsRepasse}
                />
              </div> */}
              <div className={styles.containerInput} style={{ width: "200px" }}>
                <label htmlFor="">Barbeiro</label>
                <Select
                  placeholder=""
                  ref={configRepasseSelect}
                  isClearable={true}
                  onChange={(value: any) => {
                    setSelectedUsuario(value.value);
                  }}
                  noOptionsMessage={() => "Digite o nome do produto"}
                  styles={customStyles}
                  options={optionsUsuarios}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <ButtonComponent
                  onClick={() => {
                    FnSalvarConfigRepasseBarbeiro({
                        configuracaoRepasseId: String(idRepasse),
                        usuarioConfiguracaoRepasseId: "",
                        usuarioId: selectedUsuario,
                      });
                  }}
                  style={{ width: "100px", height: "38px" }}
                >
                  Salvar
                </ButtonComponent>
              </div>
            </div>
          </fieldset>
          <div>
            <TabelaConfigBarbeiro idRepasse={idRepasse} />
          </div>
        </section>
      </div>
    </Dialog>
  );
};

export default NovoRepasse;
