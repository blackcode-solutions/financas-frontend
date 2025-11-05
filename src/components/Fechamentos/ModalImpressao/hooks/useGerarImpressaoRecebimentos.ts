import { axiosApi, fetchApi, useCustomMutation } from "@/services/api";

export function useGerarImpressaoRecebimentos(){
    const getDadosImpressao = useCustomMutation({
        method:"GET",
        route:""
    })

     async function FnGerarImpressaoRecebimentos(params:any){
      const objOptions = {
        ...params
      }
     const result = await axiosApi.get('parcelasVenda/gerarImpressaoFechamentos',{
        params:objOptions
     })
     return result.data
   
    }

      return { FnGerarImpressaoRecebimentos }
}