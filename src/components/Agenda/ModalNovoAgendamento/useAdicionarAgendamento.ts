import { useCustomMutation } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';

const useAgendamentoForm = () => {
  const queryClient = useQueryClient()
  const postSalvarAgendamento = useCustomMutation({
    method: "POST",
    route: "agenda/criar"
  });

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    dataAgendamento: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit =  (agendaId?:number,userId?:number,onClose?: Function) => {
    try {
       postSalvarAgendamento.mutate({agendaId,userId,...formData}, {
        onSuccess: (data: any) => {
          if (data.type === 'success') {
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
              setFormData({
                dataAgendamento:"",
                descricao:"",titulo:""
              })
              queryClient.invalidateQueries({queryKey:['listaAgendamentos']})
              onClose?.()
          } else {
            console.error(data.message);
            Swal.fire({
                position: "center",
                icon: "error",
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
                customClass:{
                  popup: 'popUpmessage',
                  container:'popUpmessage',
                }
              });
          }
        },
        onError: (error: any) => {
          console.error(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { formData, handleChange, handleSubmit,setFormData };
};

export default useAgendamentoForm;
