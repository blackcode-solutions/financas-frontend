import {
  MdAddCircle,
  MdDownload,
  MdEdit,
  MdExitToApp,
  MdListAlt,
  MdMonitor,
  MdPayment,
  MdPrint,
  MdRefresh,
  MdSearch,
} from "react-icons/md";
import ButtonComponent from "../ButtonComponent";
import styles from "./styles.module.scss";
import React, { useEffect, useRef, useState } from "react";
import AgendamentoModal from "./ModalNovoAgendamento";
import { Calendar, Whisper, Popover, Badge, Button } from "rsuite";
import { axiosApi } from "@/services/api";
import Overlay from "./Overlay";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CardAgendamento } from "./CardAgendamento";
import Select from "react-select";
import { useListarUsuarios } from "./hooks/useListarUsuarios";
import { IoMdTrash } from "react-icons/io";
import { ModalRemoverAgendamento } from "./ModalRemover";

const customStyles = {
  control: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    height: 35,
    minHeight: 32,
    borderColor: !isSelected ? "#41B06E" : base.borderColor,
    boxShadow: !isSelected ? "#41B06E" : base.borderColor,
    "&:hover": {
      borderColor: "#41B06E",
    },
    "&:active": {
      borderColor: "#41B06E",
    },
  }),
  option: (base: any, { isFocused }: any) => ({
    ...base,
    backgroundColor: isFocused ? "#41B06E" : "white",
    color: !isFocused ? "#41B06E" : "white",
    "&:hover": {
      backgroundColor: isFocused ? "#41B06E" : "white", // Define a cor de fundo para verde quando a opção estiver em foco
      color: !isFocused ? "#41B06E" : "white",
    },
  }),
};

interface cardType {
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

export function AgendaPage() {
  const {
    usuarioSelect,
    optionsUsuarios,
    selectedUser,
    setSelectedUser,
    handleInputChange,
  } = useListarUsuarios();
  const queryClient = useQueryClient();
  const dataAgendamentoSelecionada = useRef<any>(null);
  const [openModalRemoverAgendamento, setOpenModalRemoverAgendamento] =
    useState(false);
  const [openModalAgendamento, setOpenModalAgendamento] = useState(false);
  const [listaAgendamentosCards, setListaAgendamentosCards] = useState<
    cardType[]
  >([]);
  const [selectedAgendamento, setselectedAgendamento] = useState<cardType>();
  const fetchAgendamentos = async () => {
    try {
      const response = await axiosApi.get("agenda/listar", {
        params: {
          bolTodos: (selectedUser as any)?.value ? false : true,
          usuarioId: (selectedUser as any)?.value ?? 0,
        },
      });
      return response?.data?.agendamentos;
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };
  const listaAgendamentos = useQuery({
    queryKey: ["listaAgendamentos", { bolTodos: true }],
    queryFn: () => fetchAgendamentos(),
  });
  const agendamentos: any = listaAgendamentos.data || [];

  const getTodoList = (date: any) => {
    const dateString = date.toISOString().split("T")[0]; // Formatar a data como YYYY-MM-DD
    return agendamentos
      .filter(
        (agendamento: any) =>
          agendamento.dataAgendamento.split("T")[0] === dateString
      )
      .map((agendamento: any) => ({
        time: agendamento.dataAgendamento.split("T")[1], // Adapte conforme necessário
        title: agendamento.titulo,
      }));
  };

  const renderCell = (date: any) => {
    const list = getTodoList(date);
    const totalAgendamentos = list.length;

    if (totalAgendamentos) {
      const moreItem = (
        <div key="more" className={styles.moreItem}>
          <Whisper
            trigger="hover"
            speaker={(props, ref) => (
              <Overlay
                style={{ left: props.left, top: props.top }}
                onClose={props.onClose}
                agendamentos={list}
                ref={ref}
              />
            )}
          >
            <a className={styles.moreLink}>
              <div>
                <span className={styles.spanTitle}>
                  {totalAgendamentos} agendamento
                </span>
              </div>{" "}
              {/* <div>
                <span className={styles.spanTitle}>agendamentos</span>
              </div> */}
            </a>
          </Whisper>
        </div>
      );

      return <ul className={styles["calendar-todo-list"]}>{moreItem}</ul>;
    }

    return null;
  };

  function converterDataParaPtBr(dataString: string) {
    const data = new Date(dataString);

    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  async function getAgendamentosDia(isEdit: boolean, date: any) {
    let dataAgendamento: any;
    function converterDataISOPtBr(dataString: any) {
      const data = new Date(dataString);
      const dia = formatarNumero(data.getDate());
      const mes = formatarNumero(data.getMonth() + 1); // O mês começa do zero (janeiro é 0)
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }

    function formatarNumero(numero: any) {
      return numero.toString().padStart(2, "0");
    }
    if (!date) return;
    if (isEdit) {
      dataAgendamento = converterDataISOPtBr(date);
    } else {
      dataAgendamento = converterDataParaPtBr(date);
    }
    const fetchAgendamentos = async () => {
      try {
        const response = await axiosApi.get("agenda/listar", {
          params: {
            dataAgendamento,
            bolTodos: (selectedUser as any)?.value ? false : true,
            usuarioId: (selectedUser as any)?.value ?? 0,
          },
        });
        return response?.data?.agendamentos;
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };
    const result = await fetchAgendamentos();
    setListaAgendamentosCards(result);
    setselectedAgendamento(undefined);
  }

  useEffect(() => {
    getAgendamentosDia(true, new Date());
  }, []);

  return (
    <>
      <ModalRemoverAgendamento
        agendaId={selectedAgendamento?.agendaId}
        openModal={openModalRemoverAgendamento}
        setOpenModal={setOpenModalRemoverAgendamento}
        handleCloseModal={async () => {
          await getAgendamentosDia(true, dataAgendamentoSelecionada.current);
          queryClient.invalidateQueries({
            queryKey: ["listaAgendamentos"],
          });
        }}
      />
      <AgendamentoModal
        isOpen={openModalAgendamento}
        onClose={async () => {
          await getAgendamentosDia(true, dataAgendamentoSelecionada.current);
          setOpenModalAgendamento(false);
        }}
        selectedAgendamento={selectedAgendamento}
      />
      <div className={styles.containerMain}>
        <section style={{ padding: "0.3rem" }}>
          <div className={styles.containerButtons}>
            <ButtonComponent
              onClick={() => {
                setselectedAgendamento(undefined);
                setOpenModalAgendamento(true);
              }}
              style={{ width: "130px", height: "37px" }}
            >
              <MdAddCircle size={18} /> Novo
            </ButtonComponent>
            <ButtonComponent
              isDisable={!selectedAgendamento}
              onClick={() => {
                setOpenModalAgendamento(true);
              }}
              style={{ width: "130px", height: "37px" }}
            >
              <MdEdit size={18} /> Editar
            </ButtonComponent>
            <ButtonComponent
              isReturn
              isDisable={!selectedAgendamento}
              onClick={() => {
                setOpenModalRemoverAgendamento(true);
              }}
              style={{ width: "130px", height: "37px" }}
            >
              <IoMdTrash size={18} /> Excluir
            </ButtonComponent>
            <ButtonComponent
              onClick={async () => {
                await getAgendamentosDia(
                  true,
                  dataAgendamentoSelecionada.current
                );
                queryClient.invalidateQueries({
                  queryKey: ["listaAgendamentos"],
                });
              }}
              style={{ width: "130px", height: "37px" }}
            >
              <MdRefresh size={18} /> Atualizar
            </ButtonComponent>
            <ButtonComponent
              isReturn
              style={{ width: "130px", height: "37px" }}
            >
              <MdExitToApp size={18} /> Sair
            </ButtonComponent>
          </div>
        </section>
        <section style={{ padding: "0.4rem" }}>
          <div className={styles.containerInput} style={{ width: "250px" }}>
            <label htmlFor="">Usuário</label>
            <Select
              placeholder=""
              ref={usuarioSelect}
              isClearable={true}
              value={selectedUser}
              onChange={(value: any) => setSelectedUser(value)}
              onInputChange={handleInputChange}
              noOptionsMessage={() => "Digite o nome do cliente"}
              styles={customStyles}
              options={optionsUsuarios}
            />
          </div>
        </section>
        <section className={styles.calendarSection}>
          <Calendar
            className={styles.calendar}
            onMonthChange={(date: any) => {
              console.log(date);
            }}
            style={{ width: "65%" }}
            onChange={async (date: any) => {
              dataAgendamentoSelecionada.current = date;
              await getAgendamentosDia(false, date);
            }}
            bordered
            renderCell={renderCell}
          />
          <div className={styles.containerCards}>
            {Array.isArray(listaAgendamentosCards) &&
              listaAgendamentosCards.map((props) => (
                <CardAgendamento
                  setselectedAgendamento={setselectedAgendamento}
                  selectedAgendamento={selectedAgendamento}
                  key={props.agendaId}
                  props={props}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
