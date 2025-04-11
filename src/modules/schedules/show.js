import dayjs from "dayjs";

// Seleciona as sessões manhã, tarde e noite
const periodMoring = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight= document.getElementById("period-night");

export function schedulesShow({ dailySchedules }) {
  try {
    // Limpa as listas
    periodMoring.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    // Renderiza os agendamentos por período
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong"); 
      const name = document.createElement("span");

      // adiciona o id do agendamento
      item.setAttribute("data-id", schedule.id);

      time.textContent = dayjs(schedule.when).format("HH:mm");
      name.textContent = schedule.name;

      // Cria icone de cancelar o agendamento
      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
      cancelIcon.setAttribute("alt", "Cancelar agendamento");

      // Adicionar o tempo e nome no item
      item.append(time, name, cancelIcon);

      // Obtem somente a hora
      const hour = dayjs(schedule.when).hour();

      // Renderizar o agendamento na sessão de forma condicional (manhã, tarde e noite)
      if (hour<=12) {
        periodMoring.appendChild(item);
      } else if (hour > 12 && hour <= 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }


    })
    
  } catch (error) {
    console.log(error);
    alert("Não foi possível exibir os agendamentos!");
    
  }
}