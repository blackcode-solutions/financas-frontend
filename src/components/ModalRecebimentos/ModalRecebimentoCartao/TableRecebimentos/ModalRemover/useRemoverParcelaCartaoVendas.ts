
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useRemoverParcelaCartaoVendas(){
    const queryClient = useQueryClient()
    const postSalvarParcela = useCustomMutation({
        method:"DELETE",
        route:"parcelaVendaCartao/deletar"
    })

    function FnRemoverParcelaVendaCartao({recebimentoVendaId, parcelaVendaCartaoId,handleClose,removeAll}:{parcelaVendaCartaoId?:number,recebimentoVendaId:number,handleClose?:()=>void,removeAll?:boolean}){
        postSalvarParcela.mutate({recebimentoVendaId,parcelaVendaCartaoId,removeAll},{
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
                queryClient.refetchQueries({ queryKey: ['listarParcelasCartaoRecebimentos'] })
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

      return { FnRemoverParcelaVendaCartao }
}