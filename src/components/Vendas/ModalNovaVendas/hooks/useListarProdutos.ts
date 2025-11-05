import { fetchApiQuery } from "@/services/api";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useListarProdutos(openModal: boolean) {
    const produtoSelect = useRef<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    const [optionsProdutos, setOptionsProdutos] = useState<any>([])
    const [selectedProduto, setSelectedProduto] = useState<any>(null)
  
    const fetchProdutos = async (search = '') => {
      // Verificar se o texto de busca está vazio
      setIsLoading(true)
      try {
        if (search.length >= 3) {
            const response: any = await fetchApiQuery('produtos/listar', { search, isSearch: true });
            return response.produtos.map((option: any) => ({
                value: option.produtoId,
                label: option.nomeProduto,
                valor: option.valor
            }));
        } else {
            const response: any = await fetchApiQuery('produtos/listar', { isSearch: true });
            return response.produtos.map((option: any) => ({
                value: option.produtoId,
                label: option.nomeProduto,
                valor: option.valor
            }));
        }
    } finally {
        setIsLoading(false); // Definir isLoading como false após a busca dos resultados
    }
    };
  
    const handleInputChangeProduto = debounce(async (inputValue: any) => {
      if (inputValue) {
        const results = await fetchProdutos(inputValue);
        setOptionsProdutos(results);
      } else {
        // Se o texto de busca estiver vazio, retornar todos os produtos disponíveis
        const results = await fetchProdutos();
        console.log(results)
        setOptionsProdutos(results);
      }
    }, 350);
  
    useEffect(() => {
      if (openModal) {
        (async () => {
          const results = await fetchProdutos();
          setOptionsProdutos(results);
        })();
      }
    }, [openModal]);
  
    return { produtoSelect, 
        optionsProdutos, selectedProduto,
         setSelectedProduto, handleInputChangeProduto,isLoadingProduto:isLoading }
}
