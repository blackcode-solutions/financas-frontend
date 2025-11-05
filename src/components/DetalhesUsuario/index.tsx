import { MdBusinessCenter, MdPerson, MdSave } from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from "./styles.module.scss";
import InputComponent from "../InputComponent";
import { useListarEmpresas } from "./CadastroUsuarios/hooks/useListarEmpresa";
import Cookie from "js-cookie";
import { ModalCadastroUsuarios } from "./CadastroUsuarios";
import { useEffect, useState } from "react";
import { TableUsuarios } from "./TablesUsuarios";
import { useAdicionarEmpresa } from "./useAdicionarEmpresa";
import { register } from "module";
import { ModalCadastroFornecedores } from "../ModalcadastroFornecedores";

export function DetalhesUsuario() {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const Administrador = Cookie.get("bolAdministrador");
  const {FnSalvarEmpresa,formulario } = useAdicionarEmpresa()
  const dadosEmpresa = useListarEmpresas(formulario);
  const [openModalUsuarios, setOpenModalUsuarios] = useState(false);
  const [openModalFornecedores, setOpenModalFornecedores] = useState(false);
  const enableCampos = Number(Administrador) !== 1 ? true : false;


  return (
    <>
    <ModalCadastroFornecedores
    openModal={openModalFornecedores}
    setOpenModal={setOpenModalFornecedores}
    />
      <ModalCadastroUsuarios
        openModal={openModalUsuarios}
        setOpenModal={setOpenModalUsuarios}
        selectedRow={selectedRow}
      />
      <main className={styles.containerMain}>
        {Number(Administrador) == 1 && (
          <section className={styles.containerButtons}>
            <ButtonComponent
              onClick={() => {
                setSelectedRow(null);
                setOpenModalUsuarios(true);
              }}
              style={{ width: "180px", height: "37px" }}
            >
              <MdPerson size={18} /> <span>Novo Usuário</span>
            </ButtonComponent>
            <ButtonComponent
              isDisable={!selectedRow}
              onClick={() => setOpenModalUsuarios(true)}
              style={{ width: "180px", height: "37px" }}
            >
              <MdPerson size={18} /> <span>Editar Usuário</span>
            </ButtonComponent>
            <ButtonComponent
              onClick={() => setOpenModalFornecedores(true)}
              style={{ width: "180px", height: "37px" }}
            >
              <MdBusinessCenter size={18} /> <span>Fornecedores</span>
            </ButtonComponent>
          </section>
        )}
        <fieldset className="fieldsetContainer" style={{ margin: "1rem" }}>
          <legend className="fieldsetTitle">Dados da Empresas</legend>

          <section className={styles.containerFlex}>
            <div className={styles.containerInput} style={{ width: "120px" }}>
              <label htmlFor="">N° Empresa</label>
              <InputComponent
                {...formulario.register("empresaId")}
                isDisable={true}
              />
            </div>
            <div className={styles.containerInput}>
              <label htmlFor="">Nome Fantasia</label>
              <InputComponent
                {...formulario.register("nomeFantasia")}

                isDisable={enableCampos}
              />
            </div>
            <div className={styles.containerInput}>
              <label htmlFor="">Proprietário</label>
              <InputComponent
                {...formulario.register("proprietario")}

                isDisable={enableCampos}
              />
            </div>
            <div className={styles.containerInput} style={{ width: "195px" }}>
              <label htmlFor="">CNPJ</label>
              <InputComponent
                {...formulario.register("cnpj")}
                isDisable={enableCampos}
              />
            </div>
            <div className={styles.containerInput} style={{ width: "130px" }}>
              <label htmlFor="">N° Funcionários</label>
              <InputComponent
                {...formulario.register("numeroFuncionarios")}
                isDisable={enableCampos}
              />
            </div>
            <div className={styles.containerInput}>
              <label htmlFor="">Endereço</label>
              <InputComponent
                isDisable={enableCampos}
                {...formulario.register("endereco")}
              />
            </div>
            <div className={styles.containerInput}>
              <label htmlFor="">Cidade</label>
              <InputComponent
                {...formulario.register("cidade")}
                isDisable={enableCampos}
              />
            </div>
            <div className={styles.containerInput} style={{ width: "100px" }}>
              <label htmlFor="">Estado</label>
              <InputComponent
                isDisable={enableCampos}
                {...formulario.register("estado")}
              />
            </div>
            <div className={styles.containerInput} style={{ width: "200px" }}>
              <label htmlFor="">Usuário</label>
              <InputComponent
                isDisable={true}
                value={Cookie.get("nomeUsuarioEfinance")}
              />
            </div>
            {Number(Administrador) == 1 && (
              <div style={{ marginTop: "1.1rem" }}>
                <ButtonComponent
                //   isDisable={enableCampos}
                  onClick={FnSalvarEmpresa}
                  style={{ width: "135px", height: "37px" }}
                >
                  <MdSave size={18} /> <span>Salvar</span>
                </ButtonComponent>
              </div>
            )}
          </section>
          <section className={styles.containerFlex}></section>
        </fieldset>
        {Number(Administrador) == 1 && (
          <fieldset className="fieldsetContainer" style={{ margin: "1rem" }}>
            <legend className="fieldsetTitle">Usuários da Empresas</legend>
            <TableUsuarios
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
            />
          </fieldset>
        )}
      </main>
    </>
  );
}
