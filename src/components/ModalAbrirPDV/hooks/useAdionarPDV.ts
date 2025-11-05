import { useCustomMutation } from "@/services/api";
import { useState } from "react";
import Swal from 'sweetalert2'

export function useAdicionarPDV(){
    const [valorInicial,setValorInicial] = useState('0')
    const [numeroAbertura,setNumeroAbertura] = useState('0')
    const postCriarPDV = useCustomMutation({
        method:"POST",
        route:"pdvUsuario/criar"
    })

    function FnCriarPDV(handleClose:()=>void){
      const objOptions = {
        numeroAbertura,valorInicial,statusPDV:"ATIVO",
        dataAbertura:new Date().toLocaleDateString('pt-BR') + ' '+ new Date().toLocaleTimeString('pt-BR')
      }
      
      postCriarPDV.mutate(objOptions,{
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

      return { FnCriarPDV,valorInicial,setValorInicial,numeroAbertura,setNumeroAbertura }
}