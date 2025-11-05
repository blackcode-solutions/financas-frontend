import styles from "./PrintFatura.module.scss";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { useListarEmpresaImpressao } from "./hooks/useListarEmpresaImpressao";
import Image from "next/image";
import { MdAttachMoney } from "react-icons/md";

const PrintRecebimentos = ({
  printRecebimentos = true,
  printDetalhe = true,
  impressaoRef,
  printPagamento = true,
  recebimentos,
  pagamentos,
  totais,
  ListaTotais,
}: any) => {
  let nomesProfissionais: any = [];
  let nomesUsuarios: any = [];
  let arrayPagamentos: any = [];

  const formatarDinheiro = (valor: any) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const renderRecebimentos = (recebimentos: any) => {
    const linhas: any = [];

    // Helper function to render a row
    const renderRow = (data: any, index: any) => (
      <tr key={index}>
        <td className={styles.textLeft}>{data.dataRecebimento}</td>
        <td className={styles.textLeft}>{data.dataVenda}</td>
        <td className={styles.textLeft}>{data.formaPagamento}</td>
        <td className={styles.textLeft} style={{ width: "150px" }}>
          {data.cliente}
        </td>
        <td className={styles.textLeft}>{data.username}</td>
        <td className={styles.textLeft}>
          {formatarDinheiro(data.valorDesconto)}
        </td>
        <td className={styles.textLeft}>
          {data.valorParcela ? formatarDinheiro(data.valorParcela) : "0,00"}
        </td>
        <td className={styles.textLeft}>
          {formatarDinheiro(
            parseFloat(data.valorParcela || data.valorTotal) -
              parseFloat(data.valorDesconto)
          )}
        </td>
      </tr>
    );

    // Function to handle recebimentos with/without grouping or breaks
    const processRecebimentos = (recebimentos: any) => {
      if (Array.isArray(recebimentos)) {
        // No grouping or breaking
        recebimentos.forEach((item, index) => {
          linhas.push(renderRow(item, index));
        });
      } else {
        // With grouping or breaking
        Object.keys(recebimentos).forEach((key, index) => {
          const grupo = recebimentos[key];
          // Add a row indicating the break (e.g., by username)
          linhas.push(
            <tr key={index}>
              <td
                colSpan={11}
                style={{
                  backgroundColor: "#efefef",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
                className={styles.textLeft}
              >
                {key}
              </td>
            </tr>
          );
          // Render each item in the group
          grupo.forEach((item: any, index: any) => {
            linhas.push(renderRow(item, index));
          });
        });
      }
    };
    // Process recebimentos
    if (recebimentos) {
      processRecebimentos(recebimentos);
    }
    console.log(linhas);

    return linhas;
  };

  const renderPagamentos = (pagamentos: any) => {
    const linhas: any = [];

    // Helper function to render a row
    const renderRow = (data: any, index: any) => (
      <tr key={index}>
        <td className={styles.textLeft}>{data.dataPagamento}</td>
        <td className={styles.textLeft}>{data.dataVencimento}</td>
        <td className={styles.textLeft}>{data.competencia}</td>
        {/* <td className={styles.textLeft}>
          {data.dataEmissao}
        </td> */}
        <td className={styles.textLeft} style={{ width: "300px" }}>
          {data.descricao}
        </td>
        <td className={styles.textLeft}>{formatarDinheiro(data.valor)}</td>
        <td className={styles.textLeft}></td>
        <td className={styles.textLeft}></td>
        <td className={styles.textLeft}></td>
        <td className={styles.textLeft}></td>
      </tr>
    );

    // Function to handle recebimentos with/without grouping or breaks
    const processRecebimentos = (pagamentos: any) => {
      if (Array.isArray(pagamentos)) {
        // No grouping or breaking
        pagamentos.forEach((item, index) => {
          linhas.push(renderRow(item, index));
        });
      }
    };
    // Process recebimentos
    if (pagamentos) {
      processRecebimentos(pagamentos);
    }

    return linhas;
  };

  let logoEmpresaBase64 = null;
  const dataEmpresa: any = useListarEmpresaImpressao();
  const informacoesEmpresa = dataEmpresa ? dataEmpresa : null;
  return (
    <>
      <style type="text/css" media="print">
        {`@page { size: portrait !important; `}
      </style>
      <div ref={impressaoRef} className={styles.container}>
        <table style={{ width: "100%" }}>
          <tfoot className={styles.headerSpace}></tfoot>
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              <div className={styles.logo}>
                {logoEmpresaBase64 ? (
                  <img alt="logo" style={{ height: "50px" }} />
                ) : (
                  // <div
                  //   style={{
                  //     padding: '40px',
                  //     textAlign: 'center',
                  //     border: '1px solid #333',
                  //   }}
                  // >aaaa</div>
                  <Image
                    src={"/loginImage.png"}
                    alt="Software de controle de finanças"
                    height={50}
                    width={100}
                    // className={styles.Image}
                  />
                )}
              </div>
              <div className={styles.infoEmpresa}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  {/* <ApartmentIcon fontSize="small" />  */}
                  {informacoesEmpresa?.nomeFantasia}
                </span>
                <span
                  style={{ fontWeight: "700" }}
                >{`${informacoesEmpresa?.endereco}, ${informacoesEmpresa?.cidade} - ${informacoesEmpresa?.estado}`}</span>
                <span style={{ fontWeight: "700" }}>
                  {/* {`${informacoesEmpresa?.strCidade} - ${informacoesEmpresa?.strEstado}`}{' '} */}
                  CNPJ: {`${informacoesEmpresa?.cnpj}`}
                </span>
                <span style={{ fontWeight: "700" }}>Fechamento PDV</span>
              </div>
            </div>
            <div className={styles.headerRight}>
              {/* <span>Página 1</span> */}
              <span>
                Emissão : {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "0px",
                  display: "flex",
                  marginRight: "3rem",
                }}
              >
                <span style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
                  Data de Referência :{" "}
                  <span style={{ fontWeight: "lighter" }}>
                    {new Date().toLocaleDateString()}
                  </span>{" "}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.procedimentosContainer}>
            <div className={styles.procedimentos}>
              <div
                style={{ display: `${printRecebimentos ? "block" : "none"}` }}
              >
                <div className={styles.titleProcedimentos}>Recebimentos</div>
                <table className={styles.tableProc}>
                  <>
                    {/* <div
                          style={{
                            width: '100%',
                            backgroundColor: '#efefef',
                            padding: '0.3rem',
                          }}
                        >
                          <span style={{ fontWeight: 'bold' }}>
                            Profissional:{' '}
                          </span>{' '}
                          <span></span>
                        </div> */}
                    <tr style={{ backgroundColor: "#efefef" }}>
                      {/* <th
                          className={styles.textLeft}
                          style={{ fontWeight: "bold", overflow: "inherit" }}
                        >
                          Profissional: {"aaaaa" || ""}
                        </th> */}
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                      <th className={styles.textLeft}></th>
                    </tr>
                    <tr className={styles.tableHeader}>
                      <th className={styles.textLeft}>Data Recebimento</th>
                      <th className={styles.textLeft}>Data Venda</th>
                      <th className={styles.textLeft}>Forma Pagamento</th>
                      <th className={styles.textLeft}>Cliente</th>
                      <th className={styles.textLeft}>Usuário</th>
                      <th className={styles.textLeft}>Desconto</th>
                      <th className={styles.textLeft}>Parcela</th>
                      <th className={styles.textLeft}>Valor Total</th>
                    </tr>

                    {/* map dos valores */}
                    {renderRecebimentos(recebimentos)}
                    <tr>
                      <td className={styles.textLeft}></td>
                      <td className={styles.textLeft}></td>
                      <td className={styles.textLeft}></td>
                      <td className={styles.textLeft}></td>
                      <td
                        className={styles.textLeft}
                        style={{
                          fontWeight: "700",
                          borderTop: "solid thin #949494",
                        }}
                      >
                        <span>Vlr. Total:</span>
                      </td>
                      <td
                        className={styles.textLeft}
                        style={{ borderTop: "solid thin #949494" }}
                      >
                        <span>
                          {formatarDinheiro(totais?.valorTotalDesconto || 0)}
                          {/* {formatarDinheiro(totalSemDesconto)} */}
                        </span>
                      </td>
                      <td
                        className={styles.textLeft}
                        style={{ borderTop: "solid thin #949494" }}
                      >
                        <span>
                          {formatarDinheiro(totais?.valorSomaParcelas || 0)}
                        </span>
                      </td>
                      <td
                        className={styles.textLeft}
                        style={{ borderTop: "solid thin #949494" }}
                      >
                        {formatarDinheiro(totais?.valorTotal || 0)}
                      </td>
                      <td
                        className={styles.textLeft}
                        style={{ borderTop: "solid thin #949494" }}
                      ></td>
                    </tr>
                    <tr className={styles.footerSpace}>&nbsp;</tr>
                  </>
                </table>
              </div>

              <div style={{ display: `${printPagamento ? "block" : "none"}` }}>
                <div className={styles.titleProcedimentos}>Pagamentos</div>
                <table className={styles.tableProc}>
                  <tr className={styles.tableHeader}>
                    <th
                      className={styles.textLeft}
                      style={{ width: "100px", minWidth: "100px" }}
                    >
                      Dat. Pagamento
                    </th>
                    <th
                      className={styles.textLeft}
                      style={{ width: "100px", minWidth: "100px" }}
                    >
                      Dat. vencimento
                    </th>
                    <th
                      className={styles.textLeft}
                      style={{ width: "100px", minWidth: "100px" }}
                    >
                      Competência
                    </th>
                    {/* <th className={styles.textLeft}>Dat. Emissão</th> */}
                    <th
                      className={styles.textLeft}
                      style={{ width: "300px", minWidth: "330px" }}
                    >
                      Descrição
                    </th>
                    <th
                      className={styles.textLeft}
                      style={{ width: "100px", minWidth: "100px" }}
                    >
                      Valor
                    </th>
                    <th
                      className={styles.textLeft}
                      style={{ color: "transparent" }}
                    >
                      .
                    </th>
                    <th
                      className={styles.textLeft}
                      style={{ color: "transparent" }}
                    >
                      .
                    </th>
                  </tr>

                  {/* map dos valores */}
                  {renderPagamentos(pagamentos)}
                  <tr>
                    <td className={styles.textLeft}></td>
                    <td className={styles.textLeft}></td>
                    <td className={styles.textLeft}></td>

                    <td
                      className={styles.textLeft}
                      style={{
                        borderTop: "solid thin #949494",
                        fontWeight: "bold",
                      }}
                    >
                      <span>Vlr. Total:</span>
                    </td>
                    <td
                      className={styles.textLeft}
                      style={{ borderTop: "solid thin #949494" }}
                    >
                      <span>
                        {formatarDinheiro(totais?.totalPagamento || 0)}
                      </span>
                    </td>
                    <td
                      className={styles.textLeft}
                      style={{ borderTop: "solid thin #949494" }}
                    ></td>
                  </tr>
                </table>
              </div>

              <div style={{ display: `${printDetalhe ? "block" : "none"}` }}>
                <div className={styles.titleProcedimentos}>Detalhe</div>

                <div className={styles.containerTotais}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                            {formatarDinheiro(ListaTotais.Dinheiro || 0)}
                          </span>
                        </div>
                        <div>
                          <span>DINHEIRO</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                            {formatarDinheiro(
                              ListaTotais["Cartão Crédito"] || 0
                            )}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>C. CRÉDITO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                            {formatarDinheiro(
                              ListaTotais["Cartão Debito"] || 0
                            )}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>C. DÉBITO</span>
                        </div>
                      </div>
                    </div>
                    {/* <div className={styles.containerTotalPagoPendente}>
                <div>
                  <span style={{ fontSize: '17px', fontWeight: '700' }}>
                    {returnTotalFormaPg('CHEQUE')}
                  </span>
                </div>
                <div>
                  <span>CHEQUE</span>
                </div>
              </div> */}
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                            {formatarDinheiro(ListaTotais.Pix || 0)}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span> PIX</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                            {formatarDinheiro(ListaTotais.Cortesia || 0)}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>CORTESIA</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                            {formatarDinheiro(
                              ListaTotais.Cortesia +
                                ListaTotais.Dinheiro +
                                ListaTotais.Pix +
                                ListaTotais["Cartão Crédito"] +
                                ListaTotais["Cartão Debito"]
                            )}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>SALDO BRUTO</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                            -{formatarDinheiro(ListaTotais.PagamentosUsuarios)}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>DESPESAS</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.containerTotalPagoPendente}>
                      <div className={styles.containerIconMoney}>
                        <MdAttachMoney size={18} color="white" />
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>TOTAL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div>Emissão: {new Date().toLocaleString("pt-br")}</div>
          </div>
          <tfoot className={styles.footerSpace}></tfoot>
        </table>
      </div>
    </>
  );
};

export default PrintRecebimentos;
