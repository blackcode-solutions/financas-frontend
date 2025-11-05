import { convertToPtBrFormat } from "@/helpers/convertTimeLocalToPtBr";
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

type FormData = {
  fornecedorId:number;
    nomeFornecedor: string;
    observacao: string;
    cnpj:string;
    
  }

export function useGravarFornecedores(){

    const queryClient = useQueryClient()
    const formulario = useForm<FormData>()
    const { handleSubmit,reset } = formulario
    const postSalvarFornecedores = useCustomMutation({
        method:"POST",
        route:"fornecedores/criar"
    })
    

    function FnSalvamentoFornecedores(setHabilitarFormulario:(value:boolean) => void){
        const submit = handleSubmit((data)=>{

            postSalvarFornecedores.mutate(data,{
                onSuccess(data:any) {
                  if(data.type == 'success'){
                    setHabilitarFormulario(false)
                    reset({
                      cnpj:"",
                      fornecedorId:0,
                      nomeFornecedor:'',observacao:""
                    })
                    formulario.setValue("fornecedorId",data.idCriado)
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
                      timer: 1500,customClass:{
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

      return { formulario,FnSalvamentoFornecedores }
}