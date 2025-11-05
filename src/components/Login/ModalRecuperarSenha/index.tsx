import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useRecuperarSenha } from "../hooks/useRecuperarSenha";

interface ModalRecuperarSenhaProps extends modalOpen {
}

export function ModalRecuperarSenha({
  openModal,
  setOpenModal,
}: ModalRecuperarSenhaProps) {

  const { FnRecuperarSenha,email,setEmail } = useRecuperarSenha()

  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={() =>{
          setEmail('')
          setOpenModal(false)}}
        className="p-button-text"
      />
      <Button
        label="Confirmar"
        // rounded
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
        onClick={()=>FnRecuperarSenha(()=>{
          setEmail('')
          setOpenModal(false)
        })}
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Recuperar Senha"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
    >
     
    <div className={styles.containerInput}>
        <label htmlFor="">Informe o e-mail para recuperação de senha</label>
        <InputComponent type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
       </div>
    </Dialog>
  );
}
