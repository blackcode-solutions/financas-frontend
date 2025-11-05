import { convertToPtBrFormat } from "@/helpers/convertTimeLocalToPtBr";
import { useCustomMutation } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

type FormData = {
  pagamentoId:number;
    dataPagamento: string;
    dataVencimento: string;
    dataEmissao:string;
    competencia: string;
    contaFinanceira: string;
    fornecedorId:number;
    fornecedor:string;
    descricao: string;
    valor: string;
  }

export function useGravarPagamento(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    const queryClient = useQueryClient()
    const formulario = useForm<FormData>()
    const { handleSubmit,reset } = formulario
    const postSalvarpagamento = useCustomMutation({
        method:"POST",
        route:"pagamentosUsuario/criar"
    })
    

    function FnSalvarPagamento(setHabilitarFormulario:(value:boolean) => void,selectedFornecedor:any,clearSelectFornecedor:()=>void){
        const submit = handleSubmit((data)=>{
          console.log('aqui')
          console.log(data.dataVencimento)
          data.dataVencimento = convertToPtBrFormat(data.dataVencimento)
          data.dataEmissao = convertToPtBrFormat(data.dataEmissao)
          data.dataPagamento = convertToPtBrFormat(data.dataPagamento)

            postSalvarpagamento.mutate({...data,
              fornecedorId:selectedFornecedor?.value || 0,
              fornecedor:selectedFornecedor?.label || ''
            },{
                onSuccess(data:any) {
                  if(data.type == 'success'){
                    setHabilitarFormulario(false)
                    reset({
                      dataEmissao:formattedDateTime,
                      dataPagamento:formattedDateTime,
                      dataVencimento:formattedDateTime,
                      competencia:`${month}/${year}`,
                      contaFinanceira:"",descricao:"",
                      fornecedor:"",fornecedorId:0,pagamentoId:0,
                      valor:'0'
                    })
                    clearSelectFornecedor()
                    formulario.setValue("pagamentoId",data.idCriado)
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: data.message,
                      showConfirmButton: false,
                      timer: 1500,
                      customClass:{
                        popup: 'popUpmessage',
                        container:'popUpmessage',
                      }
                    });
                    queryClient.refetchQueries({ queryKey: ['listarPagamentosUsuario'] })
                  } else{
                    Swal.fire({
                      position: "center",
                      icon: "error",
                      title: data.message,
                      showConfirmButton: false,
                      timer: 1500,customClass:{
                        popup: 'popUpmessage',
                        container:'popUpmessage',
                      }
                      
                    });
                  }     
                },
                onError(error) {
                    console.error(error)
                },
            })
        })
        submit()
    }

      return { formulario,FnSalvarPagamento }
}