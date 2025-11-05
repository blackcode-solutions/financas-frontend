import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import styles from './AgendamentoModal.module.scss';
import InputDateTime from '@/components/InputDateTime';
import InputComponent from '@/components/InputComponent';
import useAgendamentoForm from './useAdicionarAgendamento';
import { useListarUsuarios } from '../hooks/useListarUsuarios';
import Select from 'react-select';

type cardType = {
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

const customStyles = {
  control: (base:any, { isFocused, isSelected  }:any) => ({
    ...base,
    height: 35,
    minHeight: 32,
    borderColor: !isSelected ? '#41B06E' : base.borderColor,
    boxShadow: !isSelected ? '#41B06E' : base.borderColor,
    '&:hover':{
      borderColor:"#41B06E"
    },
    '&:active':{
      borderColor:"#41B06E"
    },
  }),
  option: (base:any, { isFocused }:any) => ({
    ...base,
    backgroundColor: isFocused ? '#41B06E' : 'white',
    color: !isFocused ? '#41B06E' : 'white',
    '&:hover': {
      backgroundColor: isFocused ? '#41B06E' : 'white', // Define a cor de fundo para verde quando a opção estiver em foco
      color: !isFocused ? '#41B06E' : 'white',
    }
  }),
  menuPortal: (base:any) => ({
    ...base,
    zIndex: 9999 // Ajuste o valor do z-index conforme necessário
  })
};

const AgendamentoModal = ({ isOpen, onClose, selectedAgendamento }:{isOpen:boolean,onClose:()=>void,selectedAgendamento: cardType | undefined}) => {

  const { formData, handleChange, handleSubmit,setFormData } = useAgendamentoForm();
  const {
    usuarioSelect,
    optionsUsuarios,
    selectedUser,
    setSelectedUser,
    handleInputChange,
  } = useListarUsuarios();

  useEffect(()=>{
    if(isOpen && selectedAgendamento){
      setFormData({
        dataAgendamento:selectedAgendamento?.dataAgendamento || "",
        descricao:selectedAgendamento?.descricao || "",
        titulo:selectedAgendamento?.titulo || "",
      });
      setTimeout(() => {
        setSelectedUser({
          value: selectedAgendamento?.usuarioId,
          label: selectedAgendamento?.username,
        })
      }, 200);
      
    }
  },[isOpen]);

  const footerContent = (
    <div>
      <Button label="Sair" 
        style={{color:"#41B06E"}} icon="pi pi-times" onClick={()=>{
          setFormData({
            dataAgendamento:"",
            descricao:"",
            titulo:""
          });
          setSelectedUser(null)
          usuarioSelect.current.clearValue();
          onClose();
        }} className="p-button-text" />
      <Button label="Gravar" 
        onClick={()=>handleSubmit(selectedAgendamento?.agendaId || 0,(selectedUser as any)?.value || 0,()=>onClose())}
        style={{backgroundColor:"#41B06E"}} color='green' icon="pi pi-check"  autoFocus />
    </div>
  );

  return (
    <Dialog header="Novo Agendamento"
      footer={footerContent}
      visible={isOpen} style={{ width: '30vw' }} modal onHide={onClose}>
      <form  className="agendamento-form">
        <div className={styles['p-float-label']} style={{marginBottom:'0.8rem'}}>
          <label htmlFor="titulo">Título</label>
          <InputComponent
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['p-float-label']} style={{marginBottom:'0.8rem'}}>
          <label htmlFor="descricao">Descrição</label>
          <InputComponent
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['p-float-label']} style={{marginBottom:'0.8rem'}}>
          <label htmlFor="dataAgendamento">Data do Agendamento</label>
          <InputDateTime
            id="dataAgendamento"
            name="dataAgendamento"
            value={formData.dataAgendamento}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
            required
          />
        </div>
        <div className={styles['p-float-label']} style={{marginBottom:'0.8rem'}}>
          <label htmlFor="usuarioAgendamento">Usuário</label>
          <Select
            placeholder=""
            ref={usuarioSelect}
            value={selectedUser}
            isClearable={true}
            onChange={(value: any) => setSelectedUser(value)}
            onInputChange={handleInputChange}
            noOptionsMessage={() => "Digite o nome do cliente"}
            styles={customStyles}
            options={optionsUsuarios}
            menuPortalTarget={document.body} // Adiciona o menu ao corpo do documento
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AgendamentoModal;
