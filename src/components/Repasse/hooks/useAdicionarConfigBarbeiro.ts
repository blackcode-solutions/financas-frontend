import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm, UseFormReset } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  empresaId: number;
  configuracaoRepasseId: string;
  usuarioConfiguracaoRepasseId: string;
  usuarioId: string;
};

export function useAdicionarConfigBarbeiro() {
  const queryClient = useQueryClient();
  const formularioConfigBarbeiro = useForm<FormData>();
  const { handleSubmit } = formularioConfigBarbeiro;
  const postSalvarConfigRepasse = useCustomMutation({
    method: "POST",
    route: "usuariosConfRepasse/criar",
  });

  function FnSalvarConfigRepasseBarbeiro(dados:Omit<FormData,'empresaId'>) {
    
    postSalvarConfigRepasse.mutate(dados, {
      onSuccess(data: any) {
        if (data.type == "success") {
          // formularioConfigBarbeiro.setValue("empresaId", data.idCriado);
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
          queryClient.refetchQueries({ queryKey: ["usuariosConfRepasse"] });
          formularioConfigBarbeiro.reset({
            usuarioId: "",
            configuracaoRepasseId: "",
            usuarioConfiguracaoRepasseId: "",
          });
        } else {
          console.log('mensagem:',data.message)
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
    // const submit = handleSubmit((data) => {
    // });
    // submit();
  }

  return { formularioConfigBarbeiro, FnSalvarConfigRepasseBarbeiro };
}
