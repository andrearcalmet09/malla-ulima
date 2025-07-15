let cursos = [];
let cursosAprobados = new Set();
let totalCreditos = 0;

fetch("malla.json")
  .then((res) => res.json())
  .then((data) => {
    cursos = data;
    renderMalla();
  });

function renderMalla() {
  const container = document.getElementById("malla-container");
  const creditosDisplay = document.getElementById("creditos-totales");
  const cursosPorSemestre = {};

  cursos.forEach((curso) => {
    if (!cursosPorSemestre[curso.semestre]) {
      cursosPorSemestre[curso.semestre] = [];
    }
    cursosPorSemestre[curso.semestre].push(curso);
  });

  Object.keys(cursosPorSemestre).sort().forEach((semestre) => {
    const columna = document.createElement("div");
    columna.classList.add("semestre");

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    cursosPorSemestre[semestre].forEach((curso) => {
      const div = document.createElement("div");
      div.classList.add("curso");
      div.id = curso.codigo;
      div.textContent = `${curso.nombre} (${curso.creditos} cr)`;

      if (!cumpleRequisitos(curso)) {
        div.classList.add("bloqueado");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) return;

        if (div.classList.contains("aprobado")) {
          div.classList.remove("aprobado");
          cursosAprobados.delete(curso.codigo);
          totalCreditos -= curso.creditos;
        } else {
          div.classList.add("aprobado");
          cursosAprobados.add(curso.codigo);
          totalCreditos += curso.creditos;
        }

        actualizarEstadoCursos();
        creditosDisplay.textContent = `Créditos aprobados: ${totalCreditos}`;
      });

      columna.appendChild(div);
    });

    container.appendChild(columna);
  });
}

function cumpleRequisitos(curso) {
  return curso.req.every((cod) => cursosAprobados.has(cod));
}

function actualizarEstadoCursos() {
  cursos.forEach((curso) => {
    const div = document.getElementById(curso.codigo);
    if (!div) return;

    if (cursosAprobados.has(curso.codigo)) return;

    if (cumpleRequisitos(curso)) {
      div.classList.remove("bloqueado");
    } else {
      div.classList.add("bloqueado");
    }
  });
}
