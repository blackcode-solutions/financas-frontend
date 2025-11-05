import {
  MdAddCircle,
  MdAttachMoney,
  MdCancel,
  MdExitToApp,
  MdInfo,
  MdListAlt,
  MdMonitor,
  MdPrint,
  MdSearch,
} from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from "./styles.module.scss";
import { TableFechamentos } from "./TableFechamentos";
import { FiltrosTables } from "./FiltrosTables";
import { ModalAbrirPDV } from "../ModalAbrirPDV";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalDetalhesRecebimentos } from "./ModalDetalhesRecebimentos";
import { useListarUsuarios } from "./hooks/useListarUsuarios";
import { useListarTotaisRecebimentos } from "./TableFechamentos/hooks/useListarTotaisRecebimento";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useFiltrostabelaRecebimentosFechamentosConcluidos } from "@/helpers/stores/filtrosTelaFechamentosConcluidos";
import { ModalImpressaoPDV } from "./ModalImpressao";
import { useRouter } from "next/navigation";

interface FechamentoPDVUsuario {
  fechamentoPDVUsuarioId: number;
  numeroAbertura: number;
  dataAbertura: string;
  dataFechamento: string;
  valorAbertura: string;
  bolIncluirValorAbertura: number;
  usuarioId: number;
  empresaId: number;
  usuarioFechamento: string;
  observacao: string;
}
type filtrosTabelaRecebimentosTypes = {
  dataInicial?: string;
  dataFinal?: string;
  fechamentoPDVUsuarioId: string;
  numeroAbertura?: string;
  usuarioId?: string;
};

export function FechamentosPage() {
  const gridRef = useRef<any>(null);
  const formulario = useForm<filtrosTabelaRecebimentosTypes>();
  const [openModalPDV, setOpenModalPDV] = useState(false);
  const [openModalDetalhes, setOpenModalDetalhes] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FechamentoPDVUsuario | null>(
    null
  );
  const router = useRouter();
  const [openModalImprimirRecebimento, setOpenModalImprimirRecebimento] =
    useState(false);
  const setFiltrosTabela = useFiltrostabelaRecebimentosFechamentosConcluidos(
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
    setSelectedRow(null);
  }

  const ListaTotais = useListarTotaisRecebimentos(
    selectedRow?.fechamentoPDVUsuarioId
  );

  return (
    <>
      {openModalImprimirRecebimento && (
        <ModalImpressaoPDV
          fechamentoPDVUsuarioId={selectedRow?.fechamentoPDVUsuarioId || 0}
          openModal={openModalImprimirRecebimento}
          setOpenModal={setOpenModalImprimirRecebimento}
          ListaTotais={ListaTotais}
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
          fechamentoPDVUsuarioId={selectedRow?.fechamentoPDVUsuarioId || 0}
          setOpenModal={setOpenModalDetalhes}
        />
      )}

      <div className={styles.containerMain}>
        <section className={styles.containerButtons}>
          <ButtonComponent
            onClick={handleFilter}
            style={{ width: "130px", height: "37px" }}
          >
            <MdSearch size={18} /> Filtrar
          </ButtonComponent>
          <ButtonComponent
            onClick={() => setOpenModalDetalhes(true)}
            style={{ width: "130px", height: "37px" }}
          >
            <MdInfo size={18} /> Detalhes
          </ButtonComponent>
          <ButtonComponent
            isDisable={!selectedRow}
            onClick={() => setOpenModalImprimirRecebimento(true)}
            style={{ width: "150px", height: "37px" }}
          >
            <MdPrint size={18} /> Imprimir
          </ButtonComponent>
          <ButtonComponent
            isReturn
            style={{ width: "120px", height: "37px" }}
            onClick={() => router.back()}
          >
            <MdExitToApp size={18} /> Sair
          </ButtonComponent>
        </section>

        <FiltrosTables
          objFiltroUsuario={objFiltroUsuario}
          formulario={formulario}
        />

        <TableFechamentos setSelectedRow={setSelectedRow} gridRef={gridRef} />

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
                    -{formatarDinheiro(ListaTotais.PagamentosUsuarios)}
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
                        ListaTotais.PagamentosUsuarios
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
