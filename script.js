document.addEventListener("DOMContentLoaded", () => {
  fetch("malla.json")
    .then((response) => response.json())
    .then((data) => crearMalla(data))
    .catch((error) => console.error("Error cargando la malla:", error));
});

function crearMalla(malla) {
  const container = document.getElementById("malla-container");
  let creditosTotales = 0;

  malla.forEach((semestreObj) => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestreObj.semestre}`;
    divSemestre.appendChild(titulo);

    semestreObj.cursos.forEach((curso) => {
      if (curso.nombre.toLowerCase().includes("electivas") && curso.creditos >= 15) return; // eliminar "Electivas 18 créditos"

      const divCurso = document.createElement("div");
      divCurso.className = "curso";
      divCurso.classList.add(curso.electivo ? "electivo" : "obligatorio");

      divCurso.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

      // Permitir marcar cualquier curso (sin prerequisitos)
      divCurso.addEventListener("click", () => {
        divCurso.classList.toggle("aprobado");

        if (divCurso.classList.contains("aprobado")) {
          creditosTotales += curso.creditos;
        } else {
          creditosTotales -= curso.creditos;
        }

        document.getElementById("creditos-totales").textContent = `Créditos aprobados: ${creditosTotales}`;
      });

      divSemestre.appendChild(divCurso);
    });

    container.appendChild(divSemestre);
  });
}
