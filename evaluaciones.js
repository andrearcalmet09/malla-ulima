const evaluacionesData = {};

function mostrarEvaluaciones(cursoNombre) {
  const container = document.getElementById("evaluaciones-container");
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

  const evaluaciones = evaluacionesData[cursoNombre] || [];

  evaluaciones.forEach((eval, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><input value="${eval.nombre}" /></td>
      <td><input type="number" value="${eval.peso}" /></td>
      <td><input type="number" value="${eval.nota}" /></td>
      <td><button onclick="eliminarEvaluacion('${cursoNombre}', ${i})">🗑️</button></td>
    `;
    tabla.appendChild(fila);
  });

  container.appendChild(tabla);

  const agregarBtn = document.createElement("button");
  agregarBtn.textContent = "➕ Agregar evaluación";
  agregarBtn.onclick = () => agregarEvaluacion(cursoNombre);
  container.appendChild(agregarBtn);

  const calcularBtn = document.createElement("button");
  calcularBtn.textContent = "✅ Calcular promedio";
  calcularBtn.onclick = () => calcularPromedioCurso(cursoNombre);
  container.appendChild(calcularBtn);

  const resultado = document.createElement("p");
  resultado.id = "promedio-curso";
  container.appendChild(resultado);
}

function agregarEvaluacion(cursoNombre) {
  if (!evaluacionesData[cursoNombre]) evaluacionesData[cursoNombre] = [];

  evaluacionesData[cursoNombre].push({ nombre: "", peso: 0, nota: 0 });
  mostrarEvaluaciones(cursoNombre);
}

function eliminarEvaluacion(cursoNombre, index) {
  evaluacionesData[cursoNombre].splice(index, 1);
  mostrarEvaluaciones(cursoNombre);
}

function calcularPromedioCurso(cursoNombre) {
  const evaluaciones = evaluacionesData[cursoNombre];
  if (!evaluaciones || evaluaciones.length === 0) return;

  let totalPeso = 0;
  let totalNota = 0;

  const filas = document.querySelectorAll(".tabla-evaluaciones tr:not(:first-child)");
  filas.forEach((fila, i) => {
    const nombre = fila.children[0].querySelector("input").value;
    const peso = parseFloat(fila.children[1].querySelector("input").value);
    const nota = parseFloat(fila.children[2].querySelector("input").value);

    evaluaciones[i] = { nombre, peso, nota };
    totalPeso += peso;
    totalNota += (peso / 100) * nota;
  });

  const resultado = document.getElementById("promedio-curso");

  if (totalPeso !== 100) {
    resultado.textContent = "⚠️ El peso total no suma 100%. Corrige los valores.";
    resultado.style.color = "red";
  } else {
    resultado.textContent = `🎯 Promedio final: ${totalNota.toFixed(2)}`;
    resultado.style.color = "green";
  }
}

