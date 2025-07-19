document.addEventListener("DOMContentLoaded", () => {
  fetch("malla.json")
    .then((res) => res.json())
    .then((data) => {
      crearMalla(data);
      actualizarEstadisticas();
    });
});

let mallaGlobal = [];

function crearMalla(malla) {
  mallaGlobal = malla;
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
      const aprobado = localStorage.getItem(cursoId) === "true";

      if (aprobado) {
        divCurso.classList.add("aprobado");
        creditosAprobados += curso.creditos;
      }

      // Deshabilita si tiene prerrequisitos no cumplidos
      if (curso.requiere && !cumpleRequisitos(curso.requiere)) {
        divCurso.classList.add("bloqueado");
      }

      // Evento de clic
      divCurso.addEventListener("click", () => {
        if (divCurso.classList.contains("bloqueado")) return;

        divCurso.classList.toggle("aprobado");
        const ahoraAprobado = divCurso.classList.contains("aprobado");

        creditosAprobados += ahoraAprobado ? curso.creditos : -curso.creditos;
        creditosEl.textContent = creditosAprobados;

        localStorage.setItem(cursoId, ahoraAprobado);

        mostrarEvaluaciones(curso.nombre, curso.creditos);
        mostrarProfesor(curso.nombre);
        actualizarEstadisticas();
        actualizarBarraProgreso();
      });

      divSemestre.appendChild(divCurso);
    });

    container.appendChild(divSemestre);
  });

  creditosEl.textContent = creditosAprobados;
  actualizarBarraProgreso();
}

function actualizarEstadisticas() {
  calcularPromedioGeneral();  // debe estar en promedio.js
  calcularRankingFinal();     // debe estar en ranking.js
}

function actualizarBarraProgreso() {
  const totalCreditos = calcularTotalCreditos();
  const creditosAprobados = calcularCreditosAprobados();
  const porcentaje = (creditosAprobados / totalCreditos) * 100;

  const relleno = document.getElementById("barra-relleno");
  if (relleno) {
    relleno.style.height = `${porcentaje}%`;
  }
}

function calcularTotalCreditos() {
  let total = 0;
  mallaGlobal.forEach(sem => {
    sem.cursos.forEach(c => {
      if (!c.nombre.toLowerCase().includes("electivas") || c.creditos < 15) {
        total += c.creditos;
      }
    });
  });
  return total;
}

function calcularCreditosAprobados() {
  let total = 0;
  mallaGlobal.forEach(sem => {
    sem.cursos.forEach(curso => {
      const id = `${sem.semestre}-${curso.nombre}`;
      if (localStorage.getItem(id) === "true") {
        total += curso.creditos;
      }
    });
  });
  return total;
}

// 🔐 Verifica si se cumplen los requisitos para un curso
function cumpleRequisitos(requisitos) {
  return requisitos.every(req => {
    return Object.keys(localStorage).some(key => key.includes(req) && localStorage[key] === "true");
  });
}
