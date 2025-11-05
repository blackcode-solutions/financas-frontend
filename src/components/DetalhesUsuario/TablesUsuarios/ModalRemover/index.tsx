import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import { Button } from "primereact/button";
import { useRemoverUsuario } from "./hooks/useRemoverUsuario";

interface ModalRemoverProps extends modalOpen {
  usuarioId:number;

}

export function ModalRemoverUsuario({
  openModal,setOpenModal,usuarioId
}: ModalRemoverProps) {

  const { FnRemoverUsuarios } = useRemoverUsuario()

  const footerContent = (
    <div>
      <Button
        label="Não"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={() => setOpenModal(false)}
        className="p-button-text"
      />
      <Button
        label="Sim"
        // rounded
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
        onClick={()=>{
          FnRemoverUsuarios({usuarioId,handleClose:() => setOpenModal(false)})
        }}
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Remover Item"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
    >
     <p className="m-0">
        Deseja REMOVER este usuário?
    </p>
    </Dialog>
  );
}
