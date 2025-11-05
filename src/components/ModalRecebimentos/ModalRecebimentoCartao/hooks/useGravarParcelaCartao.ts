import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useGravarParcelaCartao(){
    const queryClient = useQueryClient()
    const postGravarParcelasCartao = useCustomMutation({
        method:"POST",
        route:"parcelaVendaCartao/criar"
    })
    
    async function FnGravarParcelaCartao({
      vendaId,codigoAutorizacao,parcelas,
      recebimentoVendaId,numeroDocumentoNSU,
      valorDesconto,valorParcela,valorTotal,formaPagamentoId
    }:{vendaId:number,codigoAutorizacao:number,valorTotal:number,
      recebimentoVendaId:number,numeroDocumentoNSU:number,
      parcelas:number,valorDesconto:number,valorParcela:number,
      formaPagamentoId:number
    }){
        
        const data :any= await postGravarParcelasCartao.mutateAsync({
          parcelas,formaPagamentoId,
          numeroDocumentoNSU,
          recebimentoVendaId,
          vendaId,valorDesconto:valorDesconto,valorTotal,
          codigoAutorizacao,valorParcela:valorParcela,dataPrevista:new Date().toLocaleDateString() +" "+new Date().toLocaleTimeString(),
          dataRecebimento:new Date().toLocaleDateString() +" "+new Date().toLocaleTimeString()
        })
        if(data.type == 'success'){
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
    }

      return { FnGravarParcelaCartao }
}