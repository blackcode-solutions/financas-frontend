import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from 'sweetalert2'

export function useFecharPDV(){
  const queryClient = useQueryClient()
  const [bolIncluirValorAbertura,setbolIncluirValorAbertura] = useState(false)
    const [observacao,setObservacao] = useState('0')
    const postFecharPDV = useCustomMutation({
        method:"POST",
        route:"fecharPDV/criar"
    })

    function FnfecharPDV({handleClose,
      valorAbertura,
      numeroAbertura,dataAbertura,recebimentosVendasIds,pagamentosIds}:
      {handleClose:()=>void,numeroAbertura:number,pagamentosIds:string,
        dataAbertura:string,recebimentosVendasIds:string,valorAbertura:string,}){
      const objOptions = {
        numeroAbertura,observacao,
        recebimentosVendasIds:JSON.stringify(recebimentosVendasIds),
        pagamentosIds:JSON.stringify(pagamentosIds),
        valorAbertura,bolIncluirValorAbertura,
        dataAbertura,dataFechamento:new Date().toLocaleDateString('pt-BR') + ' '+ new Date().toLocaleTimeString('pt-BR'),

      }
     
      postFecharPDV.mutate(objOptions,{
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
            queryClient.invalidateQueries({queryKey:['listarPagamentosFechamentoUsuario']})

            queryClient.invalidateQueries({queryKey:['listaFechamentoRecebimentos']})

            queryClient.invalidateQueries({queryKey:['listaResultadosTotais']})


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

      return { FnfecharPDV,observacao,setObservacao,bolIncluirValorAbertura,setbolIncluirValorAbertura }
}