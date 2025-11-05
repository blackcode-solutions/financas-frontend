import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";

import styles from "./styles.module.scss";
import SwitchComponent from "@/components/SwitchComponent";
import { useState } from "react";
import { returnDate } from "@/helpers/convertTimeLocalToPtBr";
import { UseFormReturn } from "react-hook-form";

type filtrosTabelaVendasTypes = {
  dataInicial: string;
  dataFinal: string;
  bolEstornado: boolean;
  bolCancelado: boolean;
  vendaId: number;
  numeroAbertura: number;
};

interface filtertablesProps {
  formulario: UseFormReturn<filtrosTabelaVendasTypes, any, undefined>;
}

export function FiltrosTables({ formulario }: filtertablesProps) {
  return (
    <fieldset className={`fieldsetContainer ${styles.flex}` }>
      <div className={styles.containerInput} style={{ width: "190px" }}>
        <label htmlFor="" className="label">Data Inicial</label>
        <InputDateTimeComponent 
        defaultValue={returnDate('00','00')}
        {...formulario.register("dataInicial")} />
      </div>
      <div className={styles.containerInput} style={{ width: "190px" }}>
        <label htmlFor="" className="label">Data Final</label>
        <InputDateTimeComponent
        defaultValue={returnDate('23','59')}
        {...formulario.register("dataFinal")} />
      </div>
      <div className={styles.containerInput} style={{ width: "100px" }}>
        <label htmlFor="" className="label">N° Venda</label>
        <InputComponent {...formulario.register("vendaId")} />
      </div>
      <div className={styles.containerInput} style={{ width: "100px" }}>
        <label htmlFor="" className="label">N° PDV</label>
        <InputComponent {...formulario.register("numeroAbertura")} />
      </div>
      {/* <div className={styles.containerInput} style={{width:'202px'}}>
                <label htmlFor="">Usuário(PDV)</label>
                <InputComponent />
            </div> */}
      <div style={{ display: "flex",gap: "0.4rem", marginTop: "1rem" }}>
        <SwitchComponent 
        label="Listar Estornados"
        {...formulario.register("bolEstornado")} />
        <SwitchComponent
          {...formulario.register("bolCancelado")}
          label="Listar Cancelados"
        />
      </div>
    </fieldset>
  );
}
