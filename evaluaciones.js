let cursoSeleccionado = null;

export function mostrarEvaluaciones(curso) {
  cursoSeleccionado = curso;

  const contenedor = document.getElementById("evaluaciones-tabla");
  contenedor.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = `Notas de: ${curso.nombre}`;
  contenedor.appendChild(titulo);

  const tabla = document.createElement("table");
  tabla.classList.add("tabla-evaluaciones");

  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Evaluación</th><th>Nota</th></tr>";
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  const evaluaciones = curso.evaluaciones || [
    { nombre: "Parcial", nota: "" },
    { nombre: "Final", nota: "" },
    { nombre: "Promedio Final", nota: "" }
  ];

  evaluaciones.forEach((evalItem, i) => {
    const fila = document.createElement("tr");

    const tdNombre = document.createElement("td");
    tdNombre.textContent = evalItem.nombre;

    const tdNota = document.createElement("td");
    const inputNota = document.createElement("input");
    inputNota.type = "number";
    inputNota.step = "0.1";
    inputNota.min = 0;
    inputNota.max = 20;
    inputNota.value = evalItem.nota || "";
    inputNota.addEventListener("input", () => {
      evaluaciones[i].nota = parseFloat(inputNota.value) || 0;
      curso.evaluaciones = evaluaciones;
      guardarEnLocalStorage();
    });

    tdNota.appendChild(inputNota);

    fila.appendChild(tdNombre);
    fila.appendChild(tdNota);
    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);
  contenedor.appendChild(tabla);
}

function guardarEnLocalStorage() {
  if (cursoSeleccionado) {
    const estado = JSON.parse(localStorage.getItem("estadoCursos")) || {};
    estado[cursoSeleccionado.nombre] = cursoSeleccionado;
    localStorage.setItem("estadoCursos", JSON.stringify(estado));
  }
}


