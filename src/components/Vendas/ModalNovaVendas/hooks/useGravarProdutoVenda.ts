import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export function useGravarProdutoVendas() {
  const queryClient = useQueryClient();
  const postSalvarProdutosVendas = useCustomMutation({
    method: "POST",
    route: "produtoVenda/criar",
  });

  function FnSalvarProdutosVendas({
    valor,
    numeroAbertura,
    quantidade,
    vendaId,
    produtoId,
    bolProdutoAvulso,
    nomeProdutoAvulso,
  }: {
    valor: string;
    numeroAbertura: number;
    quantidade: number;
    vendaId: number;
    produtoId: number;
    bolProdutoAvulso: boolean;
    nomeProdutoAvulso: string;
  }) {
    postSalvarProdutosVendas.mutate(
      {
        valor,
        quantidade,
        produtoId,
        numeroAbertura,
        vendaId,
        produtoVendaId: 0,
        bolProdutoAvulso,
        nomeProdutoAvulso
      },
      {
        onSuccess(data: any) {
          if (data.type == "success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "popUpmessage",
                container: "popUpmessage",
              },
            });
            queryClient.refetchQueries({
              queryKey: ["listaProdutosVendasUsuario"],
            });
            queryClient.refetchQueries({ queryKey: ['listaVendasUsuario'] })
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "popUpmessage",
                container: "popUpmessage",
              },
            });
          }
        },
        onError(error) {
          console.error(error);
        },
      }
    );
  }

  return { FnSalvarProdutosVendas };
}
