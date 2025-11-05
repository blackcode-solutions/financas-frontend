import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export function useRemoverServicoVenda() {
  const queryClient = useQueryClient();
  const postRemoverServicosVendas = useCustomMutation({
    method: "DELETE",
    route: "servicosVendas/remover",
  });

  function FnRemoverServicoVendas({
    servicoVendaId,
    vendaId,
    servicoId,
    // handleClose,
  }: {
    servicoVendaId: number;
    vendaId: number;
    servicoId: number;
    // handleClose: () => void;
  }) {
    postRemoverServicosVendas.mutate(
      {
        vendaId,
        servicoVendaId,
        servicoId,
      },
      {
        onSuccess(data: any) {
          if (data.type == "success") {
            // handleClose();
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

  return { FnRemoverServicoVendas };
}
