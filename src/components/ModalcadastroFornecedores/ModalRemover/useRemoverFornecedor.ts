
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

export function useRemoverFornecedor(){
    const queryClient = useQueryClient()
    const postRemoverFornecedores = useCustomMutation({
        method:"DELETE",
        route:"fornecedores/deletar"
    })

    function FnRemoverFornecedor({fornecedorId,handleClose}:{fornecedorId:number,handleClose?:()=>void}){
        postRemoverFornecedores.mutate({fornecedorId},{
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
                queryClient.refetchQueries({ queryKey: ['listaFornecedoresCadastro'] })
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

      return { FnRemoverFornecedor }
}

