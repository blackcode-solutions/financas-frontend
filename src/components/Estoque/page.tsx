import { MdAddCircle, MdCancel, MdEdit, MdSave, MdSearch } from 'react-icons/md';
import ButtonComponent from '../ButtonComponent';
import styles from './styles.module.scss';
import { IoMdExit, IoMdTrash } from 'react-icons/io';
import { CardEstoque } from './CardEstoque';
import { ModalCadastroProduto } from './ModalcadastroProduto';
import { useState } from 'react';
import { useListarProdutos } from './hooks/useListarProdutos';
import { ModalRemover } from './ModalRemover';
import { formatarDinheiro } from '@/helpers/convertNumberToMoney';
import { Paginator } from 'primereact/paginator';

type FormProduto = {
    produtoId: number;
  valor: string;
  quantidade: number;
  codigoBarras: string;
  observacao: string;
  nomeProduto:string;
  }

export function EstoquePage(){
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [first,setfirst] = useState(0)
    const onPageChange = (event: any) => {
        setPage(event.page + 1); 
        setRows(event.rows);
        setfirst(event.first)
      };

    const {produtos,totalPages} = useListarProdutos(page)
    const[ openModalCadastroproduto,setOpenModalCadastroProduto] = useState(false)
    const [selectedRow,setSelectedRow] = useState<FormProduto | null>(null)
    const [openModalRemover,setOpenModalRemover] = useState(false)

    const totalProdutos = produtos.reduce((acc,element) =>{
        const totalProduto = Number(element.valor.replace(",",'.')) * element.quantidade
        acc += totalProduto
        return acc
    },0)


    return(
     <>
        <ModalCadastroProduto
        openModal={openModalCadastroproduto}
        setOpenModal={setOpenModalCadastroProduto}
        selectedRow={selectedRow}
        />
        <ModalRemover 
        openModal={openModalRemover}
        produtoId={selectedRow?.produtoId}
        setOpenModal={setOpenModalRemover}
        />
        <main className={styles.containerMain}>
            <section style={{padding:'0.5rem',width:"100%"}}>
                <div className={styles.containerButtons}>
                    <ButtonComponent style={{width:'160px',height:"37px"}} onClick={()=>{
                         setSelectedRow(null)
                        setOpenModalCadastroProduto(true)}}>
                        <MdAddCircle size={18}/> Novo
                    </ButtonComponent>
                    <ButtonComponent 
                    onClick={()=>{
                        setOpenModalCadastroProduto(true)
                    }}
                    style={{width:'160px',height:"37px"}}>
                        <MdEdit size={18}/> Alterar
                    </ButtonComponent>
                    <ButtonComponent
                    isDisable={!selectedRow?.produtoId}
                    onClick={()=>setOpenModalRemover(true)}
                    style={{width:'160px',height:"37px"}}>
                        <IoMdTrash size={18}/> Excluir
                    </ButtonComponent>
                  
                </div>
            </section>
            <section >
                <div className={styles.containerInfosT} >
                <div style={{padding:'0.3rem',width:"335px"}}>
                    <div className={styles.containerInput}>
                        <MdSearch size={20} />
                        <input
                        type='text'
                        />
                </div>
                </div>
                <div className={styles.containerTotal}> 
                    <div>
                        <span>Total</span>
                    </div>
                    <div>
                        <span> {formatarDinheiro(totalProdutos) || '0,00'}</span>
                    </div>
                    </div>
                </div>
           
                <div className={styles.containerFlex}>
                    <div className={styles.containerList}>
                    {
                        produtos.map((element) =>{
                            return <CardEstoque 
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                            key={element.produtoId}  data={element} />
                        })
                    }
                    </div>
                   
                    
                </div>
                <div className="card">
                    <Paginator first={first} rows={rows} rowsPerPageOptions={[10, 20, 30]} totalRecords={totalPages * 10} onPageChange={onPageChange} />
                     </div>
            </section>
                
        </main>
     </>
    )



}