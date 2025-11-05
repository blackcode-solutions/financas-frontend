import {  fetchApiQuery } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Swal from "sweetalert2";

type FormData = {
    vendaId: number;
    dataVenda: string;
    usuarioId: number;
    clienteId: number;
    cliente: string;
    numeroAbertura: number;
    statusVenda: string;
    cidade: string;
  };
  
  interface typesHook {
    selectedRow: FormData | null;
    openModal:boolean;
    setOpenModal:(value:boolean) => void;
    setVendaId:(value:number) => void;
  }

  export function useListarPdv({ openModal, selectedRow, setOpenModal, setVendaId }: typesHook) {
    const queryClient = useQueryClient();
  
    async function fetchPdvUsuarios(): Promise<any> {
      const response = await fetchApiQuery<any>('pdvUsuario/listar', { bolUsuario: true });
      const pdvAberto = response.pdvs[0];
      const pdvNumeroAbertura = pdvAberto?.numeroAbertura;
  
      if (openModal && !pdvNumeroAbertura) {
        setTimeout(() => {
          setOpenModal(false);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Abra um PDV para realizar a venda!",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "popUpmessage",
              container: "popUpmessage",
            },
          });
        }, 200);
      }
  
      if (selectedRow && selectedRow.numeroAbertura !== pdvNumeroAbertura) {
        setTimeout(() => {
          setOpenModal(false);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "PDV da Venda diferente do atual!",
            showConfirmButton: false,
            timer: 3500,
            customClass: {
              popup: "popUpmessage",
              container: "popUpmessage",
            },
          });
        }, 200);
      }
  
      if (selectedRow && selectedRow.numeroAbertura === pdvNumeroAbertura) {
        setVendaId(selectedRow.vendaId);
      }

      return response;
    }
  
    const listaPDvsQuery = useQuery({
      queryKey: ['listaPdvUsuario'],
      queryFn: fetchPdvUsuarios,
      refetchOnWindowFocus: false,
      
    });
  
    const pdv = Array.isArray(listaPDvsQuery.data?.pdvs) ? listaPDvsQuery.data?.pdvs : [];
  
    useEffect(() => {
      if (openModal) queryClient.invalidateQueries({ queryKey: ['listaPdvUsuario'] });
    }, [openModal, queryClient]);
 
    return pdv;
  }
  