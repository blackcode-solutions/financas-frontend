import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./stylesModalAcao.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";

interface ModalRemoverProps extends modalOpen {
  textHeader: string;
  text: string;
  Fnhandle: () => void;
}

export function ModalAcao({
  openModal,
  setOpenModal,
  textHeader = "Remover",
  Fnhandle,
  text,
}: ModalRemoverProps) {
  const footerContent = (
    <div>
      <Button
        label="Não"
        // rounded
        style={{ color: "#7c42e0",background:'none',outline:'none',border:'none',boxShadow:'none' }}
        icon="pi pi-times"
        onClick={() => setOpenModal(false)}
        className="p-button-text"
      />
      <Button
        label="Sim"
        // rounded
        style={{
          backgroundColor: "#7c42e0",
          width: "100px",
          border: "none",
          borderRadius: "12px",
          outline: "none",
          boxShadow: "none",
          height: "38px",
        }}
        color="green"
        icon="pi pi-check"
        autoFocus
        onClick={Fnhandle}
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header={textHeader}
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw",padding:'0' }}
      onHide={() => setOpenModal(false)}
      closable={false}
    >
      <div style={{ padding: "0 1rem",}}>
        <p style={{margin:'0' }}>{text}</p>
      </div>
    </Dialog>
  );
}
