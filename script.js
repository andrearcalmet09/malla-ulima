document.addEventListener("DOMContentLoaded", () => {
  fetch("malla.json")
    .then((res) => res.json())
    .then((data) => {
      crearMalla(data);
      actualizarEstadisticas();
    });
});

function crearMalla(malla) {
  const container = document.getElementById("malla-container");
  const creditosEl = document.querySelector("#creditos-totales strong");

  let creditosAprobados = 0;

  malla.forEach((semestreObj) => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `📘 Semestre ${semestreObj.semestre}`;
    divSemestre.appendChild(titulo);

    semestreObj.cursos.forEach((curso) => {
      if (curso.nombre.toLowerCase().includes("electivas") && curso.creditos >= 15) return;

      const divCurso = document.createElement("div");
      divCurso.className = "curso";
      divCurso.classList.add(curso.electivo ? "electivo" : "obligatorio");
      divCurso.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

      const cursoId = `${semestreObj.semestre}-${curso.nombre}`;
      if (localStorage.getItem(cursoId) === "true") {
        divCurso.classList.add("aprobado");
        creditosAprobados += curso.creditos;
      }

      // Evento de clic: activar evaluaciones y profesores
      divCurso.addEventListener("click", () => {
        divCurso.classList.toggle("aprobado");
        const aprobado = divCurso.classList.contains("aprobado");

        creditosAprobados += aprobado ? curso.creditos : -curso.creditos;
        creditosEl.textContent = creditosAprobados;

        localStorage.setItem(cursoId, aprobado);

        mostrarEvaluaciones(curso.nombre, curso.creditos); // ✅ Mostrar evaluaciones
        mostrarProfesor(curso.nombre);                      // ✅ Mostrar profesor
        actualizarEstadisticas();                           // ✅ Recalcular
      });

      divSemestre.appendChild(divCurso);
    });

    container.appendChild(divSemestre);
  });

  creditosEl.textContent = creditosAprobados;
}

/** 📊 Calcula estadísticas generales */
function actualizarEstadisticas() {
  calcularPromedioGeneral();
  calcularRankingFinal();
}
