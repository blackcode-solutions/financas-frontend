import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import SwitchComponent from "@/components/SwitchComponent";
import Select from "react-select";
import { TableRecebimentos } from "./TableRecebimentos";
import ButtonComponent from "@/components/ButtonComponent";
import { useEffect, useState } from "react";
import { useAdicionarRecebimento } from "./hooks/useAdicionarRecebimento";
import { ModalRemover } from "./ModalRemover";
import { useAdicionarParcela } from "./hooks/useAdicionarParcela";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import Cookies from "js-cookie";
import { useEfetivarReebimento } from "./hooks/useEfetivarRecebimento";
import { ModalRecebimentoCartao } from "./ModalRecebimentoCartao";
import { useListarParcelasVendas } from "./TableRecebimentos/hooks/useListarParcelasVenda";
import { customStyles } from "@/utils/customStyleReactSelect";

// const customStyles = {
//   control: (base: any, { isFocused, isSelected }: any) => ({
//     ...base,
//     height: 35,
//     minHeight: 32,
//     borderColor: !isSelected ? "#41B06E" : base.borderColor,
//     boxShadow: !isSelected ? "#41B06E" : base.borderColor,
//     "&:hover": {
//       borderColor: "#41B06E",
//     },
//     "&:active": {
//       borderColor: "#41B06E",
//     },
//   }),
//   option: (base: any, { isFocused }: any) => ({
//     ...base,
//     backgroundColor: isFocused ? "#41B06E" : "white",
//     color: !isFocused ? "#41B06E" : "white",
//     "&:hover": {
//       backgroundColor: isFocused ? "#41B06E" : "white", // Define a cor de fundo para verde quando a opção estiver em foco
//       color: !isFocused ? "#41B06E" : "white",
//     },
//   }),
// };

const optionsFormaPagamento = [
  { value: "1", label: "Dinheiro" },
  { value: "2", label: "Cartão Débito" },
  { value: "3", label: "Cartão Crédito" },
  { value: "4", label: "Pix" },
  { value: "5", label: "Cortesia" },
];

interface ModalRecebimentosProps extends modalOpen {
  cliente: string | null;
  vendaId: string | any;
  valorTotal: number | null;
  setClearSelectedRow: () => void;
}

export function ModalRecebimentos({
  cliente,
  openModal,
  vendaId,
  setOpenModal,
  valorTotal,
  setClearSelectedRow,
}: ModalRecebimentosProps) {
  const { FnSalvarParcela } = useAdicionarParcela();
  const { FnSalvarRecebimento } = useAdicionarRecebimento();
  const [valor, setValor] = useState("0");
  const [desconto, setDesconto] = useState("0");
  const [recebimentoVendaId, setRecebimentoVendaId] = useState(0);
  const [openModalRemoverRecebiment, setOpenModalRemoverRecebimento] =
    useState(false);
  const [openModalCartao, setOpenModalCartao] = useState(false);

  const [selectedFormaPagamento, setSelectedFormaPagamento] =
    useState<any>(null);
  const { FnEfetivarRecebimento } = useEfetivarReebimento();
  const listaParcelas = useListarParcelasVendas(recebimentoVendaId);

  const totalRecebido = listaParcelas.reduce((acc: any, element: any) => {
    acc += parseFloat(element.valorParcela);
    return acc;
  }, 0);

  console.log({ totalRecebido });

  useEffect(() => {
    if (totalRecebido > 0) setValor(String(Number(valorTotal) - totalRecebido));
  }, [listaParcelas]);

  function clearInputs() {
    setDesconto("0");
    setValor("0");
    setRecebimentoVendaId(0);
  }

  useEffect(() => {
    if (valorTotal && valorTotal) setValor(String(valorTotal));
  }, [openModal]);

  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#7c42e0",border:'none',boxShadow:'none',outline:'none',background:'none'  }}
        icon="pi pi-times"
        onClick={() => {
          if (recebimentoVendaId > 0)
            return setOpenModalRemoverRecebimento(true);
          clearInputs();
          setClearSelectedRow();
          setOpenModal(false);
        }}
        className="p-button-text"
      />
      <Button
        disabled={recebimentoVendaId == 0}
        label="Efetivar"
        style={{ backgroundColor: "#7c42e0", width: "110px",border:'none',boxShadow:'none',outline:'none',borderRadius:'12px' }}
        onClick={() =>
          FnEfetivarRecebimento({
            recebimentoVendaId,
            vendaId,
            handleClose: () => {
              clearInputs();
              setOpenModal(false);
            },
          })
        }
        color="green"
        icon="pi pi-check"
        autoFocus
      />
    </div>
  );

  return (
    <>
      <ModalRecebimentoCartao
        formaPagamentoId={selectedFormaPagamento?.value}
        recebimentoVendaId={recebimentoVendaId}
        openModal={openModalCartao}
        setOpenModal={setOpenModalCartao}
        vendaId={vendaId}
        valorPagar={valor}
        valorTotal={valorTotal || 0}
        desconto={desconto}
      />
      <ModalRemover
        openModal={openModalRemoverRecebiment}
        recebimentoVendaId={recebimentoVendaId}
        setOpenModal={setOpenModalRemoverRecebimento}
        closeAllModal={() => {
          clearInputs();
          setOpenModal(false);
        }}
        vendaId={vendaId}
      />
      <Dialog
        footer={footerContent}
        modal
        header="Recebimentos"
        draggable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        visible={openModal}
        onHide={() => {
          if (recebimentoVendaId > 0)
            return setOpenModalRemoverRecebimento(true);
          setOpenModal(false);
        }}
        closable={false}
        focusOnShow={false}
      >
        <main style={{display:'flex', flexDirection:'column', gap:'.5rem'}}>
          <fieldset className="fieldsetContainer">
            <div className={styles.containerInputs}>
              <div
                className={styles.containerInput}
                style={{
                  width: "130px",
                  opacity: `0.6`,
                  pointerEvents: `none`,
                }}
              >
                <label htmlFor="" className="label">
                  Data Receb.
                </label>
                <InputComponent
                  value={new Date().toLocaleDateString()}
                  isDisable
                />
              </div>
              <div
                className={styles.containerInput}
                style={{
                  width: "160px",
                  opacity: `0.6`,
                  pointerEvents: `none`,
                }}
              >
                <label htmlFor="" className="label">
                  Usuário(PDV)
                </label>
                <InputComponent
                  isDisable
                  value={Cookies.get("nomeUsuarioEfinance")}
                />
              </div>
              <div
                className={styles.containerInput}
                style={{
                  width: "360px",
                  opacity: `0.6`,
                  pointerEvents: `none`,
                }}
              >
                <label htmlFor="" className="label">
                  Cliente
                </label>
                <InputComponent value={cliente || ""} />
              </div>
              <div
                className={styles.containerInput}
                style={{
                  width: "200px",
                  opacity: `0.6`,
                  pointerEvents: `none`,
                }}
              >
                <label htmlFor="" className="label">
                  Total
                </label>
                <InputComponent
                  value={formatarDinheiro(valorTotal || 0) || "R$ 0,00"}
                />
              </div>

              <div style={{ marginTop: "1.4rem" }}>
                <ButtonComponent
                  isDisable={recebimentoVendaId > 0}
                  onClick={() => {
                    FnSalvarRecebimento({ vendaId, setRecebimentoVendaId });
                  }}
                  style={{ width: "100px", height: "37px" }}
                >
                  Gravar
                </ButtonComponent>
              </div>
            </div>
          </fieldset>
          <fieldset
            className="fieldsetContainer"
            style={
              {
                opacity: `${recebimentoVendaId == 0 ? "0.6" : "1"}`,
                pointerEvents: `${recebimentoVendaId == 0 ? "none" : "auto"}`,
              }
            }
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className={styles.containerInputs}>
                <div
                  className={styles.containerInput}
                  style={{ width: "280px" }}
                >
                  <label htmlFor="" className="label">
                    Forma de Pagamento
                  </label>
                  <Select
                    placeholder=""
                    onChange={(value: any, { action }) => {
                      if (!value || value.value.length === 0) return;
                      setSelectedFormaPagamento(value);
                    }}
                    styles={customStyles}
                    options={optionsFormaPagamento}
                  />
                </div>

                <div
                  className={styles.containerInput}
                  style={{ width: "150px" }}
                >
                  <label htmlFor="" className="label">
                    Valor
                  </label>
                  <InputComponent
                    defaultValue={valorTotal || 0}
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>
                <div
                  className={styles.containerInput}
                  style={{ width: "150px" }}
                >
                  <label htmlFor="" className="label">
                    Desconto
                  </label>
                  <InputComponent
                    value={desconto}
                    onChange={(e) => setDesconto(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: "1.4rem" }}>
                  <ButtonComponent
                    onClick={() => {
                      if (
                        selectedFormaPagamento?.value == "2" ||
                        selectedFormaPagamento?.value == "3"
                      ) {
                        return setOpenModalCartao(true);
                      }
                      FnSalvarParcela({
                        vendaId,
                        valorParcela: valor,
                        valorDesconto: desconto,
                        formaPagamentoId: selectedFormaPagamento?.value,
                        recebimentoVendaId,
                        valorTotal: valorTotal || 0,
                      });
                    }}
                    style={{ width: "100px", height: "37px" }}
                  >
                    Gravar
                  </ButtonComponent>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.3rem",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className={styles.containerTotal}
                    style={{
                      // border: "1px solid #2e7d32",
                      backgroundColor: "#c8f7c8",
                      color: "#2e7d32",
                    }}
                  >
                    <p>Total Recebido </p>
                    <span>{formatarDinheiro(totalRecebido)}</span>
                  </div>
                  <div
                    className={styles.containerTotal}
                    style={{
                      // border: "1px solid #c62828",
                      backgroundColor: "#ffd0d0",
                      color: "#c62828",
                    }}
                  >
                    <p>Total Restante</p>
                    <span>
                      {formatarDinheiro(Number(valorTotal) - totalRecebido)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <div
            style={{
              opacity: `${recebimentoVendaId == 0 ? "0.6" : "1"}`,
              pointerEvents: `${recebimentoVendaId == 0 ? "none" : "auto"}`,
            }}
          >
            <TableRecebimentos listaParcelas={listaParcelas} />
          </div>
        </main>
      </Dialog>
    </>
  );
}
