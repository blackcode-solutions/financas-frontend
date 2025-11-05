import { fetchApiQuery } from "@/services/api";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useListarUsuarios() {
    const usuarioSelect = useRef<any>(null);
    const [optionsUsuarios, setOptionsUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
  
    const fetchUsuarios = async (search = '') => {
      // Verificar se o texto de busca está vazio
      if (search.length >= 3) {
        const response: any = await fetchApiQuery('usuarios/listar', { search, isSearch: true });
        return response.usuarios.map((option: any) => ({
          value: option.usuarioId,
          label: option.username,
        }));
      } else {
        // Se a busca estiver vazia, retornar todos os usuarios disponíveis
        const response: any = await fetchApiQuery('usuarios/listar', { isSearch: true });
        return response.usuarios.map((option: any) => ({
          value: option.usuarioId,
          label: option.username,
        }));
      }
    };
  
    const handleInputChange = debounce(async (inputValue: any) => {
      if (inputValue) {
        const results = await fetchUsuarios(inputValue);
        setOptionsUsuarios(results);
      } else {
        // Se o texto de busca estiver vazio, retornar todos os clientes disponíveis
        const results = await fetchUsuarios();
        setOptionsUsuarios(results);
      }
    }, 350);
  
    useEffect(() => {
      (async () => {
        const results = await fetchUsuarios();
        setOptionsUsuarios(results);
      })();
    }, []);
  
    return { usuarioSelect, optionsUsuarios, selectedUser, setSelectedUser, handleInputChange };
  }
  