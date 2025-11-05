

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApiQuery } from '@/services/api';

export function useListarPdv(openModal: boolean) {
  const queryClient = useQueryClient();

  const fetchPdvUsuarios = async (): Promise<any> => {
    const response = await fetchApiQuery<any>('pdvUsuario/listar', { bolUsuario: true });
    return response;
  };

  const listaPDvsQuery = useQuery({
    queryKey: ['listaPdvUsuario'],
    queryFn: fetchPdvUsuarios,
    refetchOnWindowFocus: false,
    enabled: false // Disable automatic fetching
  });

  const data = listaPDvsQuery.data;
  const pdv = Array.isArray(data?.pdvs) ? data?.pdvs : [];

  useEffect(() => {
    if (openModal) {
      queryClient.invalidateQueries({queryKey:['listaPdvUsuario']});
      listaPDvsQuery.refetch();
    }
  }, [openModal, queryClient, listaPDvsQuery]);

  return {pdv,loading:listaPDvsQuery.isLoading};
}
