
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'


export function useEfetivarReebimento(){
    const queryClient = useQueryClient()
    const postEfetivarRecebimento = useCustomMutation({
        method:"PUT",
        route:"recebimentos/efetivar"
    })

    function FnEfetivarRecebimento({recebimentoVendaId, vendaId,handleClose}:
      {recebimentoVendaId:number,vendaId:number,handleClose:() => void}){
  
        postEfetivarRecebimento.mutate({recebimentoVendaId,vendaId},{
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
                queryClient.refetchQueries({ queryKey: ['listarRecebimentosDia'] })
                queryClient.refetchQueries({ queryKey: ['listaVendasPendentesUsuario'] })
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

      return { FnEfetivarRecebimento }
}