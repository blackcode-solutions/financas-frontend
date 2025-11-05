import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import { Button } from "primereact/button";
import SwitchComponent from "@/components/SwitchComponent";
import { useRef, useState } from "react";
import { useGerarImpressaoRecebimentos } from "./hooks/useGerarImpressaoRecebimentos";
import PrintRecebimentos from "../PrintPDV";
import { useReactToPrint } from "react-to-print";

interface ModalImpressaoPDVProps extends modalOpen {
  fechamentoPDVUsuarioId: number;
  ListaTotais: any;
}

export function ModalImpressaoPDV({
  openModal,
  fechamentoPDVUsuarioId,
  setOpenModal,
  ListaTotais,
}: ModalImpressaoPDVProps) {
  const impressaoRef = useRef<any>(null);
  const [listaRecebimentos, setListaRecebimentos] = useState<any>(null);
  const [listaPagamentos, setListaPagamentos] = useState<any>(null);
  const [totais, settotais] = useState<any>(null);
  const { FnGerarImpressaoRecebimentos } = useGerarImpressaoRecebimentos();
  const [bolRecebimentos, setbolRecebimentos] = useState(true);
  const [bolPagamentos, setbolPagamentos] = useState(true);
  const [quebra, setQuebra] = useState("");
  const [agrupamento, setAgrupamento] = useState("");

  const handlePrint = useReactToPrint({
    content: () => impressaoRef?.current,
    documentTitle: `Impressão Fechamento PDV`,
    onAfterPrint() {
      settotais(null);
      setListaPagamentos(null);
      setListaRecebimentos(null);
    },
  });

  function close() {
    setAgrupamento("none");
    setListaRecebimentos(null);
    setListaPagamentos(null);
    settotais(null);
    setQuebra("");
    setbolRecebimentos(true);
    setbolPagamentos(true);
    setOpenModal(false);
  }

  const footerContent = (
    <div>
      <Button
        label="Sair"
        style={{
          color: "#7c42e0",
          outline: "none",
          boxShadow: "none",
          background: "none",
        }}
        icon="pi pi-times"
        onClick={close}
        className="p-button-text"
      />
      <Button
        label="Imprimir"
        // rounded
        onClick={async () => {
          const result = await FnGerarImpressaoRecebimentos({
            bolRecebimentos,
            quebra,
            agrupamento,
            bolPagamentos,
            fechamentoPDVUsuarioId,
          });
          const pagamentos = result.pagamentos ?? [];
          const recebimentos = result.recebimentos ?? [];
          const totais = result.totais ?? {
            valorSomaParcelas: 0,
            valorTotal: 0,
            valorTotalDesconto: 0,
          };
          setListaRecebimentos(recebimentos);
          setListaPagamentos(pagamentos);
          settotais(totais);
          setTimeout(() => {
            handlePrint();
          }, 1000);
        }}
        style={{
          backgroundColor: "#7c42e0",
          border: "none",
          borderRadius: "12px",
          outline: "none",
          boxShadow: "none",
        }}
        color="green"
        icon="pi pi-check"
        autoFocus
      />
    </div>
  );

  return (
    <>
      <div style={{ display: "none" }}>
        <PrintRecebimentos
          recebimentos={listaRecebimentos}
          pagamentos={listaPagamentos}
          impressaoRef={impressaoRef}
          startPrint={true}
          totais={totais}
          ListaTotais={ListaTotais}
        />
      </div>
      <Dialog
        footer={footerContent}
        modal
        header="Impressão do Fechamento "
        draggable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        visible={openModal}
        style={{ width: "28vw" }}
        onHide={close}
        closable={false}
      >
        <main style={{ padding: "1rem 1.5rem" }}>
          <fieldset
            className="fieldsetContainer"
            style={{ marginTop: "0.5rem" }}
          >
            <legend className="fieldsetTitle">Imprimir</legend>
            <div>
              <div
                className={styles.containerInputs}
                style={{ marginTop: "0.3rem", justifyContent: "space-between" }}
              >
                <SwitchComponent
                  checked={bolRecebimentos}
                  onChange={(e) => setbolRecebimentos(e.target.checked)}
                  label="Recebimentos"
                />
                <SwitchComponent
                  label="Pagamentos"
                  checked={bolPagamentos}
                  onChange={(e) => setbolPagamentos(e.target.checked)}
                />
              </div>
            </div>
          </fieldset>
          <fieldset
            className="fieldsetContainer"
            style={{ marginTop: "0.5rem" }}
          >
            <legend className="fieldsetTitle">Quebra</legend>
            <div>
              <div
                className={styles.containerInputs}
                style={{ marginTop: "0.3rem", justifyContent: "space-between" }}
              >
                <SwitchComponent
                  type="radio"
                  name="quebraInput"
                  value={""}
                  checked={quebra === ""}
                  onChange={(e) => {
                    if (e.target.checked) setQuebra("");
                  }}
                  label="Sem quebra"
                />
                <SwitchComponent
                  name="quebraInput"
                  value={"usuario"}
                  checked={quebra === "usuario"}
                  onChange={(e) => {
                    if (e.target.checked) setQuebra("usuario");
                  }}
                  label="Por usuário"
                />
              </div>
            </div>
          </fieldset>
          <fieldset
            className="fieldsetContainer"
            style={{ marginTop: "0.5rem" }}
          >
            <legend className="fieldsetTitle">Agrupamento</legend>
            <div>
              <div
                className={styles.containerInputs}
                style={{ marginTop: "0.3rem", justifyContent: "space-between" }}
              >
                <SwitchComponent
                  name="agrupamentoInput"
                  value={"none"}
                  checked={agrupamento === "none"}
                  onChange={(e) => {
                    if (e.target.checked) setAgrupamento("none");
                  }}
                  label="Sem agrupamento"
                />
                <SwitchComponent
                  name="agrupamentoInput"
                  value={"formapagamento"}
                  checked={agrupamento === "formapagamento"}
                  onChange={(e) => {
                    if (e.target.checked) setAgrupamento("formapagamento");
                  }}
                  label="Forma pagamento"
                />
              </div>
            </div>
          </fieldset>
        </main>
      </Dialog>
    </>
  );
}
