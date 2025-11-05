import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

type FormCliente = {
    clienteId: number;
    cliente: string;
    datNascimento: string;
    cpf: string;
    cnpj: string;
    empresa:string
  }

export function useAdicionarCliente(){
    const queryClient = useQueryClient()
    const formulario = useForm<FormCliente>()
    const { handleSubmit } = formulario
    const postSalvarClientes = useCustomMutation({
        method:"POST",
        route:"clientes/criar"
    })

    function FnSalvarClientes(handleClose:()=> void){
        const submit = handleSubmit((data)=>{
            postSalvarClientes.mutate(data,{
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
                    queryClient.refetchQueries({ queryKey: ['listaClientesEmpresa'] })
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

      return { formulario,FnSalvarClientes }
}