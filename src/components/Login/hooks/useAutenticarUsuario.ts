import { useCustomMutation } from "@/services/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type FormData = {
  username: string;
  password: string;
};

export function useAutenticarUsuario(setBolAutenticado: Dispatch<SetStateAction<boolean>>) {
  const router = useRouter();
  const formulario = useForm<FormData>();
  const { handleSubmit } = formulario;
  const postSalvarEmpresa = useCustomMutation({
    method: "POST",
    route: "autenticar",
  });
  const expires = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);

  function FnAutenticarUsuario() {
    const submit = handleSubmit((data) => {

      postSalvarEmpresa.mutate(data,{
          onSuccess(data:any) {
            if(data.type == 'success'){
              setBolAutenticado(true);
              Swal.fire({
                position: "center",
                icon: "success",
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              Cookies.set('tokenEfinancas', data.token, { expires: expires, sameSite: 'strict',secure: true });
              Cookies.set('nomeUsuarioEfinance', data.nomeUsuario, { expires: expires, sameSite: 'strict',secure: true });
              Cookies.set('bolAdministrador', data.administrador, { expires: expires, sameSite: 'strict',secure: true });
              Cookies.set('usuarioIdEfinance', data.usuarioId, { expires: expires, sameSite: 'strict',secure: true });

              router.push("/recebimentos");
            } else{
              Swal.fire({
                position: "center",
                icon: "error",
                title: data.message,
                showConfirmButton: false,
                timer: 1500
              });
            }
          },
          onError(error) {
              console.error(error)

          },
      })
    });
    submit();
  }

  return { formulario, FnAutenticarUsuario };
}
