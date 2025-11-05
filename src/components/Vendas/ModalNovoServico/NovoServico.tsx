import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import { Button } from "primereact/button";
import ButtonComponent from "@/components/ButtonComponent";
import { useRef, useState } from "react";
import { useListarClientes } from "./hooks/useListarClientes";
import { useListarProdutos } from "./hooks/useListarProdutos";
import { useGravarVenda } from "./hooks/useGravarVenda";
import { useListarPdv } from "./hooks/useListarPDV";
import Cookies from "js-cookie";
import { useGravarProdutoVendas } from "./hooks/useGravarProdutoVenda";
import SwitchComponent from "@/components/SwitchComponent";
import { ModalLerCodigoBarras } from "./ModalLerCodigoBarras";
import { IoMdBarcode } from "react-icons/io";
import { Tooltip } from "primereact/tooltip";
import Select from "react-select";
import { useListarServicos } from "./hooks/useListarServicos";
import { useGravarServico } from "./hooks/useGravarServico";
import { TableServicos } from "./TableServicos/TabelaServicos";
import { useListarUsuarios } from "@/components/DetalhesUsuario/CadastroUsuarios/hooks/useListarUsuarios";
import { customStyles } from "@/utils/customStyleReactSelect";

// const customStyles = {
//   control: (base: any, { isFocused, isSelected }: any) => ({
//     ...base,
//     height: 35,
//     minHeight: 35,
//     borderColor: !isSelected ? "#41B06E" : base.borderColor,
//     boxShadow: !isSelected ? "#41B06E" : base.borderColor,
//     zIndex: 99999,
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
//     zIndex: 99999,
//     "&:hover": {
//       backgroundColor: isFocused ? "#41B06E" : "white", // Define a cor de fundo para verde quando a opção estiver em foco
//       color: !isFocused ? "#41B06E" : "white",
//     },
//   }),
//   menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
// };

type FormData = {
  vendaId: number;
  dataVenda: string;
  usuarioId: number;
  clienteId: number;
  cliente: string;
  numeroAbertura: number;
  statusVenda: string;
  cidade: string;
};

interface ModalNovasVendasProps extends modalOpen {
  selectedRow: FormData | null;
}

export function ModalNovoServico({
  openModal,
  selectedRow,
  setOpenModal,
}: ModalNovasVendasProps) {
  const { FnSalvarProdutosVendas } = useGravarProdutoVendas();
  const { FnSalvarServicoVendas } = useGravarServico();
  const { FnSalvarVendas, vendaId, setVendaId } = useGravarVenda();
  const {
    clientSelect,
    optionsClientes,
    setSelectedClient,
    selectedClient,
    handleInputChange,
  } = useListarClientes(openModal);
  const listaPDV = useListarPdv({
    openModal,
    selectedRow,
    setOpenModal,
    setVendaId,
  });
  const barbeiroSelectRef = useRef<any>(null);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<any | null>(null);

  const [bolProdutoAvulso, setbolProdutoAvulso] = useState(false);
  const [bolServicoAvulso, setbolServicoAvulso] = useState(false);
  const [nomeProdutoAvulso, setNomeProdutoAvulso] = useState("");
  const [nomeServicoAvulso, setNomeServicoAvulso] = useState("");

  const {
    produtoSelect,
    optionsProdutos,
    selectedProduto,
    setSelectedProduto,
    handleInputChangeProduto,
    isLoadingProduto,
  } = useListarProdutos(openModal);

  const {
    handleInputChangeServico,
    isLoadingServico,
    optionsServicos,
    selectedServico,
    servicoSelect,
    setSelectedServico,
  } = useListarServicos(openModal);

  console.log({ selectedServico });

  console.log({
    optionsServicos,
  });

  const [valor, setValor] = useState("0");
  const [valorServico, setValorServico] = useState("0");
  const [quantidade, setQuantidade] = useState(1);
  const [valorTotal, setValorTotal] = useState("0");
  const [openModalbarCode, setopenModalbarCode] = useState(false);

  const footerContent = (
    <div>
      <Button
        label="Sair"
        onClick={() => {
          setValor("");
          setValorServico("");
          setVendaId(0);
          setNomeProdutoAvulso("");
          setNomeServicoAvulso("");
          setbolProdutoAvulso(false);
          setValorTotal("0");
          setQuantidade(1);
          setOpenModal(false);
        }}
        style={{
          backgroundColor: "#c62828",
          width: "110px",
          border: "none",
          borderRadius: "12px",
          outline: "none",
          boxShadow: "none",
          height: "38px",
        }}
        color="green"
        icon="pi pi-check"
        autoFocus
      />
    </div>
  );

  const listaBarbeiros = useListarUsuarios();
  const optionsBarbeiros = listaBarbeiros.map((option: any) => ({
    value: option.usuarioId,
    label: option.username,
    // valor: option.porcentagem,
  }));

  return (
    <>
      {openModalbarCode && (
        <ModalLerCodigoBarras
          openModal={openModalbarCode}
          setOpenModal={setopenModalbarCode}
          vendaId={vendaId}
        />
      )}

      <Dialog
        footer={footerContent}
        modal
        header="Novo Serviço"
        draggable={false}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        visible={openModal}
        onHide={() => {
          setValor("");
          setValorServico("");
          setValorTotal("0");
          setQuantidade(1);
          setNomeProdutoAvulso("");
          setNomeServicoAvulso("");
          setbolProdutoAvulso(false);
          setVendaId(0);
          setOpenModal(false);
        }}
        style={{ padding: 0 }}
        closable={false}
      >
        <main
          style={{
            width: "60vw",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <fieldset
            className="fieldsetContainer"
            style={{
              marginBottom: "0.3rem",
              opacity: `${vendaId > 0 ? "0.6" : "1"}`,
              pointerEvents: `${vendaId > 0 ? "none" : "visible"}`,
            }}
          >
            <legend className="fieldsetTitle">Serviço</legend>
            <div className={styles.containerInputs}>
              <div className={styles.containerInput} style={{ width: "170px" }}>
                <label htmlFor="" className="label">
                  Data Venda.
                </label>
                <InputComponent
                  value={
                    new Date().toLocaleDateString() +
                    " " +
                    new Date().toLocaleTimeString()
                  }
                  isDisable
                />
              </div>
              <div className={styles.containerInput} style={{ width: "180px" }}>
                <label htmlFor="" className="label">
                  Usuário(PDV)
                </label>
                <InputComponent
                  isDisable
                  value={
                    Cookies.get("nomeUsuarioEfinance") +
                      "/" +
                      listaPDV[0]?.numeroAbertura || ""
                  }
                />
              </div>
              <div className={styles.containerInput} style={{ width: "60%" }}>
                <label htmlFor="" className="label">
                  Cliente
                </label>
                <Select
                  placeholder=""
                  ref={clientSelect}
                  isClearable={true}
                  defaultInputValue={
                    selectedRow?.clienteId ? String(selectedRow?.cliente) : ""
                  }
                  onChange={(value: any) => setSelectedClient(value)}
                  onInputChange={handleInputChange}
                  noOptionsMessage={() => "Digite o nome do cliente"}
                  styles={customStyles}
                  options={optionsClientes}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <ButtonComponent
                  isDisable={!listaPDV[0]?.numeroAbertura}
                  onClick={() => {
                    console.log(selectedClient);
                    FnSalvarVendas({
                      clienteId: selectedClient
                        ? (selectedClient as any).value
                        : 0,
                      numeroAbertura: listaPDV[0]?.numeroAbertura,
                    });
                  }}
                  style={{ width: "100px", height: "38px" }}
                >
                  Salvar
                </ButtonComponent>
              </div>
            </div>
          </fieldset>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <fieldset
              className="fieldsetContainer"
              style={{
                opacity: `${vendaId == 0 ? "0.6" : "1"}`,
                pointerEvents: `${vendaId == 0 ? "none" : "visible"}`,
              }}
            >
              <legend className="fieldsetTitle">Serviço</legend>
              <div className={styles.containerInputs}>
                <div
                  className={styles.containerInput}
                  style={{ width: "300px" }}
                >
                  <label
                    htmlFor=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.9rem",
                    }}
                    className="label"
                  >
                    Serviço
                    <SwitchComponent
                      checked={bolServicoAvulso}
                      font={"lighter"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setbolServicoAvulso(true);
                        } else {
                          setNomeServicoAvulso("");
                          setbolServicoAvulso(false);
                        }
                      }}
                      label="Avulso"
                    />
                    <Tooltip target=".custom-target-icon" />
                    <i
                      className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
                      data-pr-tooltip="Ler código de Barras"
                      data-pr-position="right"
                      data-pr-at="right+5 top"
                      data-pr-my="left center-2"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <IoMdBarcode
                          size={16}
                          onClick={() => setopenModalbarCode(true)}
                        />
                      </span>
                    </i>
                  </label>
                  {bolServicoAvulso ? (
                    <InputComponent
                      value={nomeServicoAvulso}
                      onChange={(e) => {
                        setNomeServicoAvulso(e.target.value);
                      }}
                    />
                  ) : (
                    <Select
                      placeholder=""
                      ref={servicoSelect}
                      isClearable={true}
                      isLoading={isLoadingServico}
                      onChange={(value: any) => {
                        if (!value || value.value.length === 0) return;
                        if (value.valor) {
                          // setQuantidade(1);
                          // setValorTotal(formatarDinheiro(value.valor));
                          setValorServico(value.valor);
                        }
                        setSelectedServico(value.value);
                      }}
                      onInputChange={handleInputChangeServico}
                      noOptionsMessage={() => "Digite o nome do produto"}
                      styles={customStyles}
                      options={optionsServicos}
                    />
                  )}
                </div>
                <div
                  className={styles.containerInput}
                  style={{ width: "100px" }}
                >
                  <label htmlFor="" className="label">
                    Valor
                  </label>
                  <InputComponent
                    onBlur={(e) => {
                      // setValorTotal(
                      //   formatarDinheiro(
                      //     Number(e.target.value) * Number(quantidade)
                      //   )
                      // );
                    }}
                    isDisable={true}
                    value={valorServico}
                    onChange={(e) => setValorServico(e.target.value)}
                  />
                </div>
                <div
                  className={styles.containerInput}
                  style={{ width: "275px" }}
                >
                  <label htmlFor="" className="label">
                    Barbeiro
                  </label>
                  <Select
                    placeholder=""
                    ref={barbeiroSelectRef}
                    isClearable={true}
                    onChange={(value: any) => {
                      setSelectedBarbeiro(value.value);
                    }}
                    noOptionsMessage={() => "Digite o nome do barbeiro"}
                    styles={customStyles}
                    options={optionsBarbeiros}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <ButtonComponent
                    onClick={() => {
                      FnSalvarServicoVendas({
                        servicoVendaId: "",
                        // servicoVendaId:selectedServico,
                        servicoId: selectedServico,
                        valor: valorServico,
                        vendaId,
                        numeroAbertura: listaPDV[0]?.numeroAbertura,
                        profissionalId: selectedBarbeiro,
                      });
                    }}
                    style={{ width: "100px", height: "38px" }}
                  >
                    Salvar
                  </ButtonComponent>
                </div>
              </div>
            </fieldset>

            <div
              style={{
                opacity: `${vendaId == 0 ? "0.6" : "1"}`,
                pointerEvents: `${vendaId == 0 ? "none" : "visible"}`,
                width: "100%",
              }}
            >
              <TableServicos vendaId={vendaId} />
            </div>
          </div>
        </main>
      </Dialog>
    </>
  );
}
