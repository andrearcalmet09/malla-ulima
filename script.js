document.addEventListener("DOMContentLoaded", () => {
  fetch("malla.json")
    .then((res) => res.json())
    .then((data) => {
      crearMalla(data);
      actualizarEstadisticas(); // inicializa estadísticas si ya hay datos guardados
    });
});

function crearMalla(malla) {
  const container = document.getElementById("malla-container");
  const creditosEl = document.querySelector("#creditos-totales strong");

  let totalCreditos = 0;
  let creditosAprobados = 0;

  malla.forEach((semestreObj) => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = `📘 Semestre ${semestreObj.semestre}`;
    divSemestre.appendChild(titulo);

    semestreObj.cursos.forEach((curso) => {
      // Ignora marcador genérico de electivas
      if (curso.nombre.toLowerCase().includes("electivas") && curso.creditos >= 15) return;

      totalCreditos += curso.creditos;

      const divCurso = document.createElement("div");
      divCurso.className = "curso";
      divCurso.classList.add(curso.electivo ? "electivo" : "obligatorio");

      divCurso.textContent = `${curso.nombre} (${curso.creditos} créditos)`;

      // Estado desde localStorage
      const cursoId = `${semestreObj.semestre}-${curso.nombre}`;
      if (localStorage.getItem(cursoId) === "true") {
        divCurso.classList.add("aprobado");
        creditosAprobados += curso.creditos;
      }

      // Toggle aprobado
      divCurso.addEventListener("click", () => {
        divCurso.classList.toggle("aprobado");
        const aprobado = divCurso.classList.contains("aprobado");

        // Update créditos
        creditosAprobados += aprobado ? curso.creditos : -curso.creditos;
        creditosEl.textContent = creditosAprobados;

        // Save en localStorage
        localStorage.setItem(cursoId, aprobado);

        // Recalcula estadísticas
        actualizarEstadisticas();
      });

      divSemestre.appendChild(divCurso);
    });

    container.appendChild(divSemestre);
  });

  creditosEl.textContent = creditosAprobados;
}

/** 📊 Calcula estadísticas académicas simuladas */
function actualizarEstadisticas() {
  // Esto se puede conectar a otras páginas
  const creditos = calcularCreditosAprobados();
  const promedioCiclo = calcularPromedioSimulado(creditos);
  const acumulado = calcularAcumulado(creditos);
  const ranking = determinarRanking(acumulado);

  // Ejemplo de cómo mostrarlo (puedes hacerlo más visual si lo conectas con HTML)
  console.log(`Promedio: ${promedioCiclo}`);
  console.log(`Acumulado: ${acumulado}`);
  console.log(`Ranking: ${ranking}`);
}

function calcularCreditosAprobados() {
  let suma = 0;
  Object.keys(localStorage).forEach((key) => {
    if (localStorage[key] === "true" && key.includes("-")) {
      const match = key.match(/\((\d+) créditos\)/);
      if (match) {
        suma += parseInt(match[1]);
      }
    }
  });
  return suma;
}

function calcularPromedioSimulado(creditos) {
  // Simula un promedio ponderado de notas (puedes mejorar con inputs por curso)
  if (creditos === 0) return 0;
  const notasFicticias = creditos * 14.5; // supongamos promedio 14.5
  return (notasFicticias / creditos).toFixed(2);
}

function calcularAcumulado(creditos) {
  // Otra simulación, podrías usar inputs de nota real por curso
  const notaTotal = creditos * 14.5;
  return (notaTotal / creditos).toFixed(2);
}

function determinarRanking(promedio) {
  const p = parseFloat(promedio);
  if (p >= 18) return "🏅 Décimo Superior";
  if (p >= 17) return "🥈 Quinto Superior";
  if (p >= 16) return "🎖️ Tercio Superior";
  if (p >= 14.5) return "📘 Medio Superior";
  return "📄 Regular";
}
