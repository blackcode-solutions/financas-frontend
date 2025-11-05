

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchApiQuery } from '@/services/api';

export function useListarDetalhesRepasse({repasseId,openModal}: {repasseId:number,openModal:boolean}) {
  const queryClient = useQueryClient();

  const fetchDetalhesRepasse = async (): Promise<any> => {
    const response = await fetchApiQuery<any>('repasseItem/listarDetalhesRecebimentosUsuarios', { repasseId });
    return response;
  };

  const listaQueryDetalhesRepasse = useQuery({
    queryKey: ['listarDetalhesPagamentoRepasse'],
    queryFn: fetchDetalhesRepasse,
    refetchOnWindowFocus: false,
    enabled: false // Disable automatic fetching
  });

  const data = listaQueryDetalhesRepasse.data;
  const listaRepasses = Array.isArray(data?.detalhesRepasse) ? data?.detalhesRepasse : [];

  useEffect(() => {
    if (openModal) {
      queryClient.invalidateQueries({queryKey:['listarDetalhesPagamentoRepasse']});
      listaQueryDetalhesRepasse.refetch();
    }
  }, [openModal, queryClient, listaQueryDetalhesRepasse]);

  return listaRepasses;
}
