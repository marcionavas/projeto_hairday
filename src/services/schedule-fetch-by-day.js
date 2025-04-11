import { apiConfig } from "./api-config.js";
import dayjs from "dayjs";

export async function scheduleFetchByDay({ date }) {
  try {
    // Fazendo a requisição para a API: GET /schedules
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    // Convertendo a resposta para JSON
    const data = await response.json();

    // Filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day")).sort((a, b) =>
        dayjs(a.when).isAfter(dayjs(b.when)) ? 1 : -1
      );

    return dailySchedules; 
  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar os agendamentos para o dia informado.");
  }

}