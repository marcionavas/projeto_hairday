import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector('form');
const clientName = document.getElementById('client');
const selectedDate = document.getElementById('date');

// Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD');

// Carrega a data atual no campo de data e deine a data mínima
selectedDate.value = inputToday;
selectedDate.min = inputToday;


form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    // Recuperando o nome do cliente
    const name = clientName.value.trim();

    if (!name) {
      return alert("Preencha o nome do cliente!");
    }

    // Recupera o horário selecionado
    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      return alert("Selecione um horário!");
    }

    // Recupera somente a hora
    const [hour] = hourSelected.innerText.split(":");

    // Insere a hora na data seleciondada
    const when = dayjs(selectedDate.value).add(hour, "hour");

    // Gera um ID
    const id = new Date().getTime().toString();

    // Realiza o agendamento
    await scheduleNew({
      id,
      name,
      when,
    });

    // Recarrega os agendamentos e atualiza a interface
    await schedulesDay();

    // Limpa o nome do usuário
    clientName.value = "";


  } catch (error) {
    alert("Não foi possível realizar o agendamento!\nTente novamente mais tarde.");
    console.error(error);
  }

}