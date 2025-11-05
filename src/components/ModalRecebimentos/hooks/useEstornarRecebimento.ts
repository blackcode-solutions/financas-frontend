
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

import Swal from 'sweetalert2'


export function useEstornarRecebimento(){
    const queryClient = useQueryClient()
    const postEstornarRecebimento = useCustomMutation({
        method:"PUT",
        route:"recebimentos/estornar"
    })

    function FnEstornarRecebimento({vendaId,handleClose}:
      {vendaId:number,handleClose:() => void}){
  
        postEstornarRecebimento.mutate({vendaId},{
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
                handleClose()
                queryClient.refetchQueries({ queryKey: ['listaVendasUsuario'] })
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

      return { FnEstornarRecebimento }
}