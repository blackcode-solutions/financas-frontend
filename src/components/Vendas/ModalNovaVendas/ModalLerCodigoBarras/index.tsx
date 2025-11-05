import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { useGravarProdutoCodigoBarras } from "./hooks/useGravarProdutoCodigoBarras";

interface ModalLerCodigoBarrasProps extends modalOpen {
  vendaId:number;
}

export function ModalLerCodigoBarras({
  openModal,
  setOpenModal,
  vendaId
}: ModalLerCodigoBarrasProps) {

  const { FnGravarCodigoBarras, codigoBarras,setCodigoBarras } = useGravarProdutoCodigoBarras()

  useEffect(()=>{
    if(openModal) setTimeout(() => {
      document.getElementById("inputCodigoBarras")?.focus()
    }, 200);
  },[openModal])


  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={() => {
          setCodigoBarras('')
          setOpenModal(false)}}
        className="p-button-text"
      />
      <Button
        label="Gravar"
        // rounded
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
        onClick={()=>FnGravarCodigoBarras({vendaId})}
        // onClick={()=>FnRemoverParcelaVenda({parcelaVendaId,handleClose:()=>{
        //   setOpenModal(false)
        //   closeAllModal()
        // }})}
      />
    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Ler Cód. Barras"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() =>{
        setCodigoBarras('')
        setOpenModal(false)}}
    >
     <div className={styles.containerInput}>
      <label  htmlFor="">Informe o Código de barras:</label>
      <InputComponent
      type="number"
      onKeyDown={(e)=>{
        if(e.key == 'Enter')FnGravarCodigoBarras({vendaId})
      }}
      value={codigoBarras} onChange={(e)=>setCodigoBarras(e.target.value)} id="inputCodigoBarras" />
     </div>
    </Dialog>
  );
}
