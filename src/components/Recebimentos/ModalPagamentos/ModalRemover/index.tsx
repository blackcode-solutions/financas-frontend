import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useRemoverPagamentos } from "./useRemoverPagamentos";

interface ModalRemoverProps extends modalOpen {
  pagamentoId:number;
  closeAll:()=>void;
}

export function ModalRemover({
  openModal,pagamentoId,
  setOpenModal,closeAll
}: ModalRemoverProps) {

  const {FnRemoverPagamentos} = useRemoverPagamentos()
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
        onClick={()=>FnRemoverPagamentos({pagamentoId,handleClose:()=>{
          setOpenModal(false)
          closeAll()
        }})}
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Remover Pagamento"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
    >
     <p className="m-0">
      Deseja REMOVER este pagamento?
    </p>
    </Dialog>
  );
}
