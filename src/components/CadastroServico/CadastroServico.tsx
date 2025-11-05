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
import styles from "./cadastroServico.module.scss";
import { useAdicionarEmpresa } from "../DetalhesUsuario/useAdicionarEmpresa";
import { useAdicionarServicos } from "./hooks/useAdicionarServicos";
import { useState } from "react";
import { ModalRemover } from "../CadastroClientes/ModalRemover";
import { ModalAcao } from "../ModalAcao/ModalAcao";
import { useRemoverServico } from "./hooks/useRemoverServicos";
import { TableServicos } from "./components/TableServicos/TabelaServico";

export interface FormDataServico{
  empresaId:number;
  servicoId:number;
  servico:string;
  valor:string;
}

const CadastroServico = () => {
  // const { formulario, FnSalvarEmpresa } = useAdicionarEmpresa();
  const { formulario, FnSalvarServico } = useAdicionarServicos();
  const { register, reset, watch } = formulario;
  const { FnRemoverServicos } = useRemoverServico();
  const [selectedRow,setSelectedRow] = useState<FormDataServico | null>(null);
  

  const [openModalRemover,setOpenModalRemover] = useState(false);
  return (
    <div>
    {openModalRemover && (
      <ModalAcao
        openModal={openModalRemover}
        setOpenModal={setOpenModalRemover}
        Fnhandle={() => {
          FnRemoverServicos(selectedRow?.servicoId as number,setOpenModalRemover)
        }}
        textHeader="Remover Serviço"
        text="Deseja realmente excluir esse serviço?"
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
            onClick={FnSalvarServico}
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
        <fieldset
          className="fieldsetContainer"
          style={
            {
              // opacity: `${habilitarFormulario ? "1" : "0.6"}`,
              // pointerEvents: `${habilitarFormulario ? "visible" : "none"}`,
            }
          }
        >
          <legend className="fieldsetTitle">Serviços</legend>
          <div className={styles.containerFlex}>
            <div className={styles.containerInput}>
              <label htmlFor="">Serviço</label>
              <InputComponent {...register("servico")} />
            </div>

            <div className={styles.containerInput} style={{ width: "100px" }}>
              <label htmlFor="">Valor R$</label>
              <InputComponent {...register("valor")} />
            </div>
            {/* <div className={styles.containerInput}>
                <label htmlFor="">Barbeiro</label>
                <InputComponent {...register("proprietario")} />
              </div> */}
          </div>
        </fieldset>
        <TableServicos setSelectedRow={setSelectedRow}/>
      </section>
    </div>
  );
};

export default CadastroServico;
