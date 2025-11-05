import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import { Button } from "primereact/button";
import { useAdicionarPDV } from "./hooks/useAdionarPDV";
import Cookies from "js-cookie";
import { useListarPdv } from "./hooks/useListarPDV";
import { useEffect, useState } from "react";
interface ModalAbrirPDVProps extends modalOpen {}

export function ModalAbrirPDV({ openModal, setOpenModal }: ModalAbrirPDVProps) {
  const nomeUsuario = Cookies.get("nomeUsuarioEfinance");
  const { loading, pdv } = useListarPdv(openModal);
  const [dataAbertura, setDataAbertura] = useState("");
  const {
    FnCriarPDV,
    valorInicial,
    setValorInicial,
    numeroAbertura,
    setNumeroAbertura,
  } = useAdicionarPDV();
  function close() {
    setValorInicial("0");
    setNumeroAbertura("0");
    setOpenModal(false);
  }

  useEffect(() => {
    if (openModal && !loading) {
      console.log({ merda: pdv });
      setTimeout(() => {
        if (pdv.length > 0) {
          console.log(pdv);
          setNumeroAbertura(pdv[0].numeroAbertura);
          setValorInicial(pdv[0].valorInicial);
          setDataAbertura(pdv[0].dataAbertura);
        } else {
          setNumeroAbertura("0");
          setValorInicial("0");
          setDataAbertura(
            new Date().toLocaleDateString("pt-BR") +
              " " +
              new Date().toLocaleTimeString("pt-BR")
          );
        }
      }, 200);
    }

    setTimeout(() => {
      document.getElementById("valor-inicial")?.focus();
    }, 500);

  }, [openModal, loading]);

  const footerContent = (
    <div>
      <Button
        label="Sair"
        style={{ color: "#7c42e0",background:'none',border:'none',boxShadow:'none' }}
        icon="pi pi-times"
        onClick={close}
        className="p-button-text"
      
      />
      <Button
        label="Salvar"
        onClick={() => FnCriarPDV(close)}
        style={{ backgroundColor: "#7c42e0", borderRadius:'12px',boxShadow:'none',border:'none' }}
        color="green"
        icon="pi pi-check"
        autoFocus
      />
    </div>
  );

  const [visible,setVisible] = useState(false)
  return (
    <Dialog
      footer={footerContent}
      modal
      header="Abertura de PDV"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw",}}
      onHide={close}
      closable={false}
    >
      <main className={styles.container}>
          <div className={styles.containerInputs}>
            <div className={styles.containerInput}>
              <label htmlFor="" className="label">
                N° Abertura
              </label>
              <InputComponent value={numeroAbertura} isDisable type="number" />
            </div>
            <div className={styles.containerInput}>
              <label htmlFor="" className="label">
                Data Abertura
              </label>
              <InputComponent isDisable value={dataAbertura} />
            </div>
          </div>
          <div className={styles.containerInputs}>
            <div className={styles.containerInput}>
              <label htmlFor="" className="label">
                Usuário(PDV)
              </label>
              <InputComponent
                type="string"
                isDisable
                value={nomeUsuario ?? ""}
              />
            </div>
            <div className={styles.containerInput}>
              <label  htmlFor="" className="label">
                Valor Inicial
              </label>
              <InputComponent
              id="valor-inicial"
                type="number"
                value={valorInicial}
                onChange={(e) => setValorInicial(e.target.value)}
              />
            </div>
          </div>
      </main>
    </Dialog>
  );
}
