import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import styles from "./styles.module.scss";
import SwitchComponent from "@/components/SwitchComponent";
import { useState } from "react";
import { returnDate } from "@/helpers/convertTimeLocalToPtBr";
import { UseFormReturn } from "react-hook-form";
import { onSubData } from "@/helpers/dataFunctions";

type filtrosTabelaRecebimentosTypes = {
  dataInicial?: string;
  dataFinal?: string;
  bolEstornado?: boolean;
  bolCancelado?: boolean;
  vendaId?: number;
  numeroAbertura?: number;
};
interface filtertablesProps {
  formulario: UseFormReturn<filtrosTabelaRecebimentosTypes, any, undefined>;
}

export function FiltrosTables({ formulario }: filtertablesProps) {
  return (
    <fieldset
    className={`fieldsetContainer ${styles.flex}` }
    >
      <div className={styles.containerInput} style={{ width: "190px" }}>
        <label className="label">Data Inicial</label>
        <InputDateTimeComponent
          defaultValue={onSubData(30, returnDate("00", "00"), "iso")}
          {...formulario.register("dataInicial")}
        />
      </div>
      <div className={styles.containerInput} style={{ width: "190px" }}>
        <label className="label">Data Final</label>
        <InputDateTimeComponent
          defaultValue={returnDate("23", "59")}
          {...formulario.register("dataFinal")}
        />
      </div>
      <div className={styles.containerInput} style={{ width: "100px" }}>
        <label className="label">N° Venda</label>
        <InputComponent {...formulario.register("vendaId")} />
      </div>
      <div className={styles.containerInput} style={{ width: "100px" }}>
        <label className="label">N° PDV</label>
        <InputComponent {...formulario.register("numeroAbertura")} />
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <SwitchComponent
          {...formulario.register("bolEstornado")}
          label="Listar Estornados"
        />
        <SwitchComponent
          {...formulario.register("bolCancelado")}
          label="Listar Cancelados"
        />
      </div>
    </fieldset>
  );
}
