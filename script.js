let cursosAprobados = new Set();
let creditosTotales = 0;

const contenedor = document.getElementById("malla-container");
const creditosDiv = document.getElementById("creditos-totales");

fetch("malla.json")
  .then((res) => res.json())
  .then((data) => {
    const cursosPorSemestre = {};

    // Agrupar cursos por semestre
    data.forEach((curso) => {
      if (!cursosPorSemestre[curso.semestre]) {
        cursosPorSemestre[curso.semestre] = [];
      }
      cursosPorSemestre[curso.semestre].push(curso);
    });

    // Ordenar semestres del 1 al 10
    const semestresOrdenados = Object.keys(cursosPorSemestre)
      .map(Number)
      .sort((a, b) => a - b);

    semestresOrdenados.forEach((semestre) => {
      const divSemestre = document.createElement("div");
      divSemestre.classList.add("semestre");

      const titulo = document.createElement("h2");
      titulo.textContent = `Semestre ${semestre}`;
      divSemestre.appendChild(titulo);

      cursosPorSemestre[semestre].forEach((curso) => {
        const divCurso = document.createElement("div");
        divCurso.classList.add("curso");
        divCurso.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

        divCurso.addEventListener("click", () => {
          // Revisar si ya fue aprobado
          if (cursosAprobados.has(curso.codigo)) {
            cursosAprobados.delete(curso.codigo);
            creditosTotales -= curso.creditos;
            divCurso.classList.remove("aprobado");
          } else {
            // Validar prerrequisitos
            const faltan = curso.req.filter((codigoReq) => !cursosAprobados.has(codigoReq));
            if (faltan.length > 0) {
              alert("Debes aprobar los prerrequisitos:\n" + faltan.join(", "));
              return;
            }
            cursosAprobados.add(curso.codigo);
            creditosTotales += curso.creditos;
            divCurso.classList.add("aprobado");
          }

          creditosDiv.textContent = `Créditos aprobados: ${creditosTotales}`;
        });

        divSemestre.appendChild(divCurso);
      });

      contenedor.appendChild(divSemestre);
    });
  })
  .catch((error) => {
    console.error("Error al cargar malla.json:", error);
    contenedor.innerHTML = "<p>Error al cargar los cursos.</p>";
  });
