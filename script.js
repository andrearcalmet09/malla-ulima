// script.js

let totalCreditos = 0;
let totalElectivos = 0;

function crearCurso(curso, esElectivo = false) {
  const div = document.createElement("div");
  div.className = `curso ${esElectivo ? "electivo" : "obligatorio"}`;
  div.textContent = `${curso.nombre} (${curso.creditos} créditos)`;
  div.onclick = function () {
    if (div.classList.contains("completado")) {
      div.classList.remove("completado");
      totalCreditos -= curso.creditos;
      if (esElectivo) totalElectivos -= curso.creditos;
    } else {
      div.classList.add("completado");
      totalCreditos += curso.creditos;
      if (esElectivo) totalElectivos += curso.creditos;
    }
    document.getElementById("creditos").textContent = `Créditos aprobados: ${totalCreditos} (Electivos: ${totalElectivos})`;
  };
  return div;
}

fetch("malla.json")
  .then((res) => res.json())
  .then((data) => {
    const contenedor = document.getElementById("contenedor");

    Object.keys(data).forEach((semestre) => {
      const columna = document.createElement("div");
      columna.className = "columna";

      const titulo = document.createElement("div");
      titulo.className = "semestre";
      titulo.textContent = `Semestre ${semestre}`;

      columna.appendChild(titulo);

      const cursos = data[semestre];
      cursos.forEach((curso) => {
        const esElectivo = curso.tipo === "electivo";
        const divCurso = crearCurso(curso, esElectivo);
        columna.appendChild(divCurso);
      });

      contenedor.appendChild(columna);
    });
  });
