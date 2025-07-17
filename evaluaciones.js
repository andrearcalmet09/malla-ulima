// Este archivo trabaja junto con script.js y comparte evaluacionesData global
// Asegúrate de que script.js esté cargado antes que este en el HTML

function mostrarEvaluaciones(cursoNombre) {
  const container = document.getElementById("evaluaciones-tabla");
  container.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = `📋 Evaluaciones de: ${cursoNombre}`;
  container.appendChild(titulo);

  const tabla = document.createElement("table");
  tabla.className = "tabla-evaluaciones";

  const encabezado = document.createElement("tr");
  encabezado.innerHTML = `
    <th>Nombre</th>
    <th>Peso (%)</th>
    <th>Nota</th>
    <th></th>
  `;
  tabla.appendChild(encabezado);

  if (!evaluacionesData[cursoNombre]) {
    evaluacionesData[cursoNombre] = [];
  }

  evaluacionesData[cursoNombre].forEach((eval, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><input value="${eval.nombre || ""}" /></td>
      <td><input type="number" min="0" max="100" value="${eval.peso}" /></td>
      <td><input type="number" min="0" max="20" value="${eval.nota}" /></td>
      <td><button onclick="eliminarEvaluacion('${cursoNombre}', ${i})">🗑️</button></td>
    `;
    tabla.appendChild(fila);
  });

  container.appendChild(tabla);

  const botones = document.createElement("div");
  botones.className = "evaluaciones-controles";

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "➕ Agregar evaluación";
  btnAgregar.onclick = () => agregarEvaluacion(cursoNombre);

  const btnCalcular = document.createElement("button");
  btnCalcular.textContent = "✅ Calcular promedio";
  btnCalcular.onclick = () => calcularPromedioCurso(cursoNombre);

  botones.appendChild(btnAgregar);
  botones.appendChild(btnCalcular);
  container.appendChild(botones);

  const resultado = document.createElement("p");
  resultado.id = "promedio-curso";
  container.appendChild(resultado);
}

function agregarEvaluacion(cursoNombre) {
  evaluacionesData[cursoNombre].push({ nombre: "", peso: 0, nota: 0 });
  mostrarEvaluaciones(cursoNombre);
}

function eliminarEvaluacion(cursoNombre, index) {
  evaluacionesData[cursoNombre].splice(index, 1);
  mostrarEvaluaciones(cursoNombre);
}

function calcularPromedioCurso(cursoNombre) {
  const tabla = document.querySelector(".tabla-evaluaciones");
  const filas = tabla.querySelectorAll("tr:not(:first-child)");

  let totalPeso = 0;
  let totalNota = 0;

  filas.forEach((fila, i) => {
    const nombre = fila.children[0].querySelector("input").value;
    const peso = parseFloat(fila.children[1].querySelector("input").value);
    const nota = parseFloat(fila.children[2].querySelector("input").value);

    evaluacionesData[cursoNombre][i] = { nombre, peso, nota };
    if (!isNaN(peso) && !isNaN(nota)) {
      totalPeso += peso;
      totalNota += (peso / 100) * nota;
    }
  });

  const resultado = document.getElementById("promedio-curso");

  if (totalPeso !== 100) {
    resultado.textContent = "⚠️ El peso total no suma 100%. Corrige los valores.";
    resultado.style.color = "red";
  } else {
    resultado.textContent = `🎯 Promedio final: ${totalNota.toFixed(2)}`;
    resultado.style.color = "green";
  }

  // Actualiza promedio general también
  actualizarEstadisticas();
}

