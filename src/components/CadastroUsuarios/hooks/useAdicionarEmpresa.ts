import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

type FormData = {
    usuarioId:number;
    username: string;
    password: string;
    email: string;
    bolAdministrador: boolean;
  }

export function useAdicionarUsuario(){
    const queryClient = useQueryClient()
    const formulario = useForm<FormData>()
    const { handleSubmit } = formulario
    const postSalvarUsuario = useCustomMutation({
        method:"POST",
        route:"usuarios/criar"
    })

    
    function verificarSenha(senha:string) {
      // Verificar se a senha tem pelo menos 8 caracteres
      const temPeloMenosOitoCaracteres = senha.length >= 8;
      // Verificar se a senha contém pelo menos um caractere minúsculo
      const temCaractereMinusculo = /[a-z]/.test(senha);
      // Verificar se a senha contém pelo menos um caractere maiúsculo
      const temCaractereMaiusculo = /[A-Z]/.test(senha);
      // Verificar se a senha contém pelo menos um número
      const temNumero = /\d/.test(senha);
      // Verificar se a senha contém pelo menos um caractere especial
      const temCaractereEspecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha);
      // Montar a mensagem descrevendo o que está faltando na senha
      let mensagem = "";
      if (!temPeloMenosOitoCaracteres) mensagem += "A senha deve ter pelo menos 8 caracteres. ";
      if (!temCaractereMinusculo) mensagem += "A senha deve conter pelo menos um caractere minúsculo. ";
      if (!temCaractereMaiusculo) mensagem += "A senha deve conter pelo menos um caractere maiúsculo. ";
      if (!temNumero) mensagem += "A senha deve conter pelo menos um número. ";
      if (!temCaractereEspecial) mensagem += "A senha deve conter pelo menos um caractere especial. ";
  
      // Verificar se a senha passa em todos os critérios
      const senhaSegura =
          temPeloMenosOitoCaracteres &&
          temCaractereMinusculo &&
          temCaractereMaiusculo &&
          temNumero &&
          temCaractereEspecial;
  
      return { senhaSegura, mensagem };
  }

    function FnSalvarUsuario(empresaId:number,closeModal:()=>void){
        const submit = handleSubmit((data)=>{
          const objOptions = {
            ...data,
            empresaId,
            bolAdministrador:true,
            bolCriarUser:true
          }
          const { mensagem,senhaSegura } = verificarSenha(data.password)

          if(!senhaSegura){
            Swal.fire({
              position: "center",
              icon: "warning",
              title: mensagem,
              showConfirmButton: true,
              // timer: 1500,
              customClass:{
                popup: 'popUpmessage',
                container:'popUpmessage',
              }
            });
            return
          }
          
            postSalvarUsuario.mutate(objOptions,{
                onSuccess(data:any) {
                  if(data.type == 'success'){
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: data.message,
                      showConfirmButton: false,
                      timer: 1500,
                      customClass:{
                        popup: 'popUpmessage',
                        container:'popUpmessage',
                      }
                    });
                    closeModal()
                  } else{
                    Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: data.message,
                      showConfirmButton: false,
                      timer: 1500,
                      customClass:{
                        popup: 'popUpmessage',
                        container:'popUpmessage',
                      }
                    });
                  }     
                },
                onError(error) {
                    console.error(error)
                },
            })
        })
        submit()
    }

      return { formulario,FnSalvarUsuario }
}