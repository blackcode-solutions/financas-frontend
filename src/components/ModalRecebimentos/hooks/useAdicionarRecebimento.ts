
import { useCustomMutation } from "@/services/api";
import Swal from 'sweetalert2'


export function useAdicionarRecebimento(){
    const postSalvarRecebimento = useCustomMutation({
        method:"POST",
        route:"recebimentos/criar"
    })
    const data = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()

    function FnSalvarRecebimento({vendaId,setRecebimentoVendaId}:{
     vendaId:number,setRecebimentoVendaId:(value:number) =>void}){
        postSalvarRecebimento.mutate({dataRecebimento:data,vendaId},{
            onSuccess(data:any) {
              if(data.type == 'success'){
                setRecebimentoVendaId(data.idCriado)
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

      return { FnSalvarRecebimento }
}