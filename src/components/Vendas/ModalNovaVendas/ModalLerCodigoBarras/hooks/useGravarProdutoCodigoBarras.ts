import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from 'sweetalert2'


export function useGravarProdutoCodigoBarras(){
    const [ codigoBarras, setCodigoBarras] = useState('')
    const queryClient = useQueryClient()
    const postLerCodBarras = useCustomMutation({
        method:"POST",
        route:"produtoVenda/lercodigoBarras"
    })
    
    function FnGravarCodigoBarras({vendaId}:{vendaId:number}){
        if(!codigoBarras) return Swal.fire({
            position: "center",
            icon: "error",
            title: 'Informe o Código de barras!',
            showConfirmButton: false,
            timer: 1500,
            customClass:{
              popup: 'popUpmessage',
              container:'popUpmessage',
            }
          });
        postLerCodBarras.mutate({codigoBarras,vendaId},{
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
                setCodigoBarras('')
                queryClient.refetchQueries({ queryKey: ['listaProdutosVendasUsuario'] })
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

      return { FnGravarCodigoBarras,setCodigoBarras, codigoBarras }
}