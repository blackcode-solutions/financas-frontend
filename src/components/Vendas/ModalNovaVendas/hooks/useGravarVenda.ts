import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'


export function useGravarVenda(){
    const [ vendaId, setVendaId] = useState(0)
    const queryClient = useQueryClient()
    const postSalvarVendas = useCustomMutation({
        method:"POST",
        route:"vendas/criar"
    })
    

    function FnSalvarVendas({clienteId,numeroAbertura}:{clienteId:number,numeroAbertura:number}){
        postSalvarVendas.mutate({clienteId,
            dataVenda:new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            numeroAbertura,vendaId,tipoVenda:"PRODUTO"},{
            onSuccess(data:any) {
              if(data.type == 'success'){
                setVendaId(data.idCriado)
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

      return { FnSalvarVendas,vendaId, setVendaId }
}