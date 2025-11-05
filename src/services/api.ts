import {
  useMutation as useRQMutation,
  UseMutationOptions,
  MutationStatus,
} from "@tanstack/react-query";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

// Defina o cliente Axios para todas as solicitações
export const axiosApi = axios.create();

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.timeout = 40000;

  // baseURL sem query string
  config.baseURL = "https://blackcodepro.shop:8843/efinance";

  // Adiciona token
  config.headers.Authorization = `Bearer ${Cookies.get("tokenEfinancas")}`;

  // Adiciona sistema=financeiro em todos os requests
  if (!config.params) config.params = {};
  config.params.sistema = "financeiro";

  return config;
};

axiosApi.interceptors.request.use(onRequest);

// Função utilitária
export async function fetchApiQuery<T>(
  rota: string,
  params: { [key: string]: number | string | boolean } = {}
) {
  // Mescla os params passados com os que já vão pelo interceptor
  const result = await axiosApi.get<T>(rota, { params });
  return result.data;
}

// Função de utilitário para fazer uma solicitação GET
export function fetchApi<T>(
  rota: string,
  params: { [key: string]: number | string }
) {
  return () => axiosApi.get<T>(rota, { params });
}

// Função de utilitário para fazer uma solicitação POST
export function postApi<T>(
  rota: string,
  params: { [key: string]: number | string }
) {
  return axiosApi.post<T>(rota, { ...params });
}

// Interface para as opções do hook
export interface CustomMutationOptions<TData, TVariables>
  extends UseMutationOptions<
    AxiosResponse<TData>,
    AxiosError,
    TVariables,
    undefined
  > {
  method: string;
  route: string; // Rota da requisição
}

// Defina os tipos para os dados e parâmetros da mutação
type MutationData = { [key: string]: any };
type MutationParams = { [key: string]: any };

// Hook useCustomMutation
export function useCustomMutation<
  TData extends MutationData,
  TParams extends MutationParams
>(options: CustomMutationOptions<TData, TParams>) {
  const { method, route, ...mutationOptions } = options;

  // Utilize o hook useMutation do react-query
  const {
    isPending,
    error,
    isError,
    isSuccess,
    mutate,
    reset,
    status,
    mutateAsync,
  } = useRQMutation<AxiosResponse<TData>, AxiosError, TParams, undefined>({
    ...mutationOptions, // Passe as opções personalizadas
    mutationFn: async (data?: any) => {
      const axiosOptions: AxiosRequestConfig = {
        method: method,
        // url: "https://e-financas-api.vercel.app/efinance/" + route,
        url: "http://localhost:8092/efinance/" + route,
        data: data,
        headers: {
          Authorization: `Bearer ${Cookies.get("tokenEfinancas")}`, // Adicione o token ao cabeçalho de autorização
          "Content-Type": "application/json", // Defina o tipo de conteúdo como JSON
        },
      };

      try {
        const response = await axios.request(axiosOptions);
        return response.data;
      } catch (error) {
        throw new Error(error as any);
      }
    },
  });

  // Retorne as propriedades e funções necessárias
  return {
    isPending,
    error,
    isError,
    isSuccess,
    mutate,
    reset,
    status,
    mutateAsync,
  };
}
