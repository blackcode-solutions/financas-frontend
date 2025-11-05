import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useRemoverParcelaCartaoVendas } from "./useRemoverParcelaCartaoVendas";

interface ModalRemoverProps extends modalOpen {
  closeAllModal:()=>void;
  recebimentoVendaId:any;
  parcelaVendaCartaoId:any;
  text?:string;
}

export function ModalRemover({
  openModal,recebimentoVendaId, parcelaVendaCartaoId,
  setOpenModal,text,
  closeAllModal
}: ModalRemoverProps) {

  const { FnRemoverParcelaVendaCartao } = useRemoverParcelaCartaoVendas()

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
        onClick={()=>FnRemoverParcelaVendaCartao({recebimentoVendaId, parcelaVendaCartaoId,removeAll:true,handleClose:()=>{
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
      header="Remover Parcela"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => setOpenModal(false)}
    >
     <p className="m-0">
      {
        text ? text : 'Deseja REMOVER esta parcela?'
      }
        
    </p>
    </Dialog>
  );
}
