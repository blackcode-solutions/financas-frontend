import { fetchApiQuery } from "@/services/api";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useListarClientes(openModal: boolean) {
    const clientSelect = useRef(null);
    const [optionsClientes, setOptionsClientes] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
  
    const fetchClientes = async (search = '') => {
      console.log({ search })
      // Verificar se o texto de busca está vazio
      if (search.length >= 3) {
        const response: any = await fetchApiQuery('clientes/listar', { search, isSearch: true });
        return response.clientes.map((option: any) => ({
          value: option.clienteId,
          label: option.cliente,
        }));
      } else {
        // Se a busca estiver vazia, retornar todos os clientes disponíveis
        const response: any = await fetchApiQuery('clientes/listar', { isSearch: true });
        return response.clientes.map((option: any) => ({
          value: option.clienteId,
          label: option.cliente,
        }));
      }
    };
  
    const handleInputChange = debounce(async (inputValue: any) => {
      if (inputValue) {
        const results = await fetchClientes(inputValue);
        setOptionsClientes(results);
      } else {
        // Se o texto de busca estiver vazio, retornar todos os clientes disponíveis
        const results = await fetchClientes();
        setOptionsClientes(results);
      }
    }, 350);
  
    useEffect(() => {
      if (openModal) {
        (async () => {
          const results = await fetchClientes();
          setOptionsClientes(results);
        })();
      }
    }, [openModal]);
  
    return { clientSelect, optionsClientes, selectedClient, setSelectedClient, handleInputChange };
  }
  