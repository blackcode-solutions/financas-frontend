import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'


export function useRemoverItemVenda(){
    const queryClient = useQueryClient()
    const postRemoverprodutosVendas = useCustomMutation({
        method:"DELETE",
        route:"produtoVenda/remover"
    })
    

    function FnRemoverProdutosVendas({produtoVendaId, vendaId,produtoId,quantidade,handleClose}:{produtoVendaId:number,vendaId:number,produtoId:number,quantidade:number,handleClose:()=>void}){
        postRemoverprodutosVendas.mutate({
            vendaId,produtoVendaId,produtoId,quantidade},{
            onSuccess(data:any) {
              if(data.type == 'success'){
                handleClose()
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
                queryClient.refetchQueries({ queryKey: ['listaProdutosVendasUsuario'] })
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
    }

      return { FnRemoverProdutosVendas }
}