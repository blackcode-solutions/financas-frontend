import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import { Button } from "primereact/button";
import { useAdicionarProduto } from "../hooks/useAdicionarProdutos";
import { useEffect } from "react";


type FormProduto = {
  produtoId: number;
  valor: string;
  quantidade: number;
  codigoBarras: string;
  observacao: string;
  nomeProduto:string;
}

interface ModalCadastroProduto extends modalOpen {
  selectedRow:FormProduto | null;
}


export function ModalCadastroProduto({
  openModal,
  setOpenModal,
  selectedRow
}: ModalCadastroProduto) {

  const {FnSalvarproduto,formulario} = useAdicionarProduto()
  const { register } = formulario

    function preencherForm(data:FormProduto | any){
        formulario.reset(data)
    }

    function cancelarProduto(){
        formulario.reset({
            codigoBarras:"",nomeProduto:"",
            observacao:"",valor:"",produtoId:0,
            quantidade:0
        })
    }

    function handleClose(){
        cancelarProduto()
        setOpenModal(false)
    }
  

    useEffect(()=>{
        if(openModal && selectedRow) {
            preencherForm(selectedRow)
        }
    },[openModal])

  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={handleClose}
        className="p-button-text"
      />
      <Button
        label="Gravar"
        onClick={()=>FnSalvarproduto(handleClose)}
        // rounded
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
      header="Cadastro Produtos"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={() => {
        cancelarProduto()
        setOpenModal(false)}}
    >
      <main>
        <div className={styles.containerInputs}>
          <div className={styles.containerInput}>
            <label htmlFor="">Produto</label>
            <InputComponent {...register("nomeProduto")} />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Preço R$</label>
            <InputComponent type="number" {...register("valor")}  />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Quantidade</label>
            <InputComponent type="number"  {...register("quantidade")}  />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Cód. Barras</label>
            <InputComponent {...register("codigoBarras")} />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="">Observação</label>
            <InputComponent {...register("observacao")}/>
          </div>
        </div>
      </main>
    </Dialog>
  );
}
