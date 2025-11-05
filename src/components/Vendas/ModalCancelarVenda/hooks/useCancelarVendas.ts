import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useCancelarVendas(){
    const queryClient = useQueryClient()
    const putCancelarVendas = useCustomMutation({
        method:"PUT",
        route:"vendas/cancelar"
    })
    

    function FnCancelarVendas({vendaId,handleClose}:{vendaId:number,handleClose:()=>void}){
        putCancelarVendas.mutate({
            vendaId},{
            onSuccess(data:any) {
              if(data.type == 'success'){
                handleClose()
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

      return { FnCancelarVendas }
}