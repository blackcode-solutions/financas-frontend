import ButtonComponent from "../ButtonComponent";
import { IoMdTrash } from "react-icons/io";
import {
  MdAddCircle,
  MdCancel,
  MdEdit,
  MdExitToApp,
  MdPerson,
  MdSave,
} from "react-icons/md";
import InputComponent from "../InputComponent";
import styles from "./styleRepasse.module.scss";
import { useAdicionarConfigRepasse } from "./hooks/useAdicionarConfigRepasse";
import { useRef, useState } from "react";
import { useRemoverConfigRepasse } from "./hooks/useRemoverConfigRepasse";
import { TableConfigRepasse } from "./components/TableConfigRepasse/TableConfigRepasse";
import { ModalAcao } from "../ModalAcao/ModalAcao";
import { TabelaConfigBarbeiro } from "./components/TabelaConfigBarbeiro/TabelaConfigBarbeiro";
import Select from "react-select";
import { useListarConfigRepasse } from "./hooks/useListarConfigRepasse";
import { useListarUsuarios } from "../DetalhesUsuario/CadastroUsuarios/hooks/useListarUsuarios";
import { useAdicionarConfigBarbeiro } from "./hooks/useAdicionarConfigBarbeiro";
import NovoRepasse from "./components/NovoRepasse/NovoRepasse";
import { FaGears } from "react-icons/fa6";
import { useRouter } from "next/navigation";

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

const RepassePage = () => {
  const { FnSalvarConfigRepasse, formulario } = useAdicionarConfigRepasse();
  const { FnSalvarConfigRepasseBarbeiro, formularioConfigBarbeiro } = useAdicionarConfigBarbeiro();
  const listaConfigRepasse = useListarConfigRepasse();
  const configRepasseSelect = useRef<any>(null);
  const router = useRouter()
  const { register, reset, watch } = formulario;
  const { FnRemoverConfigRepasse } = useRemoverConfigRepasse();
  const [selectedRowConfigRepasse, setSelectedRowConfigRepasse] = useState<FormDataServico | null>(null);

  const [openModalRemover, setOpenModalRemover] = useState(false);
  const [openModalNovo, setOpenModalNovo] = useState(false);
  const [isEdicao, setIsEdicao] = useState(false);

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

  return (
    <div>
      {openModalRemover && (
        <ModalAcao
          openModal={openModalRemover}
          setOpenModal={setOpenModalRemover}
          Fnhandle={() => {
            FnRemoverConfigRepasse(
              selectedRowConfigRepasse?.configuracaoRepasseId as number,
              setOpenModalRemover
            );
          }}
          textHeader="Remover"
          text="Deseja realmente excluir essa configuração ?"
        />
      )}

    {openModalNovo && (
      <NovoRepasse
      setOpenModal={setOpenModalNovo}
      openModal={openModalNovo}
      dadosRepasse={isEdicao && selectedRowConfigRepasse ? selectedRowConfigRepasse : null}
      />
    )}

      <section style={{ padding: "0.4rem" }}>
        <div className={styles.containerButtons}>
          <ButtonComponent
            // isDisable={habilitarFormulario}
             onClick={()=>{
                setIsEdicao(false)
             setOpenModalNovo(true);
            }}
            style={{ width: "160px", height: "37px" }}
          >
            <MdAddCircle size={18} /> Novo
          </ButtonComponent>
          <ButtonComponent
              onClick={()=>{
                setIsEdicao(true)
             setOpenModalNovo(true);
            }}
            isDisable={!selectedRowConfigRepasse?.configuracaoRepasseId}
            style={{ width: "160px", height: "37px" }}
          >
            <MdEdit size={18} /> Editar
          </ButtonComponent>
         
          <ButtonComponent
            // isDisable={!habilitarFormulario}
            onClick={()=>{
              router.push("processarRepasse")
            }}
            style={{ width: "160px", height: "37px" }}
          >
            <FaGears  size={18} /> Processar
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
        {/* <fieldset
          className="fieldsetContainer"
          style={
            {
              // opacity: `${habilitarFormulario ? "1" : "0.6"}`,
              // pointerEvents: `${habilitarFormulario ? "visible" : "none"}`,
            }
          }
        >
          <legend className="fieldsetTitle">Configuração Repasse</legend>
          <div className={styles.containerFlex}>
            <div className={styles.containerInput}>
              <label htmlFor="">Repasse</label>
              <InputComponent {...register("configuracaoRepasse")} />
            </div>

            <div className={styles.containerInput} style={{ width: "100px" }}>
              <label htmlFor="">Porcentagem</label>
              <InputComponent {...register("porcentagem")} />
            </div>
          
          </div>
        </fieldset> */}

        <div>
          <TableConfigRepasse setSelectedRow={setSelectedRowConfigRepasse} />
        </div>

        {/* <fieldset
          className="fieldsetContainer"
          style={
            {
              // opacity: `${habilitarFormulario ? "1" : "0.6"}`,
              // pointerEvents: `${habilitarFormulario ? "visible" : "none"}`,
            }
          }
        >
          <legend className="fieldsetTitle">
            Configuração Repasse Barbeiro
          </legend>
          <div className={styles.containerFlex} style={{ padding: "0" }}>
            <div className={styles.containerInput} style={{ width: "250px" }}>
              <label htmlFor="">Repasse</label>
              <Select
                placeholder=""
                ref={configRepasseSelect}
                isClearable={true}
                // isLoading={isLoadingProduto}
                onChange={(value: any) => {
                  // if (!value || value.value.length === 0) return;
                  // if (value.valor) {
                  //   // setQuantidade(1);
                  //   // setValorTotal(formatarDinheiro(value.valor));
                  //   // setValor(value.valor);
                  // }
                  setSelectedRepasse(value.value);
                }}
                // onInputChange={handleInputChangeProduto}
                noOptionsMessage={() => "Digite o nome do produto"}
                styles={customStyles}
                options={optionsRepasse}
              />
            </div>
            <div className={styles.containerInput} style={{ width: "200px" }}>
              <label htmlFor="">Barbeiro</label>
              <Select
                placeholder=""
                ref={configRepasseSelect}
                isClearable={true}
                // isLoading={isLoadingProduto}
                onChange={(value: any) => {
                  if (!value || value.value.length === 0) return;
                  if (value.valor) {
                    // setQuantidade(1);
                    // setValorTotal(formatarDinheiro(value.valor));
                    // setValor(value.valor);
                  }
                  setSelectedUsuario(value.value);
                }}
                // onInputChange={handleInputChangeProduto}
                noOptionsMessage={() => "Digite o nome do produto"}
                styles={customStyles}
                options={optionsUsuarios}
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <ButtonComponent
                // isDisable={!listaPDV[0]?.numeroAbertura}
                onClick={() => {
                  FnSalvarConfigRepasseBarbeiro({
                    configuracaoRepasseId:selectedRepasse,
                    usuarioConfiguracaoRepasseId:'',
                    usuarioId:selectedUsuario,
                  }
                  );
                }}
                style={{ width: "100px", height: "38px" }}
              >
                Salvar
              </ButtonComponent>
            </div>
          </div>
        </fieldset> */}
        <div>
          <TabelaConfigBarbeiro setSelectedRow={() => {}} selectedRowConfigRepasse={selectedRowConfigRepasse}/>
        </div>
      </section>
    </div>
  );
};

export default RepassePage;
