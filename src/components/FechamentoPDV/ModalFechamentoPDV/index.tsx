import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import { Button } from "primereact/button";
import { useFecharPDV } from "./hooks/useFecharPDV";
import Cookies from "js-cookie";
import { useListarPdv } from "./hooks/useListarPDV";
import { useEffect } from "react";
import SwitchComponent from "@/components/SwitchComponent";
import { MdAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";

interface ModalFecharPDVProps extends modalOpen {
  recebimentosVendasIds: string;
  pagamentosIds: string;
  totalFechamento: string;
}

export function ModalFecharPDV({
  openModal,
  totalFechamento,
  setOpenModal,
  pagamentosIds,
  recebimentosVendasIds,
}: ModalFecharPDVProps) {
  const nomeUsuario = Cookies.get("nomeUsuarioEfinance");
  const listaPDVUsuario = useListarPdv(openModal);
  const {
    FnfecharPDV,
    setObservacao,
    observacao,
    bolIncluirValorAbertura,
    setbolIncluirValorAbertura,
  } = useFecharPDV();
  function close() {
    setbolIncluirValorAbertura(false);
    setObservacao("");
    setOpenModal(false);
  }
  console.log({ listaPDVUsuario });

  useEffect(() => {
    if (openModal) {
      setbolIncluirValorAbertura(false);
      setObservacao("");
      if (listaPDVUsuario.length > 0) {
        if (listaPDVUsuario[0].statusPDV !== "ATIVO") {
          setTimeout(() => {
            setOpenModal(false);
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Abra um PDV para realizar o fechamento!",
              showConfirmButton: false,
              timer: 1700,
              customClass: {
                popup: "popUpmessage",
                container: "popUpmessage",
              },
            });
          }, 200);
        }
      } else {
        setTimeout(() => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Abra um PDV para realizar o fechamento!",
            showConfirmButton: false,
            timer: 1700,
            customClass: {
              popup: "popUpmessage",
              container: "popUpmessage",
            },
          });
          setOpenModal(false);
        }, 200);
      }
    }
  }, [openModal]);

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
        label="Fechar PDV"
        onClick={() =>
          FnfecharPDV({
            handleClose: () => close(),
            dataAbertura: listaPDVUsuario[0]?.dataAbertura,
            numeroAbertura: listaPDVUsuario[0]?.numeroAbertura,
            recebimentosVendasIds,
            pagamentosIds,
            valorAbertura: listaPDVUsuario[0]?.valorInicial,
          })
        }
        style={{
          backgroundColor: "#7c42e0",
          border: "none",
          borderRadius: "12px",
          outline: "none",
          boxShadow: "none",
          width: "140px",
        }}
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
      header="Fechamento PDV"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "40vw" }}
      onHide={close}
    >
      <main style={{ padding: "0.5rem 1.5rem" }}>
        <div className={styles.containerInputs} style={{ marginTop: "0.1rem" }}>
          <div className={styles.containerInput}>
            <label htmlFor="" className="label">
              Valor Abertura
            </label>
            <InputComponent
              value={listaPDVUsuario[0]?.numeroAbertura}
              isDisable
              type="number"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="" className="label">
              Valor Abertura
            </label>
            <InputComponent
              value={listaPDVUsuario[0]?.valorInicial}
              isDisable
              type="number"
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="" className="label">
              Usuário(PDV)
            </label>
            <InputComponent type="string" isDisable value={nomeUsuario ?? ""} />
          </div>
        </div>
        <div className={styles.containerInputs} style={{ marginTop: "0.1rem" }}>
          <div className={styles.containerInput}>
            <label htmlFor="" className="label">
              Data Referência
            </label>
            <InputComponent
              disabled
              value={
                new Date().toLocaleDateString() +
                " " +
                new Date().toLocaleTimeString()
              }
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="" className="label">
              Observação
            </label>
            <InputComponent
              onChange={(e) => setObservacao(e.target.value)}
              type="string"
              value={observacao}
            />
          </div>
        </div>

        <div
          className={styles.containerInputs}
          style={{ marginTop: "0.3rem", justifyContent: "space-between" }}
        >
          <SwitchComponent
            checked={bolIncluirValorAbertura}
            onChange={(e) => {
              if (e.target.checked) {
                setbolIncluirValorAbertura(true);
              } else {
                setbolIncluirValorAbertura(false);
              }
            }}
            label="Incluir valor de abertura"
          />
          <div className={styles.containerTotalPagoPendente}>
            <div className={styles.containerIconMoney}>
              <MdAttachMoney size={18} color="#FFF" />
            </div>
            <div>
              <div className={styles.flexCol}>
                <span
                  style={{
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalFechamento}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Dialog>
  );
}
