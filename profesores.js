document.addEventListener("DOMContentLoaded", () => {
  mostrarFormularioProfesores();
});

function mostrarFormularioProfesores() {
  const container = document.getElementById("profesores-info");
  if (!container) return;

  container.innerHTML = "";

  const cursosGuardados = JSON.parse(localStorage.getItem("profesoresPorCurso") || "{}");

  const cursosActivos = document.querySelectorAll(".curso.aprobado:not(.electivo)");
  const cursos = [...cursosActivos].map((curso) => curso.textContent.split(" (")[0]);

  if (cursos.length === 0) {
    container.innerHTML = "<p>✅ Marca cursos como 'Aprobado' para añadir profesor y horario.</p>";
    return;
  }

  cursos.forEach((nombreCurso) => {
    const datos = cursosGuardados[nombreCurso] || { profesor: "", horario: "", asesoria: "" };

    const box = document.createElement("div");
    box.className = "profesor-box";

    box.innerHTML = `
      <h4>📘 ${nombreCurso}</h4>
      <label>👩‍🏫 Profesor: <input type="text" value="${datos.profesor}" data-curso="${nombreCurso}" data-campo="profesor"></label>
      <label>🕒 Horario: <input type="text" value="${datos.horario}" data-curso="${nombreCurso}" data-campo="horario"></label>
      <label>💬 Asesoría: <input type="text" value="${datos.asesoria}" data-curso="${nombreCurso}" data-campo="asesoria"></label>
      <hr />
    `;

    container.appendChild(box);
  });

  const guardarBtn = document.createElement("button");
  guardarBtn.textContent = "💾 Guardar profesores y horarios";
  guardarBtn.onclick = guardarProfesores;
  container.appendChild(guardarBtn);
}

function guardarProfesores() {
  const inputs = document.querySelectorAll("#profesores-info input");
  const profesoresData = {};

  inputs.forEach((input) => {
    const curso = input.dataset.curso;
    const campo = input.dataset.campo;
    if (!profesoresData[curso]) profesoresData[curso] = { profesor: "", horario: "", asesoria: "" };
    profesoresData[curso][campo] = input.value;
  });

  localStorage.setItem("profesoresPorCurso", JSON.stringify(profesoresData));
  alert("✅ Guardado correctamente.");
}
