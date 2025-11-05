import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";


export function useRemoverConfigRepasse(){
    const queryClient = useQueryClient()
    const postRemoverServicos = useCustomMutation({
        method:"DELETE",
        route:"configuracaoRepasse/remover"
    })

    function FnRemoverConfigRepasse(configuracaoRepasseId:number,setOpenModal:Dispatch<SetStateAction<boolean>>){
      postRemoverServicos.mutate({configuracaoRepasseId},{
        onSuccess(data:any) {
          if(data.type == 'success'){
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
            queryClient.invalidateQueries({ queryKey: ['configuracaoRepasse'] })
            setOpenModal(false);
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

      return { FnRemoverConfigRepasse }
}