import InputComponent from "@/components/InputComponent";
import InputDateTimeComponent from "@/components/InputDateTime";
import styles from "./styles.module.scss";
import SwitchComponent from "@/components/SwitchComponent";
import Cookies from "js-cookie";
import { returnDate } from "@/helpers/convertTimeLocalToPtBr";
import { UseFormReturn } from "react-hook-form";
import { onSubData } from "@/helpers/dataFunctions";
import Select from "react-select";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { DebouncedFunc } from "lodash";
import { customStyles } from "@/utils/customStyleReactSelect";

// const customStyles = {
//   control: (base: any, { isFocused, isSelected }: any) => ({
//     ...base,
//     height: 35,
//     minHeight: 32,
//     borderColor: !isSelected ? "#41B06E" : base.borderColor,
//     boxShadow: !isSelected ? "#41B06E" : base.borderColor,
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
//     "&:hover": {
//       backgroundColor: isFocused ? "#41B06E" : "white", // Define a cor de fundo para verde quando a opção estiver em foco
//       color: !isFocused ? "#41B06E" : "white",
//     },
//   }),
// };

type filtrosTabelaRecebimentosTypes = {
  dataInicial?: string;
  dataFinal?: string;
  fechamentoPDVUsuarioId: string;
  numeroAbertura?: string;
  usuarioId?: string;
};
interface filtertablesProps {
  formulario: UseFormReturn<filtrosTabelaRecebimentosTypes, any, undefined>;
  objFiltroUsuario: {
    usuarioSelect: MutableRefObject<null>;
    optionsUsuarios: never[];
    selectedUser: null;
    setDelectedUser: Dispatch<SetStateAction<null>>;
    handleInputChange: DebouncedFunc<(inputValue: any) => Promise<void>>;
  };
}

export function FiltrosTables({
  formulario,
  objFiltroUsuario,
}: filtertablesProps) {
  return (
    <fieldset className={`fieldsetContainer ${styles.flex}`}>
      <div className={styles.containerInput} style={{ width: "190px" }}>
        <label htmlFor="" className="label">Data Inicial</label>
        <InputDateTimeComponent
          defaultValue={onSubData(30, returnDate("00", "00"), "iso")}
          {...formulario.register("dataInicial")}
        />
      </div>
      <div className={styles.containerInput} style={{ width: "190px" }}>
        <label htmlFor="" className="label">Data Final</label>
        <InputDateTimeComponent
          defaultValue={returnDate("23", "59")}
          {...formulario.register("dataFinal")}
        />
      </div>
      <div className={styles.containerInput} style={{ width: "100px" }}>
        <label htmlFor="" className="label">N° PDV</label>
        <InputComponent {...formulario.register("numeroAbertura")} />
      </div>
      <div className={styles.containerInput} style={{ width: "130px" }}>
        <label htmlFor="" className="label">N° Fechamento.</label>
        <InputComponent {...formulario.register("fechamentoPDVUsuarioId")} />
      </div>
      <div className={styles.containerInput} style={{ width: "180px" }}>
        <label htmlFor="" className="label">Usuário</label>
        <Select
          placeholder=""
          ref={objFiltroUsuario.usuarioSelect}
          isClearable={true}
          onChange={(value: any) => objFiltroUsuario.setDelectedUser(value)}
          onInputChange={objFiltroUsuario.handleInputChange}
          noOptionsMessage={() => "Digite o nome do cliente"}
          styles={customStyles}
          options={objFiltroUsuario.optionsUsuarios}
        />
      </div>
    </fieldset>
  );
}
