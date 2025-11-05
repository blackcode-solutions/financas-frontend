import { useCustomMutation } from "@/services/api";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2'

export function useRedefinirSenha(){
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const username = searchParams.get('username');
    const email = searchParams.get('email');
    const empresaId = searchParams.get('empresaId');
    const [novaSenha,setNovaSenha] = useState("")
    const putRedefinirSenha = useCustomMutation({
        method:"PUT",
        route:"usuarios/redefinirSenha"
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

    function FnRedefinirSenha(){
        if(!novaSenha){
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Informe a senha!',
                showConfirmButton: false,
                timer: 1500,
                customClass:{
                    popup: 'popUpmessage',
                    container:'popUpmessage',
                  }
              });
        }

        const { mensagem,senhaSegura } = verificarSenha(novaSenha)

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

        putRedefinirSenha.mutate({novaSenha,token,username,empresaId,email},{
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

              } else{
                Swal.fire({
                  position: "center",
                  icon: "error",
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
    }

      return { novaSenha,setNovaSenha,FnRedefinirSenha }
}