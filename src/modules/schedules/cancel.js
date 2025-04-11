import { schedulesDay } from "../schedules/load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";

const periods = document.querySelectorAll('.period');

// Gerar evento de click para cada lista (manhã, tarde e noite)
periods.forEach(period => {
  period.addEventListener('click', async (event) => {

    // Captura o elemento clicado
    if (event.target.classList.contains('cancel-icon')) {
      // Obtem o li mais próximo do elemento clicado
      const item = event.target.closest('li');
      // Pega o id do agendamento para remoção
      const {id} = item.dataset;

      // Confirma que o id foi selecionado
      if (id) {
        // Verifica se o usuário realmente deseja cancelar o agendamento
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?");

        // Se o usuário confirmar, chama a função de cancelamento
        if (isConfirm) {
          // Remove o agendamento por meio da requisição DELETE
          await scheduleCancel({ id });
          // Atualiza a lista de agendamentos
          await schedulesDay();
        }
      }
    }
  });
});