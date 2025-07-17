// profesores.js

const profesoresData = {
  "Matemática I": { nombre: "Prof. Matemática 1", horario: "Lun y Mié 9-10am" },
  "Comunicación": { nombre: "Prof. Comunicación 1", horario: "Lun y Mié 9-10am" },
  "Administración General": { nombre: "Prof. Administración 1", horario: "Lun y Mié 9-10am" },
  "Contabilidad General": { nombre: "Prof. Contabilidad 1", horario: "Lun y Mié 9-10am" },
  "Economía General": { nombre: "Prof. Economía 1", horario: "Lun y Mié 9-10am" },
  "Habilidades del Pensamiento Crítico": { nombre: "Prof. Habilidades 1", horario: "Lun y Mié 9-10am" },
  "Matemática II": { nombre: "Prof. Matemática 2", horario: "Lun y Mié 10-10am" },
  "Estadística I": { nombre: "Prof. Estadística 2", horario: "Lun y Mié 10-10am" },
  "Fundamentos de Marketing": { nombre: "Prof. Fundamentos 2", horario: "Lun y Mié 10-10am" },
  "Derecho de la Empresa": { nombre: "Prof. Derecho 2", horario: "Lun y Mié 10-10am" },
  "Psicología Organizacional": { nombre: "Prof. Psicología 2", horario: "Lun y Mié 10-10am" },
  "Responsabilidad Social": { nombre: "Prof. Responsabilidad 2", horario: "Lun y Mié 10-10am" }
};

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("profesores-info");

  for (const curso in profesoresData) {
    const { nombre, horario } = profesoresData[curso];

    const div = document.createElement("div");
    div.className = "profesor-box";
    div.innerHTML = `
      <h3>${curso}</h3>
      <p><strong>Profesor:</strong> ${nombre}</p>
      <p><strong>Horario:</strong> ${horario}</p>
    `;
    contenedor.appendChild(div);
  }
});

