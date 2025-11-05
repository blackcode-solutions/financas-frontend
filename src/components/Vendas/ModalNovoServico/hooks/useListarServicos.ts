import { fetchApiQuery } from "@/services/api";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useListarServicos(openModal: boolean) {
  const servicoSelect = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [optionsServicos, setOptionsServicos] = useState<any>([]);
  const [selectedServico, setSelectedServico] = useState<any>(null);

  const fetchProdutos = async (search = "") => {
    // Verificar se o texto de busca está vazio
    setIsLoading(true);
    try {
      if (search.length >= 3) {
        const response: any = await fetchApiQuery("servicos/listar", {
          search,
          isSearch: true,
        });
        console.log({ response });
        return response.servicos.map((option: any) => ({
          value: option.servicoId,
          label: option.servico,
          valor: option.valor,
        }));
      } else {
        const response: any = await fetchApiQuery("servicos/listar", {
          isSearch: true,
        });
        return response.servicos.map((option: any) => ({
          value: option.servicoId,
          label: option.servico,
          valor: option.valor,
        }));
      }
    } finally {
      setIsLoading(false); // Definir isLoading como false após a busca dos resultados
    }
  };

  const handleInputChangeServico = debounce(async (inputValue: any) => {
    if (inputValue) {
      const results = await fetchProdutos(inputValue);
      setOptionsServicos(results);
    } else {
      // Se o texto de busca estiver vazio, retornar todos os produtos disponíveis
      const results = await fetchProdutos();
      console.log(results);
      setOptionsServicos(results);
    }
  }, 350);

  useEffect(() => {
    if (openModal) {
      (async () => {
        const results = await fetchProdutos();
        setOptionsServicos(results);
      })();
    }
  }, [openModal]);

  return {
    servicoSelect,
    optionsServicos,
    selectedServico,
    setSelectedServico,
    handleInputChangeServico,
    isLoadingServico: isLoading,
  };
}
