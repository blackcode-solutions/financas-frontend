import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

type FormProduto = {
    produtoId: number;
    valor: string;
    quantidade: number;
    codigoBarras: string;
    observacao: string;
    nomeProduto:string;
  }

export function useAdicionarProduto(){
    const queryClient = useQueryClient()
    const formulario = useForm<FormProduto>()
    const { handleSubmit } = formulario
    const postSalvarprodutos = useCustomMutation({
        method:"POST",
        route:"produtos/criar"
    })

    function FnSalvarproduto(handleClose:()=> void){
        const submit = handleSubmit((data)=>{
            postSalvarprodutos.mutate(data,{
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
                    queryClient.refetchQueries({ queryKey: ['listaProdutosEmpresa'] })
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
        })
        submit()
    }

      return { formulario,FnSalvarproduto }
}