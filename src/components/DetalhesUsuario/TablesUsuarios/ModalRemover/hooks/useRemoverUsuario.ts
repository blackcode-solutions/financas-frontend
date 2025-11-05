import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'


export function useRemoverUsuario(){
    const queryClient = useQueryClient()
    const postRemoverUsuario = useCustomMutation({
        method:"DELETE",
        route:"usuarios/deletar"
    })
    

    function FnRemoverUsuarios({usuarioId,handleClose}:{usuarioId:number,handleClose:()=>void}){
      const usuarioLogado = Cookies.get("usuarioIdEfinance")
      if(Number(usuarioLogado) == Number(usuarioId)){
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Não é possivel remover o próprio usuário!",
          showConfirmButton: false,
          timer: 1500,
          customClass:{
            popup: 'popUpmessage',
            container:'popUpmessage',
          }
        });
      }
        postRemoverUsuario.mutate({usuarioId},{
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
                queryClient.refetchQueries({ queryKey: ['listarUsuariosEmpresa'] })
                handleClose()
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

      return { FnRemoverUsuarios }
}