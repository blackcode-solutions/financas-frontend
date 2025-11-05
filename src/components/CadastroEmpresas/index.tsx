import { MdAddCircle, MdCancel, MdEdit, MdExitToApp, MdPerson, MdSave, MdSearch } from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from './styles.module.scss'
import { TableEmpresas } from "./TableEmpresas";
import InputComponent from "../InputComponent";
import { ModalCadastroUsuarios } from "../CadastroUsuarios";
import { useState } from "react";
import { useAdicionarEmpresa } from "./hooks/useAdicionarEmpresa";
import { IoMdTrash } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useRemoverEmpresa } from "./hooks/useRemoverEmpresa";
import { ModalRemover } from "./ModalRemover";

export function CadastroEmpresasPage(){
    const router = useRouter()
    const [openModalCadastroUsuarios,setOpenModalCadastroUsuarios] = useState(false)
    const [openModalRemover,setOpenModalRemover] = useState(false)
    const { formulario,FnSalvarEmpresa } = useAdicionarEmpresa()
    const { register, reset, watch } = formulario
    const [habilitarFormulario,setHabilitarFormulario] = useState(false)

    function addNewEmpresa(){
        reset({
            cidade:"",
            cnpj:"",
            empresaId:0,
            endereco:"",
            estado:"",
            nomeFantasia:"",
            numeroFuncionarios:0,
            proprietario:""
        })
        setHabilitarFormulario(true)
    }
    function cancelarEmpresa(){
        reset({
            cidade:"",
            cnpj:"",
            empresaId:0,
            endereco:"",
            estado:"",
            nomeFantasia:"",
            numeroFuncionarios:0,
            proprietario:""
        })
        setHabilitarFormulario(false)
    }

    function preencherForm(data:any){
        reset(data)
        setHabilitarFormulario(false)
    }

    return(
        <>
        <ModalRemover
        empresaId={watch("empresaId")}
        openModal={openModalRemover}
        setOpenModal={setOpenModalRemover}
        />
        <ModalCadastroUsuarios
        openModal={openModalCadastroUsuarios}
        setOpenModal={setOpenModalCadastroUsuarios}
        empresaId={watch("empresaId")}
        />
         <fieldset className="fieldsetContainer" style={{margin:'1rem'}}>
            <legend className="fieldsetTitle">Cadastro de Empresas</legend>
            <section style={{padding:"0.4rem"}}>
            <div className={styles.containerButtons}>
                <ButtonComponent 
                isDisable={habilitarFormulario}
                onClick={addNewEmpresa}
                style={{width:"160px",height:"37px"}}>
                    <MdAddCircle size={18} /> Novo
                </ButtonComponent>
                <ButtonComponent 
                isDisable={!watch("empresaId")}
                onClick={()=>setHabilitarFormulario(true)}
                style={{width:"160px",height:"37px"}}>
                    <MdEdit size={18} /> Editar
                </ButtonComponent>
                <ButtonComponent 
                 onClick={FnSalvarEmpresa}
                isDisable={!habilitarFormulario}
                style={{width:"160px",height:"37px"}}>
                    <MdSave size={18}  /> Salvar
                </ButtonComponent>
                <ButtonComponent
                isDisable={!habilitarFormulario}
                onClick={cancelarEmpresa}
                isReturn={true} style={{width:"160px",height:"37px"}}>
                    <MdCancel size={18} /> Cancelar
                </ButtonComponent>
                {/* <ButtonComponent style={{width:"160px",height:"37px"}}>
                    <MdSearch size={18} /> Pesquisar
                </ButtonComponent> */}
                <ButtonComponent
                isDisable={!watch("empresaId")}
                onClick={()=>setOpenModalRemover(true)}
                isReturn={true} style={{width:"160px",height:"37px"}}>
                    <IoMdTrash size={18} /> Remover
                </ButtonComponent>
                <ButtonComponent
                isDisable={!watch("empresaId")}
                onClick={()=>setOpenModalCadastroUsuarios(true)} style={{width:"160px",height:"37px"}}>
                    <MdPerson size={18} /> Usuários
                </ButtonComponent>
                <ButtonComponent 
                onClick={()=>router.back()}
                isReturn={true} style={{width:"160px",height:"37px"}}>
                    <MdExitToApp size={18} /> Sair
                </ButtonComponent>
            </div>
        </section>
        <section>
        <fieldset className="fieldsetContainer"
            style={{opacity:`${habilitarFormulario ? '1' : '0.6'}`,
            pointerEvents:`${habilitarFormulario ? 'visible' : 'none'}`}}
        >
        <legend className="fieldsetTitle">Dados Empresa</legend>
            <div className={styles.containerFlex}>
            <div className={styles.containerInput} style={{width:"70px"}}>
                    <label htmlFor="">EmpresaId</label>
                    <InputComponent isDisable {...register('empresaId')}  />
                </div>
                <div className={styles.containerInput}>
                    <label htmlFor="">Nome Fantasia</label>
                    <InputComponent {...register('nomeFantasia')} />
                </div>
                <div className={styles.containerInput}>
                    <label htmlFor="">Proprietário</label>
                    <InputComponent {...register('proprietario')} />
                </div>
                <div className={styles.containerInput}>
                    <label htmlFor="">CNPJ</label>
                    <InputComponent {...register('cnpj')} />
                </div>
                <div className={styles.containerInput} style={{width:"130px"}}>
                    <label htmlFor="">N° Funcionários</label>
                    <InputComponent {...register('numeroFuncionarios')} />
                </div>
                <div className={styles.containerInput} style={{width:"230px"}}>
                    <label htmlFor="">Endereço</label>
                    <InputComponent {...register("endereco")} />
                </div>
                <div className={styles.containerInput} style={{width:"170px"}}>
                    <label htmlFor="">Cidade</label>
                    <InputComponent {...register('cidade')} />
                </div>
                <div className={styles.containerInput} style={{width:"100px"}}>
                    <label htmlFor="">Estado</label>
                    <InputComponent {...register('estado')} />
                </div>
            </div>
        </fieldset>
         <TableEmpresas reset={preencherForm} />   
        </section>
         </fieldset>
        
        </>
    )
}