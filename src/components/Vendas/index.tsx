import {
  MdAddCircle,
  MdCancel,
  MdDownload,
  MdEdit,
  MdListAlt,
  MdMonitor,
  MdPayment,
  MdPrint,
  MdSearch,
} from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from "./styles.module.scss";
import { TableDetalhesVendas } from "./TableDetalhesVendas";
import { TableVendas } from "./TableVendas";
import { FiltrosTables } from "./FiltrosTables";
import { ModalAbrirPDV } from "../ModalAbrirPDV";
import { useRef, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { ModalNovoServico } from "./ModalNovoServico/NovoServico";
import { ModalRemover } from "./ModalRemover";
import { ModalCancelarVendas } from "./ModalCancelarVenda";
import { ModalRecebimentos } from "../ModalRecebimentos";
import { ModalEstornarVenda } from "./ModalEstornar";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";
import { useFiltrosTabelaVendas } from "@/helpers/stores/filtrosTelaVendas";
import { ModalNovasVendas } from "./ModalNovaVendas/ModalNovaVenda";

type FormData = {
  vendaId: number;
  dataVenda: string;
  usuarioId: number;
  clienteId: number;
  cliente: string;
  numeroAbertura: number;
  totalGeral: any;
  statusVenda: string;
  cidade: string;
  total: number;
};

type filtrosTabelaVendasTypes = {
  dataInicial: string;
  dataFinal: string;
  bolEstornado: boolean;
  bolCancelado: boolean;
  vendaId: number;
  numeroAbertura: number;
};

export function VendasPage() {
  const formulario = useForm<filtrosTabelaVendasTypes>();
  const [openModalPDV, setOpenModalPDV] = useState(false);
  const [openModalEstorno, setOpenModalEstorno] = useState(false);
  const [openModalRecebimentos, setOpenModalRecebimentos] = useState(false);
  const [openModalVenda, setOpenModalVenda] = useState(false);
  const [openModalServico, setOpenModalServico] = useState(false);
  const [openModalRemover, setOpenModalRemover] = useState(false);
  const [openModalCancelarVendas, setOpenModalCancelarVendas] = useState(false);
  const [startImpressao, setStartImpressao] = useState(false);
  const impressaoRef = useRef<any>(null);
  const [selectedRow, setSelectedRow] = useState<FormData | null>(null);
  const setFiltrosTabela = useFiltrosTabelaVendas(
    (state) => state.setfiltrostabelaVendas
  );

  function handleFilter() {
    const submit = formulario.handleSubmit((data) => {
      setFiltrosTabela(data);
    });
    submit();
  }

  const handlePrint = useReactToPrint({
    content: () => impressaoRef?.current,
    documentTitle: `Vendas`,
    onAfterPrint() {
      setStartImpressao(false);
    },
  });

  function clearSelectedRow() {
    setSelectedRow(null);
  }

  return (
    <>
      <ModalEstornarVenda
        openModal={openModalEstorno}
        setOpenModal={setOpenModalEstorno}
        vendaId={selectedRow?.vendaId || 0}
      />
      <ModalCancelarVendas
        openModal={openModalCancelarVendas}
        setOpenModal={setOpenModalCancelarVendas}
        vendaId={selectedRow?.vendaId || 0}
        clearSelectedRow={clearSelectedRow}
      />
      <ModalRemover
        openModal={openModalRemover}
        setOpenModal={setOpenModalRemover}
        vendaId={selectedRow?.vendaId || 0}
        clearSelectedRow={clearSelectedRow}
      />
      <ModalNovasVendas
        openModal={openModalVenda}
        setOpenModal={setOpenModalVenda}
        selectedRow={selectedRow}
      />
      {openModalServico && (
        <ModalNovoServico
          openModal={openModalServico}
          setOpenModal={setOpenModalServico}
          selectedRow={selectedRow}
        />
      )}
      <ModalRecebimentos
        openModal={openModalRecebimentos}
        setOpenModal={setOpenModalRecebimentos}
        cliente={selectedRow?.cliente || ""}
        vendaId={selectedRow?.vendaId}
        valorTotal={selectedRow?.totalGeral || 0}
        setClearSelectedRow={() => {
          setSelectedRow({
            cidade: "",
            dataVenda: "",
            cliente: "",
            clienteId: 0,
            numeroAbertura: 0,
            statusVenda: "",
            total: 0,
            usuarioId: 0,
            vendaId: 0,
            totalGeral: "",
          });
        }}
      />
      <ModalAbrirPDV openModal={openModalPDV} setOpenModal={setOpenModalPDV} />
      <div className={styles.containerMain}>
          <div className={styles.containerButtons}>
            <ButtonComponent
              onClick={handleFilter}
              style={{ width: "120px", height: "37px" }}
            >
              <MdSearch size={18} /> Filtrar
            </ButtonComponent>
            <ButtonComponent
              onClick={() => setOpenModalPDV(true)}
              style={{ width: "128px", height: "37px" }}
            >
              <MdMonitor size={18} /> Abrir PDV
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                setSelectedRow(null);
                setTimeout(() => {
                  setOpenModalVenda(true);
                }, 100);
              }}
              style={{ width: "145px", height: "37px" }}
            >
              <MdAddCircle size={18} /> Nova Venda
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                setSelectedRow(null);
                setTimeout(() => {
                  setOpenModalServico(true);
                }, 100);
              }}
              style={{ width: "155px", height: "37px" }}
            >
              <MdAddCircle size={18} /> Novo Serviço
            </ButtonComponent>
            <ButtonComponent
              isDisable={
                !selectedRow || selectedRow?.statusVenda !== "PENDENTE"
              }
              onClick={() => setOpenModalVenda(true)}
              style={{ width: "120px", height: "37px" }}
            >
              <MdEdit size={18} /> Editar
            </ButtonComponent>
            {/* <ButtonComponent
              isDisable={
                !selectedRow?.vendaId || selectedRow?.statusVenda !== "PENDENTE"
              }
              onClick={() => setOpenModalRecebimentos(true)}
              style={{ width: "120px", height: "37px" }}
            >
              <MdPayment size={18} /> Receber
            </ButtonComponent> */}
            <ButtonComponent
              isDisable={
                !selectedRow?.vendaId || selectedRow?.statusVenda == "CANCELADO"
              }
              isReturn
              onClick={() => setOpenModalCancelarVendas(true)}
              style={{ width: "120px", height: "37px" }}
            >
              <MdCancel size={18} /> Cancelar
            </ButtonComponent>
            {/* <ButtonComponent 
          isDisable={!selectedRow?.vendaId || selectedRow?.statusVenda !== 'CANCELADO'}
          onClick={()=>setOpenModalRemover(true)}
          style={{ width: "120px", height: "37px" }}>
            <IoMdTrash size={18} /> Remover
          </ButtonComponent> */}
            <ButtonComponent
              isDisable={
                !selectedRow?.vendaId ||
                selectedRow?.statusVenda !== "EFETIVADO"
              }
              onClick={() => setOpenModalEstorno(true)}
              style={{ width: "120px", height: "37px" }}
            >
              <MdDownload size={18} /> Estornar
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                setStartImpressao(true);
                setTimeout(() => {
                  handlePrint();
                }, 300);
              }}
              style={{ width: "121px", height: "37px" }}
            >
              <MdPrint size={18} /> Relatório
            </ButtonComponent>
          </div>
        <section>
          <FiltrosTables formulario={formulario} />
        </section>
        <section>
          <TableVendas
            impressaoRef={impressaoRef}
            startImpressao={startImpressao}
            setSelectedRow={setSelectedRow}
            vendaId={selectedRow?.vendaId || 0}
            clearSelectedRow={clearSelectedRow}
          />
        </section>
        <section>
          <TableDetalhesVendas vendaId={selectedRow?.vendaId} />
        </section>
      </div>
    </>
  );
}
