
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useAdicionarParcela(){
    const queryClient = useQueryClient()
    const postSalvarParcela = useCustomMutation({
        method:"POST",
        route:"parcelasVenda/criar"
    })
    
    const data = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()

    async function FnSalvarParcela({valorParcela,
      valorDesconto,vendaId,formaPagamentoId,parcelaVendaCartaoId,
      recebimentoVendaId,valorTotal,isCartao}:{
        valorParcela:any,isCartao?:boolean,
        valorDesconto:any,vendaId:number,formaPagamentoId:number,
        recebimentoVendaId:number,valorTotal:any,parcelaVendaCartaoId?:number}){
          if(!formaPagamentoId) return  Swal.fire({
            position: "center",
            icon: "warning",
            title: 'Informe a forma de pagamento!',
            showConfirmButton: false,
            timer: 1500,
            customClass:{
              popup: 'popUpmessage',
              container:'popUpmessage',
            }
          });
          if(!valorParcela) return  Swal.fire({
            position: "center",
            icon: "warning",
            title: 'Informe o valor da parcela!',
            showConfirmButton: false,
            timer: 1500,
            customClass:{
              popup: 'popUpmessage',
              container:'popUpmessage',
            }
          });
          
        const dataResult :any = await postSalvarParcela.mutateAsync({
          valorParcela:parseFloat(Number(valorParcela).toFixed(2)),
          dataPrevista:data,
          dataRecebimento:data,formaPagamentoId,valorTotal,isCartao,
            valorDesconto:parseFloat(Number(valorDesconto).toFixed(2)),vendaId, produtoVendaId:0,recebimentoVendaId,parcelaVendaCartaoId})
           
            if(dataResult.type == 'success'){
              queryClient.refetchQueries({ queryKey: ['listarParcelasRecebimentos'] })
            } else{
              Swal.fire({
                position: "center",
                icon: "error",
                title: dataResult.message,
                showConfirmButton: false,
                timer: 1500,
                customClass:{
                  popup: 'popUpmessage',
                  container:'popUpmessage',
                }
              });
            } 
    }

      return { FnSalvarParcela }
}