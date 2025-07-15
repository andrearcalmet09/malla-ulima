document.addEventListener("DOMContentLoaded", () => {
  fetch("malla.json")
    .then((response) => response.json())
    .then((data) => crearMalla(data))
    .catch((error) => console.error("Error cargando la malla:", error));
});

function crearMalla(malla) {
  const container = document.getElementById("malla-container");
  const creditosDiv = document.getElementById("creditos-totales");
  let creditosTotales = 0;

  malla.forEach((semestreObj) => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `📚 Semestre ${semestreObj.semestre}`;
    divSemestre.appendChild(titulo);

    semestreObj.cursos.forEach((curso) => {
      // Omitir entrada genérica de electivas por crédito si existiera
      if (
        curso.nombre.toLowerCase().includes("electivas") &&
        curso.creditos >= 15
      )
        return;

      const divCurso = document.createElement("div");
      divCurso.className = "curso";
      divCurso.classList.add(curso.electivo ? "electivo" : "obligatorio");

      // Emoji según tipo
      const emoji = curso.electivo ? "🟠" : "🔵";
      divCurso.textContent = `${emoji} ${curso.nombre} (${curso.creditos} créditos)`;

      // Tooltip opcional
      divCurso.title = curso.electivo
        ? "Curso electivo, puedes escogerlo"
        : "Curso obligatorio del plan";

      // Interacción: marcar como aprobado
      divCurso.addEventListener("click", () => {
        divCurso.classList.toggle("aprobado");
        const factor = divCurso.classList.contains("aprobado") ? 1 : -1;
        creditosTotales += curso.creditos * factor;
        creditosDiv.textContent = `Créditos aprobados: ${creditosTotales}`;
      });

      divSemestre.appendChild(divCurso);
    });

    container.appendChild(divSemestre);
  });
}
