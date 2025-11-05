import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReset } from "react-hook-form"
import Swal from 'sweetalert2'

type FormData = {
    empresaId:number;
    servico: string;
    valor: string;
    servicoId: string;
  }

export function useAdicionarServicos(){
    const queryClient = useQueryClient()
    const formulario = useForm<FormData>()
    const { handleSubmit } = formulario
    const postSalvarServicos = useCustomMutation({
        method:"POST",
        route:"servicos/criar"
    })
    

    function FnSalvarServico(){
        const submit = handleSubmit((data)=>{
            postSalvarServicos.mutate(data,{
                onSuccess(data:any) {
                  if(data.type == 'success'){
                    formulario.setValue("empresaId",data.idCriado)
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: data.message,
                      showConfirmButton: false,
                      timer: 1500,  customClass:{
                        popup: 'popUpmessage',
                        container:'popUpmessage',
                      }
                    });
                    queryClient.refetchQueries({ queryKey: ['listaServicos'] })
                    formulario.reset({
                      servico:'',
                      servicoId:'',
                      valor:'',
                    })
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

      return { formulario,FnSalvarServico }
}