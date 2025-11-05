import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useRemoverRecebimentos } from "../hooks/useRemoverRecebimento";

interface ModalRemoverProps extends modalOpen {
  recebimentoVendaId:number;
  closeAllModal:()=>void;
  vendaId:any;
}

export function ModalRemover({
  openModal,vendaId,
  recebimentoVendaId,
  setOpenModal,
  closeAllModal
}: ModalRemoverProps) {

  const { FnRemoverRecebimento } = useRemoverRecebimentos()

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
        onClick={()=>FnRemoverRecebimento({recebimentoVendaId,vendaId,handleClose:()=>{
          setOpenModal(false)
          closeAllModal()
        }})}
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Remover Recebimento"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
    >
     <p className="m-0">
       Ao sair, o recebimento será cancelado.Deseja REMOVER este recebimento?
    </p>
    </Dialog>
  );
}
