import { modalOpen } from "@/interfaces/modalOpen";
import { Dialog } from "primereact/dialog";
import styles from "./styles.module.scss";
import InputComponent from "@/components/InputComponent";
import { Button } from "primereact/button";
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from "react";
import { AG_GRID_LOCALE_PT_BR } from "@/interfaces/Table";
import { AgGridReact } from "ag-grid-react";
import { formatarDinheiro } from "@/helpers/convertNumberToMoney";
import { convertToPtBrFormat } from "@/helpers/convertTimeLocalToPtBr";
import { fetchApiQuery, useCustomMutation } from "@/services/api";
import ButtonComponent from "@/components/ButtonComponent";
import Swal from "sweetalert2";
interface ModalDetalhesRecebimentosPorProfissionalRepasse extends modalOpen {
    setRepasses:any;
}

export function ModalProcessarRepassesServicos({
  openModal,
  setOpenModal,setRepasses
}: ModalDetalhesRecebimentosPorProfissionalRepasse) {

  function close(){
    setDataInicio("")
    setDataFim("")
    setOpenModal(false)
  }
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

      const postGravarRepasse = useCustomMutation({
            method:"POST",
            route:"repasse/criar"
        })
        const postGravarItensRepasse = useCustomMutation({
          method:"POST",
          route:"repasseItem/criar"
      })

      
        const listarRepasses = async () => {
          try {
            const data:any = await fetchApiQuery("repasse/listar", 
              { dataInicio:convertToPtBrFormat(dataInicio), 
                dataFim:convertToPtBrFormat(dataFim) });
                setRepasses(data.repassesEmpresa)
          } catch (error) {
            console.error("Erro ao listar repasses", error);
          }
        };
  
  
    const processarRepasse = async () => {
      if (!dataInicio || !dataFim) {
        alert("Informe a data de início e fim");
        return;
      }
      const objOptions = {
        dataInicio:
          convertToPtBrFormat(dataInicio), dataFim:convertToPtBrFormat(dataFim)
          ,tipoVenda:"SERVICO"
      }
      // Listar itens para adicionar ao repasse
      const parcelasRecebimentoPDV:any = await fetchApiQuery("itensVenda/listar", objOptions);
          console.log(parcelasRecebimentoPDV)
        if (!parcelasRecebimentoPDV?.parcelasRepasse?.length) {
          alert("Nenhum item encontrado para repasse");
          return;
        }
        
        // Criar repasse
        const data :any= await postGravarRepasse.mutateAsync(objOptions);
        const repasseId = data.idCriado;
        
        // Inserir itens no repasse
        for (const item of parcelasRecebimentoPDV?.parcelasRepasse) {
          await postGravarItensRepasse.mutateAsync({ ...item, repasseId });
        }
        close()
        Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Repasse Processado com sucesso!",
                      showConfirmButton: false,
                      timer: 1500
                    });
        listarRepasses();
    };
  

  
  const defaultColDef = {
    flex: 1,
  }; 



  const footerContent = (
    <div>
      <Button
        label="Sair"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={close}
        className="p-button-text"
      />
       <Button
        label="Processar"
        // rounded
        style={{ color: "#41B06E" }}
        icon="pi pi-times"
        onClick={processarRepasse}
        className="p-button-text"
      />


    </div>
  );

  return (
    <Dialog
      footer={footerContent}
      modal
      header="Repasse Serviços de Profissionais"
      draggable={false}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      visible={openModal}
      style={{ width: "35vw" }}
      onHide={close}
    >
      <main>
        <div>
        <div style={{ padding: "0.4rem" }}>
       <fieldset className="fieldsetContainer">
           <div style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
           <InputComponent type="datetime-local" style={{width:"200px"}} value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
           <InputComponent type="datetime-local" style={{width:"200px"}} value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
          
           </div>
         </fieldset>
    </div>       
        </div>
      </main>
    </Dialog>
  );
}
