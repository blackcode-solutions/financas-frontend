import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm, UseFormReset } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  empresaId: number;
  configuracaoRepasseId: string;
  configuracaoRepasse: string;
  porcentagem: string;
};

export function useAdicionarConfigRepasse() {
  const queryClient = useQueryClient();
  const formulario = useForm<FormData>();
  const { handleSubmit } = formulario;
  const postSalvarConfigRepasse = useCustomMutation({
    method: "POST",
    route: "configuracaoRepasse/criar",
  });

  function FnSalvarConfigRepasse(
    setOpenForm: Dispatch<SetStateAction<boolean>>,
    setIdRepasse: Dispatch<SetStateAction<number>>,idRepasse:any) {
    const submit = handleSubmit((data) => {
      postSalvarConfigRepasse.mutate({
        ...data,configuracaoRepasseId:idRepasse ? idRepasse : ''}, {
        onSuccess(data: any) {
          if (data.type == "success") {
            // formulario.setValue("empresaId", data.idCriado);
            setIdRepasse(data.idCriado);
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "popUpmessage",
                container: "popUpmessage",
              },
            });
            queryClient.refetchQueries({ queryKey: ["configuracaoRepasse"] });
            formulario.reset({
              configuracaoRepasse: "",
              configuracaoRepasseId: "",
              porcentagem: "",
            });
            setOpenForm(true);
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "popUpmessage",
                container: "popUpmessage",
              },
            });
          }
        },
        onError(error) {
          console.error(error);
        },
      });
    });
    submit();
  }

  return { formulario, FnSalvarConfigRepasse };
}
