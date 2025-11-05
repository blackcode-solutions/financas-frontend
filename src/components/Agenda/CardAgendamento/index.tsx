import { MdCalendarMonth, MdContentPaste, MdPerson, MdTimer } from 'react-icons/md';
import styles from './styles.module.scss'
import { IoMdTime } from 'react-icons/io';

type card = {
    agendaId: number;
    titulo: string;
    descricao: string;
    dataAgendamento: string; 
    created_at: string;      
    updated_at: string;      
    empresaId: number;
    usuarioId: number;
    username: string;
}

interface cardType{
    props:card
    setselectedAgendamento: React.Dispatch<React.SetStateAction<card | undefined>>
    selectedAgendamento:card | undefined
  }

export function CardAgendamento({props,setselectedAgendamento,selectedAgendamento}:cardType){

    function extrairHoraMinutos(dataString:any) {
        const data = new Date(dataString);
        const hora = formatarNumero(data.getHours());
        const minutos = formatarNumero(data.getMinutes());
        return `${hora}:${minutos}`;
    }
    
    function formatarNumero(numero:any) {
        return numero.toString().padStart(2, '0');
    }
    

    return(
        <div
        onClick={()=>setselectedAgendamento(props)}
        style={{border:`${props.agendaId == selectedAgendamento?.agendaId ? '1px solid #41b06e' : '1px solid transparent'}`}}
        className={styles.cardAgendamento}>
             <div className={styles.containerFlexAgHour}>
            <strong className={styles.titleAgendamento}><MdCalendarMonth size={20} />{props.titulo}</strong>
            <strong  className={styles.timeAgendamento}><IoMdTime size={20} />{extrairHoraMinutos(props.dataAgendamento)}</strong>
            </div>
            <div style={{display:'flex',alignItems:"center",gap:'0.2rem'}}>
                <MdContentPaste size={20} /> 
                <span className={styles.descriptionAgendamento} title={props.descricao}>
                {props.descricao}
                </span>
            </div>
           
            <div className={styles.usernameAgendamento}>
                <MdPerson size={20} /> {props.username || '...'}
            </div>
        </div>
    )
}