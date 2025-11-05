
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useRemoverPagamentos(){
    const queryClient = useQueryClient()
    const postRemoverPagamento = useCustomMutation({
        method:"DELETE",
        route:"pagamentosUsuario/deletar"
    })

    function FnRemoverPagamentos({pagamentoId,handleClose}:{pagamentoId:number,handleClose?:()=>void}){
        postRemoverPagamento.mutate({pagamentoId},{
            onSuccess(data:any) {
              if(data.type == 'success'){
                handleClose?.()
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
                queryClient.refetchQueries({ queryKey: ['listarPagamentosUsuario'] })
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

      return { FnRemoverPagamentos }
}

