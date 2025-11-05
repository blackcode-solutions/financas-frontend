import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

export function useRemoverProdutos(){
    const queryClient = useQueryClient()
    const postRemoverProdutos = useCustomMutation({
        method:"DELETE",
        route:"produtos/deletar"
    })

    function FnRemoverProdutos(produtoId:number | undefined,setOpenModal:()=>void){
      postRemoverProdutos.mutate({produtoId},{
        onSuccess(data:any) {
          if(data.type == 'success'){
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            });
            queryClient.refetchQueries({ queryKey: ['listaProdutosEmpresa'] })
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

      return { FnRemoverProdutos }
}