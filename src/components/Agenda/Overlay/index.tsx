import React from "react";
import styles from '../styles.module.scss'

const Overlay = React.forwardRef(({ style, onClose, agendamentos }: any, ref: any) => {
    const overlayStyles = {
      ...style,
      color: '#000',
      background: '#fff',
      width: 400,
      padding: 10,
      borderRadius: 4,
      position: 'absolute',
      border: '1px solid #ddd',
      boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)',
      zIndex: 999
    };
  
    return (
      <div style={overlayStyles} className={styles.popover} ref={ref}>
        {agendamentos.map((agendamento: any, index: number) => (
          <p key={index}>
            <b style={{color:"#41B06E"}}>{agendamento.time}</b> - <span>{agendamento.title}</span>
          </p>
        ))}
      </div>
    );
  });
  
  Overlay.displayName = 'Overlay'; // Definindo um nome para o componente
  
  export default Overlay;
  