
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useRemoverParcelaVendas(){
    const queryClient = useQueryClient()
    const postSalvarParcela = useCustomMutation({
        method:"DELETE",
        route:"parcelasVenda/deletar"
    })

    function FnRemoverParcelaVenda({parcelaVendaId,parcelaVendaCartaoId,handleClose}:{parcelaVendaCartaoId:number,parcelaVendaId:number,handleClose:()=>void}){
        postSalvarParcela.mutate({parcelaVendaId,parcelaVendaCartaoId},{
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
                queryClient.refetchQueries({ queryKey: ['listarParcelasRecebimentos'] })
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

      return { FnRemoverParcelaVenda }
}