import { MdBarcodeReader, MdBusiness, MdCode, MdInfo, MdMonetizationOn, MdOutlineAttachMoney } from "react-icons/md";
import styles from "./styles.module.scss";
import { GrProductHunt } from "react-icons/gr";
import { IoMdBarcode } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";

type FormProduto = {
  data:{
    produtoId: number;
  valor: string;
  quantidade: number;
  codigoBarras: string;
  observacao: string;
  nomeProduto:string;
  }
  selectedRow: {
    produtoId: number;
  valor: string;
  quantidade: number;
  codigoBarras: string;
  observacao: string;
  nomeProduto:string;

  } | null
  setSelectedRow:Dispatch<SetStateAction<{
    produtoId: number;
  valor: string;
  quantidade: number;
  codigoBarras: string;
  observacao: string;
  nomeProduto:string;
  }| null>>
}

export function CardEstoque({data,setSelectedRow,selectedRow}:FormProduto) {
  return (
    <div 
    onClick={()=>setSelectedRow(data)}
    style={{border:`${selectedRow?.produtoId == data.produtoId ? '1px solid #41B06E ' : ''}`}}
    className={styles.containerCard}>
      <div>
        <span className={styles.containerInfo}>
          <GrProductHunt   size={18} color="#41B06E" /> {data.nomeProduto}
        </span>
      </div>
     
      <div className={styles.containerFlexData}>
        <div>
        <span className={styles.containerInfo}>
          <MdMonetizationOn   size={18} color="#41B06E" />Valor: {formatarDinheiro(Number(data.valor.replace(',','.')))}
        </span>
        </div>
        <div>
        <span className={styles.containerInfo}>
          Quantidade : {data.quantidade}
        </span>
        </div>
      </div>

      <div className={styles.containerFlexData}>
      <div>
        <span className={styles.containerInfo}>
        <IoMdBarcode    size={18} color="#41B06E" /> Cód. : {data.codigoBarras}
        </span>
      </div>
        <div>
        <span className={styles.containerInfo}>
        <MdMonetizationOn   size={18} color="#41B06E" /> Total : {formatarDinheiro(data.quantidade * Number(data.valor.replace(",",'.')))}
        </span>
      </div>
      </div>
      
      <div>
        <span className={styles.containerInfo}>
          <MdInfo  size={18} color="#41B06E" /> {data.observacao}
        </span>
      </div>
     
      
    </div>
  );
}
