import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

type FormData = {
    empresaId:number;
    nomeFantasia: string;
    proprietario: string;
    cnpj: string;
    numeroFuncionarios: number;
    endereco: string;
    estado: string;
    cidade: string;
  }

export function useAdicionarEmpresa(){
    const queryClient = useQueryClient()
    const formulario = useForm<FormData>()
    const { handleSubmit } = formulario
    const postSalvarEmpresa = useCustomMutation({
        method:"POST",
        route:"empresas/criar"
    })
    

    function FnSalvarEmpresa(){
        const submit = handleSubmit((data)=>{
            postSalvarEmpresa.mutate(data,{
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
                    queryClient.refetchQueries({ queryKey: ['listaEmpresascadastro'] })
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

      return { formulario,FnSalvarEmpresa }
}