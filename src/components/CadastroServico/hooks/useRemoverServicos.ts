import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";


export function useRemoverServico(){
    const queryClient = useQueryClient()
    const postRemoverServicos = useCustomMutation({
        method:"DELETE",
        route:"servicos/remover"
    })

    function FnRemoverServicos(servicoId:number,setOpenModal:Dispatch<SetStateAction<boolean>>){
      postRemoverServicos.mutate({servicoId},{
        onSuccess(data:any) {
          if(data.type == 'success'){
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
            queryClient.invalidateQueries({ queryKey: ['listaServicos'] })
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

      return { FnRemoverServicos }
}