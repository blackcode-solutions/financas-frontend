import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";


export function useRemoverAgendamento(){
    const queryClient = useQueryClient()
    const postRemoverAgendamento = useCustomMutation({
        method:"DELETE",
        route:"agenda/deletar"
    })

    function FnRemoverAgendamento(agendaId:number,setOpenModal:()=>void){
      postRemoverAgendamento.mutate({agendaId},{
        onSuccess(data:any) {
          if(data.type == 'success'){
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
            queryClient.refetchQueries({ queryKey: ['listaEmpresascadastro'] })
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

      return { FnRemoverAgendamento }
}