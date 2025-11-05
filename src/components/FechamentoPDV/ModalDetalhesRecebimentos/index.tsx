import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import { TableListaParcelasDetalhes } from "./TableListaParcelas";
import { Button } from "primereact/button";

interface ModalDetalhesRecebimentosProps extends modalOpen {
  recebimentoVendaId: number;
}

export function ModalDetalhesRecebimentos({
  openModal,
  recebimentoVendaId,
  setOpenModal,
}: ModalDetalhesRecebimentosProps) {
  const footerContent = (
    <div>
      <Button
        label="Sair"
        style={{ color: "#7c42e0",background:'none',outline:'none',border:'none',boxShadow:'none' }}
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
        header="Detalhes Recebimentos"
        draggable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        visible={openModal}
        style={{ width: "70vw" }}
        closable={false}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <div>
          <TableListaParcelasDetalhes recebimentoVendaId={recebimentoVendaId} />
        </div>
      </Dialog>
    </>
  );
}
