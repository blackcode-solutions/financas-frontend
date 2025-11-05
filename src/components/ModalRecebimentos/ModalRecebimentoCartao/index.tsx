import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useGravarParcelaCartao } from "./hooks/useGravarParcelaCartao";
import { TableRecebimentosCartao } from "./TableRecebimentos";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useListarParcelasCartaoVendas } from "./TableRecebimentos/hooks/useListarParcelasVenda";
import { useAdicionarParcela } from "../hooks/useAdicionarParcela";
import { useRemoverParcelaCartaoVendas } from "./TableRecebimentos/ModalRemover/useRemoverParcelaCartaoVendas";
import { ModalRemover } from "./TableRecebimentos/ModalRemover";
import { useQueryClient } from "@tanstack/react-query";

interface ModalRecebimentoCartaoProps extends modalOpen {
  vendaId:number;
  recebimentoVendaId:number;
  formaPagamentoId:number;
  valorPagar:any;
  desconto:any;
  valorTotal:number;
}

export function ModalRecebimentoCartao({
  openModal,
  setOpenModal,formaPagamentoId,valorPagar,
  vendaId,recebimentoVendaId,desconto,valorTotal
}: ModalRecebimentoCartaoProps) {
  const { FnSalvarParcela } = useAdicionarParcela()
  const { FnGravarParcelaCartao } = useGravarParcelaCartao()
  const [codigoAutorizacao,setCodigoAutorizacao] = useState(0)
  const [numeroDocumentoNSU,setNumeroDocumentoNSU] = useState(0)
  const [parcelas,setParcelas] = useState(1)
  const [valorDesconto,setValorDesconto] = useState('0')
  const [valorParcela,setValorParcela] = useState('0')
  const listaParcelas = useListarParcelasCartaoVendas(recebimentoVendaId)
  const [openModalRemover,setOpenModalRemover] = useState(false)
  const queryClient = useQueryClient()
    console.log(valorParcela)
  const listaParcelasPendentes = listaParcelas?.reduce((acc:any,element:any)=>{
    if(element.statusRecebimentoCartao == 'PENDENTE'){
      acc.push(element)
    }
    return acc
  },[])

  useEffect(()=>{
      if(openModal){
        queryClient.invalidateQueries({queryKey:['listarParcelasCartaoRecebimentos']})
        setParcelas(1)
        setValorDesconto(desconto)
        setValorParcela(valorPagar)
      }
  },[openModal])

  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={() => {
          if(listaParcelasPendentes.length > 0) return setOpenModalRemover(true)
          setOpenModal(false)
        }}
        className="p-button-text"
      />
    
       <Button
        label="Efetivar"
        // rounded
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
        disabled={listaParcelasPendentes.length == 0 ? true : false}
        onClick={async ()=>{
          for( const item of listaParcelasPendentes){
            await  FnSalvarParcela({formaPagamentoId:item.formaPagamentoId,
              vendaId:item.vendaId,recebimentoVendaId:item.recebimentoVendaId,
              valorDesconto:item.valorDesconto,
              valorParcela:item.valorParcela,valorTotal,
              isCartao:true,
              parcelaVendaCartaoId:item.parcelaVendaCartaoId})
          }
          setOpenModal(false)
        }}
        // onClick={()=>FnRemoverParcelaVenda({parcelaVendaId,handleClose:()=>{
        //   setOpenModal(false)
        //   closeAllModal()
        // }})}
      />
    </div>
  );

  return (
    <>
    <ModalRemover
    openModal={openModalRemover}
    setOpenModal={setOpenModalRemover}
    recebimentoVendaId={recebimentoVendaId}
    closeAllModal={()=>setOpenModal(false)}
    parcelaVendaCartaoId={0}
    text="Ao sair, todos os recebimentos de cartão serão excluídos!"
    />
      <Dialog
      footer={footerContent}
      modal
      header="Cartão"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "63vw" }}
    
      closable={false}
      onHide={() =>{
        // if(listaParcelas.length > 0) return setOpenModalRemover(true)
        setOpenModal(false)}}
    >
      <div className={styles.containerInputs}>
        <div className={styles.containerInput} style={{width:"190px"}}>
        <label  htmlFor="">Valor</label>
        <InputComponent
        value={valorParcela} onChange={(e)=>setValorParcela((e.target.value))}
        type="text"
        />
      </div>
      <div className={styles.containerInput} style={{width:"190px"}}>
      <label  htmlFor="">Desconto</label>
      <InputComponent
      type="text"
      value={valorDesconto} onChange={(e)=>setValorDesconto((e.target.value))}
       />
     </div>
     <div className={styles.containerInput} style={{width:"190px"}}>
      <label  htmlFor="">N° Parcelas</label>
      <InputComponent
      value={parcelas} onChange={(e)=>setParcelas(Number(e.target.value))}
      type="number"
      isDisable={Number(formaPagamentoId) == 2 ? true : false}
       />
     </div>
     <div className={styles.containerInput} style={{width:"190px"}}>
      <label  htmlFor="">NSU</label>
      <InputComponent
      value={numeroDocumentoNSU} onChange={(e)=>setNumeroDocumentoNSU(Number(e.target.value))}
      type="number"
       />
     </div>
     <div className={styles.containerInput}   style={{width:"190px"}}>
      <label  htmlFor="">Codigo Autorizacao</label>
      <InputComponent
    
      value={codigoAutorizacao} onChange={(e)=>setCodigoAutorizacao(Number(e.target.value))}
      type="number"
       />
     </div>
      </div>
      <div className={styles.containerInputs} style={{marginTop:"0.5rem"}}>
        <div className={styles.containerInput} style={{width:"190px"}}>
        <label  htmlFor="">Tipo</label>
        <InputComponent
        isDisable
        value={Number(formaPagamentoId) == 2 ? 'DÉBITO' : 'CRÉDITO'}
        />
      </div>
      <div className={styles.containerInput} style={{width:"190px"}}>
        <label  htmlFor="">Dat. Pagamento</label>
        <InputComponent
        isDisable
        value={new Date().toLocaleDateString() + ' '+ new Date().toLocaleTimeString()}
        />
      </div>
      <div className={styles.containerInput} style={{width:"190px"}}>
        <label  htmlFor="">Total Recebimento</label>
        <InputComponent
        isDisable
        value={formatarDinheiro(valorTotal)}
        />
      </div>
      <div style={{marginTop:'0.9rem'}}>
      <Button
        label="Gravar"
        // rounded
        style={{ backgroundColor: "#41B06E" }}
        color="green"
        icon="pi pi-check"
        autoFocus
        onClick={async()=> await FnGravarParcelaCartao({formaPagamentoId,
          vendaId,recebimentoVendaId,valorDesconto:parseFloat(valorDesconto),valorParcela:parseFloat(valorParcela),
          codigoAutorizacao,numeroDocumentoNSU,parcelas,valorTotal})}
      />
      </div>
      </div>
        <div>
          <TableRecebimentosCartao listaParcelas={listaParcelas} recebimentoVendaId={recebimentoVendaId} />
        </div>
    </Dialog>
    </>
  
  );
}
