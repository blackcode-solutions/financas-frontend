import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import { Button } from "primereact/button";
import { useRemoverItemVenda } from "./hooks/useRemoverServicoVenda";

interface ModalRemoverProps extends modalOpen {
  vendaId:number;
  produtoVendaId:number;
  produtoId:number;
  quantidade:number;
}

export function ModalRemover({
  openModal,produtoVendaId,quantidade,
  setOpenModal,vendaId,produtoId
}: ModalRemoverProps) {

  const { FnRemoverProdutosVendas } = useRemoverItemVenda()

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
          FnRemoverProdutosVendas({produtoVendaId,vendaId,produtoId,quantidade,handleClose:() => setOpenModal(false)})
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
        Deseja REMOVER este item?
    </p>
    </Dialog>
  );
}
