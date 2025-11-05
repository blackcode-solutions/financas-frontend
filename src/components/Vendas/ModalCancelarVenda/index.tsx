import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import { Button } from "primereact/button";
import { useCancelarVendas } from "./hooks/useCancelarVendas";

interface ModalRemoverProps extends modalOpen {
  vendaId: number;
  clearSelectedRow(): void;
}

export function ModalCancelarVendas({
  openModal,
  clearSelectedRow,
  setOpenModal,
  vendaId,
}: ModalRemoverProps) {
  const { FnCancelarVendas } = useCancelarVendas();

  const footerContent = (
    <div>
      <Button
        label="Não"
        style={{
          color: "#7c42e0",
          outline: "none",
          border: "none",
          boxShadow: "none",
          background: "none",
        }}
        icon="pi pi-times"
        onClick={() => setOpenModal(false)}
        className="p-button-text"
      />
      <Button
        label="Sim"
        style={{
          backgroundColor: "#7c42e0",
          borderRadius: "12px",
          outline: "none",
          border: "none",
          boxShadow: "none",
        }}
        color="green"
        icon="pi pi-check"
        autoFocus
        onClick={() => {
          FnCancelarVendas({
            vendaId,
            handleClose: () => {
              clearSelectedRow();
              setOpenModal(false);
            },
          });
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
      closable={false}
    >
      <p className="m-0" style={{ padding: "0 1rem" }}>
        Deseja CANCELAR este item?
      </p>
    </Dialog>
  );
}
