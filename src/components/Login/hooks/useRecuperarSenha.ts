import { useCustomMutation } from "@/services/api";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

type FormData = {
    username: string;
    password: string;
  }

export function useRecuperarSenha(){
    const [email,setEmail] = useState("")
    const postRecuperarSenha = useCustomMutation({
        method:"POST",
        route:"usuarios/recuperarSenha"
    })

    function FnRecuperarSenha(closeModal:() => void){
        if(!email){
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Informe o e-mail',
                showConfirmButton: false,
                timer: 1500,
                customClass:{
                    popup: 'popUpmessage',
                    container:'popUpmessage',
                  }
              });
              closeModal()
        }
        postRecuperarSenha.mutate({email},{
            onSuccess(data:any) {
              if(data.type == 'success'){
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

              } else{
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
            onError(error) {
                console.error(error)
                
            },
        })
    }

      return { email,setEmail,FnRecuperarSenha }
}