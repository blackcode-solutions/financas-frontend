import { StylesConfig } from "react-select";

type OptionType = {
  label: string;
  value: string;
};

export const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    padding: "0 0.5rem",
    width: "100%",
    justifyContent: "center",
    border: state.isFocused ? "2px solid #4F39F6" : "1px solid #CED4DA",
    outline: "none",
    borderRadius: "12px",
    backgroundColor: state.isDisabled ? "#f5f5f5" : "#fff",
    color: "#333",
    fontSize: "0.875rem",
    fontWeight: 500,
    boxShadow: "none",
    height: "36px", // reduzido de 34px
    minHeight: "36px",
    cursor: state.isDisabled ? "not-allowed" : "default",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 4px",
    height: "34px",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "33px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#3F3D56",
    fontSize: "0.875rem",
    fontWeight: 500,
  }),
  singleValue: (base) => ({
    ...base,
    color: "#333",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: "4px",
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "4px",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 5,
  }),
//     option: (base: any, { isFocused }: any) => ({
//     ...base,
//     backgroundColor: isFocused ? "#7c42e0" : "white",
//     color: !isFocused ? "#7c42e0" : "white",
//     zIndex: 99999,
//     "&:hover": {
//       backgroundColor: isFocused ? "#7c42e0" : "white", // Define a cor de fundo para verde quando a opção estiver em foco
//       color: !isFocused ? "#7c42e0" : "white",
//     },
//   }),
};
