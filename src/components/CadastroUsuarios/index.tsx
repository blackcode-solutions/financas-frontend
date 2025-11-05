import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import { Button } from "primereact/button";
import SwitchComponent from "../SwitchComponent";
import { useAdicionarUsuario } from "./hooks/useAdicionarEmpresa";

interface ModalCadastroUsuarios extends modalOpen {
  empresaId:number;
}

export function ModalCadastroUsuarios({
  empresaId,
  openModal,
  setOpenModal,
}: ModalCadastroUsuarios) {
  const { FnSalvarUsuario,formulario } = useAdicionarUsuario()
  const { register } = formulario
  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={() => {
          formulario.reset({
            bolAdministrador:false,
            email:"",
            password:"",username:"",
            usuarioId:0
          })
          setOpenModal(false)}}
        className="p-button-text"
      />
      <Button
        label="Gravar"
        // rounded
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
        onClick={()=>FnSalvarUsuario(empresaId,() => {
          formulario.reset({
            bolAdministrador:false,
            email:"",
            password:"",username:"",
            usuarioId:0
          })
          setOpenModal(false)
        })}
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Cadastro Usuários"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
    >
      <main>
        <div className={styles.containerInputs}>
          <div className={styles.containerInput}>
            <label htmlFor="">Username</label>
            <InputComponent {...register("username")} />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Email</label>
            <InputComponent type="email"  {...register("email")} />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Senha</label>
            <InputComponent type="password" {...register("password")} />
          </div>
          <div className={styles.containerInput}>
            <SwitchComponent
              checked={true}
            label="Administrador"/>
          </div>
        </div>
      </main>
    </Dialog>
  );
}
