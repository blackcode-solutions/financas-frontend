import { MdBusiness, MdCode, MdPerson } from "react-icons/md";
import styles from "./styles.module.scss";
import { FaBirthdayCake } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

type FormCliente = {
  data: {
    clienteId: number;
    cliente: string;
    datNascimento: string;
    cpf: string;
    cnpj: string;
    empresa: string;
  };
  selectedRow: {
    clienteId: number;
    cliente: string;
    datNascimento: string;
    cpf: string;
    cnpj: string;
    empresa: string;
  } | null;
  setSelectedRow: Dispatch<
    SetStateAction<{
      clienteId: number;
      cliente: string;
      datNascimento: string;
      cpf: string;
      cnpj: string;
      empresa: string;
    } | null>
  >;
};

export function CardCliente({
  data,
  selectedRow,
  setSelectedRow,
}: FormCliente) {
  const date = new Date(data.datNascimento);
  return (
    <div
      onClick={() => setSelectedRow(data)}
      className={styles.containerCard}
      style={{
        borderTop: `${
          selectedRow?.clienteId == data.clienteId ? "4px solid #2e7d32 " : ""
        }`,
        color: `${
          selectedRow?.clienteId == data.clienteId ? "#2e7d32" : "#121529"
        }`,
      }}
    >
      <div>
        {/* <span
          className={styles.containerInfo}
          style={{ fontSize: "14px", color: "#121529" }}
        >
          <MdPerson size={18} color="#7C42E0" /> {data.cliente || ""}
        </span> */}
        <div className={styles.customerHeader}>
          <div
            className={styles.avatar}
            style={{
              backgroundColor: `${
                selectedRow?.clienteId == data.clienteId ? " #2e7d32 " : ""
              }`,
              color: `${
                selectedRow?.clienteId == data.clienteId ? "#fff" : ""
              }`,
            }}
          >
            {data.cliente[0] || ""}
          </div>
          <h3 className={styles.customerName}>{data.cliente || ""}</h3>
        </div>
      </div>

      <div className={styles.containerFlexData}>
        <div>
          <span className={styles.containerInfo}>
            <FaBirthdayCake
              size={18}
              color={
                selectedRow?.clienteId == data.clienteId ? "#2e7d32" : "#7C42E0"
              }
            />{" "}
            {date.toLocaleDateString("pt-BR") || ""}
          </span>
        </div>
        <div>
          {data.empresa && (
            <span className={styles.containerInfo}>
              <MdBusiness
                size={18}
                color={
                  selectedRow?.clienteId == data.clienteId
                    ? "#2e7d32"
                    : "#7C42E0"
                }
              />{" "}
              {data.empresa || ""}
            </span>
          )}
        </div>
      </div>
      <div className={styles.containerFlexData} style={{ marginTop: "4px" }}>
        <div className={styles.containerInfo}>
          <span>CPF:{data.cpf || "Não Informado"}</span>
        </div>

        {data.cnpj && (
          <div className={styles.containerInfo}>
            <span>CNPJ: {data.cnpj || ""}</span>
          </div>
        )}
      </div>
    </div>
  );
}
