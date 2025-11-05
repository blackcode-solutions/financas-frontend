import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import { TableListaParcelasDetalhes } from "./TableListaParcelas";
import { Button } from "primereact/button";
import { TableListaPagamentos } from "./TableListaPagamentos";
import { useListarDetalhes } from "../hooks/useListarDetalhes";

interface ModalDetalhesRecebimentosProps extends modalOpen {
  fechamentoPDVUsuarioId: number;
}

export function ModalDetalhesRecebimentos({
  openModal,
  setOpenModal,
  fechamentoPDVUsuarioId,
}: ModalDetalhesRecebimentosProps) {
  const listaDetalhes = useListarDetalhes(fechamentoPDVUsuarioId);

  const footerContent = (
    <div>
      <Button
        label="Sair"
        style={{ color: "#7c42e0",outline: "none",boxShadow: "none",background:'none' }}
        icon="pi pi-times"
        onClick={() => setOpenModal(false)}
        className="p-button-text"
      />

    </div>
  );

  return (
    <>
      <Dialog
        modal
        footer={footerContent}
        header="Detalhes"
        draggable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        visible={openModal}
        style={{
          width: "85vw",
          height: "97vh",
          minHeight: "97vh",
          overflow: "hidden",
        }}
        closable={false}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
          <TableListaParcelasDetalhes
            listaRecebimentos={
              listaDetalhes.resultadosParcelas.length > 0
                ? listaDetalhes.resultadosParcelas
                : []
            }
          />
          <TableListaPagamentos
            listaPagamentos={
              listaDetalhes.resultadosPagamentos.length > 0
                ? listaDetalhes.resultadosPagamentos
                : []
            }
          />
        </div>
      </Dialog>
    </>
  );
}
