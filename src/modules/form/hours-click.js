export function hoursClick() {
  const hours = document.querySelectorAll(".hour-available");
  hours.forEach((available) => {
    available.addEventListener("click", (selected) => {
      hours.forEach((hour) => {
        // Remove a classe de hora selecionada
        hour.classList.remove("hour-selected");
      });

      selected.target.classList.add("hour-selected");
    });
  });
}