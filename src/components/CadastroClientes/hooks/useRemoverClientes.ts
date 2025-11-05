import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

export function useRemoverClientes(){
    const queryClient = useQueryClient()
    const postRemoverClientes = useCustomMutation({
        method:"DELETE",
        route:"clientes/deletar"
    })

    function FnRemoverClientes(clienteId:number | undefined,setOpenModal:()=>void){
      postRemoverClientes.mutate({clienteId},{
        onSuccess(data:any) {
          if(data.type == 'success'){
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
            queryClient.refetchQueries({ queryKey: ['listaClientesEmpresa'] })
            setOpenModal()
          } else{
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
          }     
        },
        onError(error) {
            console.error(error)
        },
    })
    }

      return { FnRemoverClientes }
}