import { fetchApiQuery } from "@/services/api";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useListarFornecedores(openModal: boolean) {
    const fornecedorSelect = useRef(null);
    const [optionsFornecedores, setOptionsFornecedores] = useState([]);
    const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  
    const fetchFornecedores = async (search = '') => {
      // Verificar se o texto de busca está vazio
      if (search.length >= 3) {
        const response: any = await fetchApiQuery('fornecedores/listar', { search, isSearch: true });
        return response.fornecedores.map((option: any) => ({
          value: option.fornecedorId,
          label: option.nomeFornecedor,
        }));
      } else {
        // Se a busca estiver vazia, retornar todos os fornecedores disponíveis
        const response: any = await fetchApiQuery('fornecedores/listar', { isSearch: true });
        return response.fornecedores.map((option: any) => ({
          value: option.fornecedorId,
          label: option.nomeFornecedor,
        }));
      }
    };
  
    const handleInputChangeFornecedores = debounce(async (inputValue: any) => {
      if (inputValue) {
        const results = await fetchFornecedores(inputValue);
        setOptionsFornecedores(results);
      } else {
        // Se o texto de busca estiver vazio, retornar todos os clientes disponíveis
        const results = await fetchFornecedores();
        setOptionsFornecedores(results);
      }
    }, 350);
  
    useEffect(() => {
      if (openModal) {
        (async () => {
          const results = await fetchFornecedores();
          setOptionsFornecedores(results);
        })();
      }
    }, [openModal]);
  
    return { fornecedorSelect, optionsFornecedores, selectedFornecedor, setSelectedFornecedor, handleInputChangeFornecedores };
  }
  