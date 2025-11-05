import {
  MdAddCircle,
  MdAttachMoney,
  MdCancel,
  MdExitToApp,
  MdInfo,
  MdListAlt,
  MdMoney,
  MdMonitor,
  MdOutlineCreditCard,
  MdOutlinePix,
  MdPayment,
  MdPrint,
  MdSearch,
} from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from "./styles.module.scss";
import { TableRecebimentos } from "./TableRecebimentos";
import { FiltrosTables } from "./FiltrosTables";
import { ModalAbrirPDV } from "../ModalAbrirPDV";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalDetalhesRecebimentos } from "./ModalDetalhesRecebimentos";
import { useFiltrostabelaRecebimentosFechamentos } from "@/helpers/stores/filtrosTelaFechamentos";
import { TableListaPagamentos } from "./TableListaPagamentos";
import { useListarUsuarios } from "./hooks/useListarUsuarios";
import { useListarTotaisRecebimentos } from "./TableRecebimentos/hooks/useListarTotaisRecebimento";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { ModalFecharPDV } from "./ModalFechamentoPDV";
import { useRouter } from "next/navigation";

interface Recebimento {
  cliente: string;
  dataRecebimento: string; // Formato de data/hora: "DD/MM/YYYY HH:mm:ss"
  dataVenda: string; // Formato de data/hora: "DD/MM/YYYY HH:mm:ss"
  nomeUsuarioRecebimento: string;
  nomeUsuarioVenda: string;
  numeroAbertura: number;
  produtosVenda: string; // Produtos em formato de string separados por vírgula
  recebimentoVendaId: number;
  statusRecebimento: string;
  valorTotal: string; // Valor em formato de string
}

type filtrosTabelaRecebimentosTypes = {
  dataInicial?: string;
  dataFinal?: string;
  recebimentoVendaId: string;
  vendaId?: string;
  numeroAbertura?: string;
  usuarioId?: string;
};

export function FechamentoPDVPage() {
  const gridRef = useRef<any>(null);
  const router = useRouter();
  const formulario = useForm<filtrosTabelaRecebimentosTypes>();
  const [openModalPDV, setOpenModalPDV] = useState(false);
  const [openModalFecharPDV, setOpenModalFecharPDV] = useState(false);
  const [openModalDetalhes, setOpenModalDetalhes] = useState(false);
  const [selectedsRows, setselectedsRows] = useState<Recebimento[]>([]);
  const [listaSelecionados, setListarSelecionados] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Recebimento | null>(null);
  const [totaisPagamentos, setTotaisPagamentos] = useState(0);
  const [selectedsPagamentos, setSelectedsPagamentos] = useState<any>([]);

  const setFiltrosTabela = useFiltrostabelaRecebimentosFechamentos(
    (state) => state.setFiltrosTabelaRecebimentos
  );
  const {
    usuarioSelect,
    optionsUsuarios,
    selectedUser,
    setDelectedUser,
    handleInputChange,
  } = useListarUsuarios();
  const objFiltroUsuario = {
    usuarioSelect,
    optionsUsuarios,
    selectedUser,
    setDelectedUser,
    handleInputChange,
  };
  function handleFilter() {
    const submit = formulario.handleSubmit((data) => {
      const userId = selectedUser ? (selectedUser as any).value : "";
      setFiltrosTabela({
        ...data,
        usuarioId: userId ? userId : data.usuarioId,
      });
    });
    submit();
  }
  function clearselectedsRows() {
    setselectedsRows([]);
    setSelectedRow(null);
  }
  const recebimentoId: any = selectedsRows?.reduce((acc: any, element: any) => {
    acc.push(element.recebimentoVendaId);
    return acc;
  }, []);
  const recebimentosVendasIds =
    selectedsRows.length > 0
      ? selectedsRows.reduce((acc: any, element: any) => {
          acc.push(element.recebimentoVendaId);
          return acc;
        }, [])
      : "[]";
  const pagamentosIds =
    selectedsPagamentos.length > 0
      ? selectedsPagamentos.reduce((acc: any, element: any) => {
          acc.push(element.pagamentoId);
          return acc;
        }, [])
      : "[]";
  const ListaTotais = useListarTotaisRecebimentos(
    listaSelecionados ? recebimentoId : []
  );

  return (
    <>
      {openModalFecharPDV && (
        <ModalFecharPDV
          pagamentosIds={pagamentosIds}
          recebimentosVendasIds={recebimentosVendasIds}
          openModal={openModalFecharPDV}
          setOpenModal={setOpenModalFecharPDV}
          totalFechamento={formatarDinheiro(
            ListaTotais.Cortesia +
              ListaTotais.Dinheiro +
              ListaTotais.Pix +
              ListaTotais["Cartão Crédito"] +
              ListaTotais["Cartão Debito"] -
              totaisPagamentos
          )}
        />
      )}

      {openModalPDV && (
        <ModalAbrirPDV
          openModal={openModalPDV}
          setOpenModal={setOpenModalPDV}
        />
      )}

      {openModalDetalhes && (
        <ModalDetalhesRecebimentos
          openModal={openModalDetalhes}
          recebimentoVendaId={selectedRow?.recebimentoVendaId || 0}
          setOpenModal={setOpenModalDetalhes}
        />
      )}

      <div className={styles.containerMain}>
        <div className={styles.containerButtons}>
          <ButtonComponent
            onClick={handleFilter}
            style={{ width: "130px", height: "37px" }}
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
            isDisable={!listaSelecionados || selectedsRows.length == 0}
            onClick={() => setOpenModalFecharPDV(true)}
            style={{ width: "150px", height: "37px" }}
          >
            <MdCancel size={18} /> Fechar PDV
          </ButtonComponent>
          <ButtonComponent
            isDisable={!selectedRow}
            onClick={() => setOpenModalDetalhes(true)}
            style={{ width: "220px", height: "37px" }}
          >
            <MdInfo size={18} /> Detalhes Recebimento
          </ButtonComponent>
          <ButtonComponent
            onClick={() => router.push("fechamentos")}
            style={{ width: "150px", height: "37px" }}
          >
            <MdAttachMoney size={18} /> Fechamentos
          </ButtonComponent>
          <ButtonComponent
            isReturn
            onClick={() => router.push("recebimentos")}
            style={{ width: "150px", height: "37px" }}
          >
            <MdExitToApp size={18} /> Sair
          </ButtonComponent>
        </div>
        <section>
          <FiltrosTables
            objFiltroUsuario={objFiltroUsuario}
            formulario={formulario}
            gridRef={gridRef}
            setListarSelecionados={setListarSelecionados}
          />
        </section>
        <section>
          <TableRecebimentos
            clearselectedsRows={clearselectedsRows}
            setSelectedRow={setSelectedRow}
            gridRef={gridRef}
            setselectedsRowsRecebimentos={setselectedsRows}
          />
        </section>
        <section>
          <TableListaPagamentos
            setSelectedsPagamentos={setSelectedsPagamentos}
            selectedsPagamentos={selectedsPagamentos}
            setTotaisPagamentos={setTotaisPagamentos}
            meusPagamentos={false}
          />
        </section>

        <section className={styles.containerTotais}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                <MdAttachMoney size={18} color="#2e7d32" />
              </div>
              <div>
                <div>
                  <span>DINHEIRO</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatarDinheiro(ListaTotais.Dinheiro || 0)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                {/* <MdAttachMoney size={18} color="#2e7d32" /> */}
                <MdOutlineCreditCard size={18} color="#2e7d32" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>C. CRÉDITO</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatarDinheiro(ListaTotais["Cartão Crédito"] || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                {/* <MdAttachMoney size={18} color="#2e7d32" /> */}
                <MdOutlineCreditCard size={18} color="#2e7d32" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>C. DÉBITO</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatarDinheiro(ListaTotais["Cartão Debito"] || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                {/* <MdAttachMoney size={18} color="#2e7d32" /> */}
                <MdOutlinePix size={18} color="#2e7d32" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span> PIX</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatarDinheiro(ListaTotais.Pix || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                <MdAttachMoney size={18} color="#2e7d32" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>CORTESIA</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatarDinheiro(ListaTotais.Cortesia || 0)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                <MdAttachMoney size={18} color="#2e7d32" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>SALDO BRUTO</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatarDinheiro(
                      ListaTotais.Cortesia +
                        ListaTotais.Dinheiro +
                        ListaTotais.Pix +
                        ListaTotais["Cartão Crédito"] +
                        ListaTotais["Cartão Debito"]
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                <MdAttachMoney size={18} color="#2e7d32" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>DESPESAS</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    -{formatarDinheiro(totaisPagamentos || 0)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.containerTotalPagoPendente}>
              <div className={styles.containerIconMoney}>
                <MdAttachMoney size={18} color="#2e7d32" />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>TOTAL</span>
                </div>
                <div className={styles.flexCol}>
                  <span
                    style={{
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {formatarDinheiro(
                      ListaTotais.Cortesia +
                        ListaTotais.Dinheiro +
                        ListaTotais.Pix +
                        ListaTotais["Cartão Crédito"] +
                        ListaTotais["Cartão Debito"] -
                        totaisPagamentos
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
