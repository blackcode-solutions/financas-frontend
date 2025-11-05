import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useRemoverVendas } from "./hooks/useRemoverVendas";

interface ModalRemoverProps extends modalOpen {
  vendaId:number;
  clearSelectedRow(): void;
}

export function ModalRemover({
  vendaId,
  openModal,
  setOpenModal,
  clearSelectedRow
}: ModalRemoverProps) {
  const { FnRemoverVendas } = useRemoverVendas()
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
        onClick={()=>{
          FnRemoverVendas({vendaId,handleClose:() => {
            clearSelectedRow()
            setOpenModal(false)}})
        }}
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Remover Venda"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
    >
     <p className="m-0">
        Deseja REMOVER esta venda?
    </p>
    </Dialog>
  );
}
