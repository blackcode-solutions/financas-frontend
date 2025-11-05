import {
  MdDownload,
  MdListAlt,
  MdMonitor,
  MdPayment,
  MdPrint,
  MdSearch,
} from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from "./styles.module.scss";
import { TableRecebimentosPagos } from "./TableRecebimentosPagos";
import { TableRecebimentosPendentes } from "./TableRecebimentosPendentes";
import { FiltrosTables } from "./FiltrosTables";
import { ModalAbrirPDV } from "../ModalAbrirPDV";
import { useRef, useState } from "react";
import { ModalRecebimentos } from "../ModalRecebimentos";
import { ModalEstornarVenda } from "./ModalEstornar";
import { ModalPagamentos } from "./ModalPagamentos";
import { ModalDetalhesRecebimentos } from "./ModalDetalhesRecebimentos";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFiltrosTabelaRecbVendas } from "@/helpers/stores/filtrosTelaVendas";
import { useReactToPrint } from "react-to-print";

type filtrostabelaVendasTypes = {
  dataInicial?: string;
  dataFinal?: string;
  bolEstornado?: boolean;
  bolCancelado?: boolean;
};

export function RecebimentosPage() {
  const router = useRouter();
  const formulario = useForm<filtrostabelaVendasTypes>();
  const [openModalPDV, setOpenModalPDV] = useState(false);
  const [openModalEstorno, setOpenModalEstorno] = useState(false);
  const [openModalPagamentos, setOpenModalPagamentos] = useState(false);
  const [openModalRecebimentos, setOpenModalRecebimentos] = useState(false);
  const [openModalDetalhesRecebimentos, setOpenModalDetalhesRecebimentos] =
    useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedRowRecebimentos, setSelectedRowRecebimentos] =
    useState<any>(null);
  const setFiltrosTabela = useFiltrosTabelaRecbVendas(
    (state) => state.setfiltrostabelaVendas
  );
  const impressaoRef = useRef<any>(null);
  const [startImpressao, setStartImpressao] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => impressaoRef?.current,
    documentTitle: `Vendas`,
    onAfterPrint() {
      setStartImpressao(false);
    },
  });

  function handleFilter() {
    const submit = formulario.handleSubmit((data) => {
      setFiltrosTabela(data);
    });
    submit();
  }

  return (
    <>
      {openModalDetalhesRecebimentos && (
        <ModalDetalhesRecebimentos
          openModal={openModalDetalhesRecebimentos}
          setOpenModal={setOpenModalDetalhesRecebimentos}
          recebimentoVendaId={selectedRowRecebimentos?.recebimentoVendaId}
        />
      )}

      {openModalPagamentos && (
        <ModalPagamentos
          openModal={openModalPagamentos}
          setOpenModal={setOpenModalPagamentos}
        />
      )}
      {openModalEstorno && (
        <ModalEstornarVenda
          openModal={openModalEstorno}
          setOpenModal={setOpenModalEstorno}
          vendaId={selectedRow?.vendaId}
        />
      )}
      {openModalRecebimentos && (
        <ModalRecebimentos
          openModal={openModalRecebimentos}
          setOpenModal={setOpenModalRecebimentos}
          cliente={selectedRow?.cliente}
          setClearSelectedRow={() => setSelectedRow(null)}
          valorTotal={selectedRow?.totalGeral}
          vendaId={selectedRow?.vendaId}
        />
      )}

      {openModalPDV && (
        <ModalAbrirPDV
          openModal={openModalPDV}
          setOpenModal={setOpenModalPDV}
        />
      )}

      <div className={styles.containerMain}>
        <div className={styles.containerButtons}>
          <ButtonComponent
            onClick={() => handleFilter()}
            style={{ width: "120px", height: "37px" }}
          >
            <MdSearch size={18} /> Filtrar
          </ButtonComponent>
          <ButtonComponent
            onClick={() => setOpenModalPDV(true)}
            style={{ width: "130px", height: "37px" }}
          >
            <MdMonitor size={18} /> Abrir PDV
          </ButtonComponent>
          <ButtonComponent
            isDisable={!selectedRow}
            onClick={() => setOpenModalRecebimentos(true)}
            style={{ width: "125px", height: "37px" }}
          >
            <MdPayment size={18} /> Receber
          </ButtonComponent>
          <ButtonComponent
            onClick={() => setOpenModalEstorno(true)}
            isDisable={selectedRow?.statusVenda !== "EFETIVADO"}
            style={{ width: "125px", height: "37px" }}
          >
            <MdDownload size={18} /> Estornar
          </ButtonComponent>
          <ButtonComponent
            onClick={() => setOpenModalPagamentos(true)}
            style={{ width: "145px", height: "37px" }}
          >
            <MdPayment size={18} /> Pagamentos
          </ButtonComponent>
          <ButtonComponent
            onClick={() => {
              setStartImpressao(true);
              setTimeout(() => {
                handlePrint();
              }, 300);
            }}
            style={{ width: "125px", height: "37px" }}
          >
            <MdPrint size={18} /> Relatório
          </ButtonComponent>
          <ButtonComponent
            onClick={() => setOpenModalDetalhesRecebimentos(true)}
            isDisable={!selectedRowRecebimentos}
            style={{ width: "175px", height: "37px" }}
          >
            <MdPrint size={18} /> Detalhes Receb.
          </ButtonComponent>
          <ButtonComponent
            onClick={() => router.push("/fechamentoPDV")}
            style={{ width: "130px", height: "37px" }}
          >
            <MdListAlt size={18} /> Fec. PDV
          </ButtonComponent>
        </div>
        <section>
          <FiltrosTables formulario={formulario} />
        </section>
        <section>
          <TableRecebimentosPendentes
            impressaoRef={impressaoRef}
            startImpressao={startImpressao}
            setSelectedRow={setSelectedRow}
          />
        </section>
        <section>
          <TableRecebimentosPagos
            setSelectedRowRecebimentos={setSelectedRowRecebimentos}
          />
        </section>
      </div>
    </>
  );
}
