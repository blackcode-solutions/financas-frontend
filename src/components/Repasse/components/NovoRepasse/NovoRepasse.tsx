import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { MdAddCircle, MdCancel, MdEdit, MdExitToApp, MdPerson, MdSave } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";
import { ModalAcao } from "@/components/ModalAcao/ModalAcao";

import { useAdicionarConfigRepasse } from "../../hooks/useAdicionarConfigRepasse";
import { useAdicionarConfigBarbeiro } from "../../hooks/useAdicionarConfigBarbeiro";
import { useRemoverConfigRepasse } from "../../hooks/useRemoverConfigRepasse";
import { useListarUsuarios } from "@/components/DetalhesUsuario/CadastroUsuarios/hooks/useListarUsuarios";
import { TabelaConfigBarbeiro } from "./TabelaConfigBarbeiro/TabelaConfigBarbeiro";

import styles from "./styleRepasse.module.scss";

interface IProps {
  openModal: boolean;
  setOpenModal: (_value: boolean) => void;
  dadosRepasse?: any;
}

const customStyles = {
  control: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    height: 35,
    minHeight: 35,
    borderColor: !isSelected ? "#41B06E" : base.borderColor,
    boxShadow: !isSelected ? "#41B06E" : base.boxShadow,
    zIndex: 99999,
    "&:hover": { borderColor: "#41B06E" },
  }),
  option: (base: any, { isFocused }: any) => ({
    ...base,
    backgroundColor: isFocused ? "#41B06E" : "white",
    color: isFocused ? "white" : "#41B06E",
    "&:hover": { backgroundColor: isFocused ? "#41B06E" : "white", color: isFocused ? "white" : "#41B06E" },
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
};

const NovoRepasse = ({ openModal, setOpenModal, dadosRepasse }: IProps) => {
  const { FnSalvarConfigRepasse, formulario } = useAdicionarConfigRepasse();
  const { FnSalvarConfigRepasseBarbeiro, formularioConfigBarbeiro } = useAdicionarConfigBarbeiro();
  const { FnRemoverConfigRepasse } = useRemoverConfigRepasse();

  const configRepasseSelect = useRef<any>(null);

  const { register, reset, setValue } = formulario;
  const usuarios = useListarUsuarios();

  const optionsUsuarios = usuarios.map((option: any) => ({
    value: option.usuarioId,
    label: option.username,
  }));

  const [selectedUsuario, setSelectedUsuario] = useState<any | null>(null);
  const [idRepasse, setIdRepasse] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [openModalRemover, setOpenModalRemover] = useState(false);

  // Preencher campos caso dadosRepasse exista
  useEffect(() => {
    if (dadosRepasse) {
      setValue("configuracaoRepasse", dadosRepasse.configuracaoRepasse || "");
      setValue("porcentagem", dadosRepasse.porcentagem || "");
      setIdRepasse(dadosRepasse.configuracaoRepasseId || 0);
      setOpenForm(true);
    } else {
      reset();
      setSelectedUsuario(null);
      setIdRepasse(0);
      setOpenForm(false);
    }
  }, [dadosRepasse, setValue, reset]);

  const footerContent = (
    <div>
      <Button
        label="Sair"
        onClick={() => setOpenModal(false)}
        style={{ backgroundColor: "#7c42e0", width: "130px" }}
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
      onHide={() => setOpenModal(false)}
      style={{ padding: 0 }}
    >
      {/* {openModalRemover && (
        <ModalAcao
          openModal={openModalRemover}
          setOpenModal={setOpenModalRemover}
          Fnhandle={() => {
            FnRemoverConfigRepasse(selectedUsuario, setOpenModalRemover);
          }}
          textHeader="Remover"
          text="Deseja realmente excluir essa configuração?"
        />
      )} */}

      <section style={{ padding: "0.4rem" }}>
        <div className={styles.containerButtons}>
          <ButtonComponent 
            onClick={()=>{
            setValue("configuracaoRepasse",  "");
            setValue("porcentagem", "");
            setIdRepasse(0);
            setOpenForm(true);
            }}
          style={{ width: "160px", height: "37px" }}>
            <MdAddCircle size={18} /> Novo
          </ButtonComponent>
          <ButtonComponent 
                onClick={() => FnSalvarConfigRepasse(setOpenForm, setIdRepasse,idRepasse)}
          style={{ width: "160px", height: "37px" }}>
            <MdSave size={18} /> Salvar
          </ButtonComponent>
    
          {/* <ButtonComponent
            onClick={() => setOpenModalRemover(true)}
            isReturn
            style={{ width: "160px", height: "37px" }}
          >
            <IoMdTrash size={18} /> Remover
          </ButtonComponent> */}
          {/* <ButtonComponent style={{ width: "160px", height: "37px" }}>
            <MdExitToApp size={18} /> Sair
          </ButtonComponent> */}
        </div>
      </section>

      <section>
        <fieldset className="fieldsetContainer">
          <legend className="fieldsetTitle">Configuração Repasse</legend>
          <div className={styles.containerFlex}>
            <div className={styles.containerInput} style={{ width: "200px" }}>
              <label>Repasse</label>
              <InputComponent {...register("configuracaoRepasse")} />
            </div>
            <div className={styles.containerInput} style={{ width: "100px" }}>
              <label>Porcentagem</label>
              <InputComponent {...register("porcentagem")} />
            </div>
            {/* <div style={{ marginTop: "1rem" }}>
              <ButtonComponent
                style={{ width: "100px", height: "38px" }}
              >
                Salvar
              </ButtonComponent>
            </div> */}
          </div>
        </fieldset>

        <fieldset
          className="fieldsetContainer"
          style={{
            opacity: openForm ? "1" : "0.6",
            pointerEvents: openForm ? "auto" : "none",
          }}
        >
          <legend className="fieldsetTitle">Configuração Repasse Barbeiro</legend>
          <div className={styles.containerFlex} style={{ padding: "0" }}>
            <div className={styles.containerInput} style={{ width: "200px" }}>
              <label>Barbeiro</label>
              <Select
                placeholder=""
                ref={configRepasseSelect}
                isClearable
                onChange={(value: any) => setSelectedUsuario(value.value)}
                noOptionsMessage={() => "Digite o nome do usuário"}
                styles={customStyles}
                options={optionsUsuarios}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <ButtonComponent
                onClick={() =>
                  FnSalvarConfigRepasseBarbeiro({
                    configuracaoRepasseId: String(idRepasse),
                    usuarioConfiguracaoRepasseId: "",
                    usuarioId: selectedUsuario,
                  })
                }
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
    </Dialog>
  );
};

export default NovoRepasse;
