import { useQuery } from "@tanstack/react-query";
import styles from "./styles.module.scss";
import { fetchApi } from "@/services/api";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import Image from "next/image";
import { useListarEmpresas } from "@/components/DetalhesUsuario/CadastroUsuarios/hooks/useListarEmpresa";
import { useListarEmpresaImpressao } from "./hooks/useListarEmpresaImpressao";

interface FolhaImpressaoProps {
  arrayValores: any;
  impressaoRef: any;
  startPrint: boolean;
}

export function FolhaImpressao({
  arrayValores,
  impressaoRef,
  startPrint,
}: FolhaImpressaoProps) {
  const valoresListados = Array.isArray(arrayValores) ? arrayValores : [];

  const dataEmpresa: any = useListarEmpresaImpressao();
  console.log(dataEmpresa);
  const informacoesEmpresa = dataEmpresa ? dataEmpresa : null;
  const logoEmpresaBase64 = false;

  function returnTotalTable(array: any) {
    let totalRecebidos = 0;
    if (Array.isArray(array)) {
      array.forEach((element: any) => {
        totalRecebidos += parseFloat(element.total);
      });
      return formatarDinheiro(totalRecebidos);
    } else {
      return 0;
    }
  }

  return (
    <>
      <style type="text/css" media="print">
        {
          "@page { size: A4;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
        }
      </style>
      {startPrint && (
        <div className={styles.containerPrint} ref={impressaoRef}>
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              <div className={styles.logo}>
                {logoEmpresaBase64 ? (
                  <img
                    //   src={`data:image/png;base64,${logoEmpresaBase64}`}
                    alt="logo"
                    style={{ height: "50px" }}
                  />
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
                <span style={{ fontWeight: "700" }}>Vendas PDV</span>
              </div>
            </div>
            <div className={styles.headerRight}>
              {/* <span>Página 1</span> */}
              <span>
                Emissão : {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </span>
              <div
                style={{ position: "absolute", bottom: "5px", display: "flex" }}
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
              <div>
                {/* <div className={styles.titleProcedimentos}>Pagamentos</div> */}
                <table
                  className={styles.tableProc}
                  style={{ marginBottom: "50px !important" }}
                >
                  <tr className={styles.tableHeader}>
                    <tr className={styles.teste}>&nbsp;</tr>
                    <th className={styles.textLeft}>N° Venda</th>
                    <th className={styles.textLeft}>cliente</th>
                    <th className={styles.textLeft}>Data Venda</th>
                    <th className={styles.textLeft}>Status</th>
                    <th className={styles.textLeft}>Usuário</th>
                    <th className={styles.textLeft}>Valor</th>
                  </tr>
                  {/* map dos valores */}
                  {valoresListados?.map((element: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{element.vendaId}</td>
                        <td
                          className={styles.textLeft}
                          style={{ maxWidth: "200px" }}
                        >
                          {element.cliente}
                        </td>
                        <td
                          className={styles.textLeft}
                          style={{ maxWidth: "115px" }}
                        >
                          {element.dataVenda}
                        </td>
                        <td className={styles.textLeft}>
                          {element.statusVenda}
                        </td>
                        <td className={styles.textLeft}>{element.usuario}</td>
                        <td className={styles.textLeft}>
                          {formatarDinheiro(element.total)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td className={styles.textLeft}></td>
                    <td className={styles.textLeft}></td>
                    <td className={styles.textLeft}></td>
                    <td
                      className={styles.textLeft}
                      style={{
                        fontWeight: "bold",
                        borderTop: "1px solid black",
                      }}
                    >
                      Valor Total:
                    </td>
                    <td
                      className={styles.textLeft}
                      style={{
                        fontWeight: "bold",
                        borderTop: "1px solid black",
                      }}
                    >
                      {returnTotalTable(valoresListados)}
                    </td>
                  </tr>
                  <tr className={styles.footerSpace}>&nbsp;</tr>
                </table>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            {informacoesEmpresa?.nomeFantasia}
          </div>
        </div>
      )}
    </>
  );
}
