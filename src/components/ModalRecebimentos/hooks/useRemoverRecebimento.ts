
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useRemoverRecebimentos(){
    const queryClient = useQueryClient()
    const postSalvarRecebimento = useCustomMutation({
        method:"DELETE",
        route:"recebimentos/deletar"
    })

    function FnRemoverRecebimento({recebimentoVendaId,vendaId,handleClose}:{recebimentoVendaId:number,vendaId:number,handleClose:()=>void}){
        postSalvarRecebimento.mutate({recebimentoVendaId,vendaId},{
            onSuccess(data:any) {
              if(data.type == 'success'){
                handleClose()
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: data.message,
                  showConfirmButton: false,
                  timer: 1000,
                  customClass:{
                    popup: 'popUpmessage',
                    container:'popUpmessage',
                  }
                });
                queryClient.refetchQueries({ queryKey: ['listaParcelasVenda'] })
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

      return { FnRemoverRecebimento }
}