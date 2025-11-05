import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import { Button } from "primereact/button";
import { useEstornarRecebimento } from "@/components/ModalRecebimentos/hooks/useEstornarRecebimento";

interface ModalEstornarVendaProps extends modalOpen {
  vendaId: any;
}

export function ModalEstornarVenda({
  openModal,
  vendaId,
  setOpenModal,
}: ModalEstornarVendaProps) {
  const { FnEstornarRecebimento } = useEstornarRecebimento();

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
        onClick={() =>
          FnEstornarRecebimento({
            vendaId,
            handleClose: () => {
              setOpenModal(false);
            },
          })
        }
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Estornar Recebimento"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
      closable={false}
    >
      <p className="m-0" style={{ padding: "0 1rem" }}>
        Deseja ESTORNAR esta venda?
      </p>
    </Dialog>
  );
}
