import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export function useGravarServico() {
  const queryClient = useQueryClient();
  const postSalvarServicosVendas = useCustomMutation({
    method: "POST",
    route: "servicosVendas/criar",
  });

  function FnSalvarServicoVendas({
    servicoVendaId,
    servicoId,
    valor,
    vendaId,
    numeroAbertura,
    profissionalId,
  }: {
    servicoVendaId: string;
    servicoId: number;
    valor: string;
    vendaId: number;
    numeroAbertura: number;
    profissionalId: number;
  }) {
    postSalvarServicosVendas.mutate(
      {
        servicoVendaId,
        servicoId,
        valor,
        vendaId,
        numeroAbertura,
        profissionalId,
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
              queryKey: ["listaServicosVendas"],
            });
            queryClient.refetchQueries({ queryKey: ["listaServicosVendas"] });
            queryClient.refetchQueries({ queryKey: ["listaVendasUsuario"] });
            
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

  return { FnSalvarServicoVendas };
}
