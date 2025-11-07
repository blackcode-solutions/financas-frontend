import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm, UseFormReset } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  usuarioId: string;
  usuarioConfiguracaoRepasseId: string;
};

export function useRemoverUsuarioConfigRepasse() {
  const queryClient = useQueryClient();
  const delRemoverUsuarioConfig = useCustomMutation({
    method: "DELETE",
    route: "usuariosConfRepasse/deletar",
  });

  function FnRemoverUsuarioConfig(dados:Omit<FormData,'empresaId'>,textroRemover:string) {
    
    delRemoverUsuarioConfig.mutate(dados, {
      onSuccess(data: any) {
        if (data.type == "success") {
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

  return { FnRemoverUsuarioConfig };
}
